import { std } from "wow/wotlk";
import { Enchantment } from "wow/wotlk/std/Enchant/Enchantment";
import { ItemBonding } from "wow/wotlk/std/Item/ItemBonding";
import { ItemInventoryType } from "wow/wotlk/std/Item/ItemInventoryType";
import { ItemQuality } from "wow/wotlk/std/Item/ItemQuality";
import { ItemTemplate } from "wow/wotlk/std/Item/ItemTemplate";
import { ProfessionRecipe } from "wow/wotlk/std/Profession/ProfessionRecipe";
import {
  DefaultProfession,
  resolveProfession,
} from "wow/wotlk/std/Profession/ProfessionType";
import { Spell } from "wow/wotlk/std/Spell/Spell";
import { enchantmentDisplayData, EnchantmentSlots, getProfessionDisplayData, professionDisplayData, professionToolDisplayData, ProfessionToolTypes, RecipeProfessions, recipeQualityDisplays } from "../data/professions";

export class Items {
  /**
   * Creates a recipe item that players can use to learn a profession recipe.
   * @param id ID used for the item.
   * @param itemName Name of the item, automatically generates the "Recipe: " text based on profession.
   * @param profession Name of the profession.
   * @param recipe Recipe or spell ID of the recipe that this item teaches.
   * @param reqSkillLevel Required profession skill level to use this recipe.
   * @param buyPrice Price of the item, sell price is 1/4th the buy price automatically.
   * @param AnInsteadOfA Recipes say "Teaches you how to make a ItemName". Sometimes it's not grammatically correct. If this is set to True, it will say "an ItemName". This is automatically adjusted if the item name starts with "Elixir"
   * @returns
   */
  createRecipeItem(
    mod: string,
    id: string,
    itemName: string,
    quality: ItemQuality,
    profession: RecipeProfessions,
    recipe: ProfessionRecipe | Spell,
    reqSkillLevel: number,
    buyPrice: number,
    bonding?: ItemBonding,
    AnInsteadOfA?: boolean
  ) {
    let soulbound = false;
    let spell: Spell;
    recipe instanceof Spell ? (spell = recipe) : (spell = recipe.AsSpell());

    const { recipePrefix, subclass, displayId } = getProfessionDisplayData(
      profession,
      quality
    );

    if (bonding === ItemBonding.BINDS_ON_PICKUP) {
      soulbound = true;
    }

    const descrip = spell.Description.enGB.get();
    let desc = "";
    if (descrip) {
      desc = descrip;
      desc = desc.charAt(0).toLowerCase() + desc.slice(1);
    }

    let ITEM = std.Items.create(`${mod}`, `${id}-recipe`)
      .Name.enGB.set(`${recipePrefix}${itemName}`)
      .Description.enGB.set(
        spell.Effects.get(0).Type.ENCHANT_ITEM.is()
          ? `Teaches you how to ${desc}`
          : `Teaches you how to make ${AnInsteadOfA ? "an" : itemName.startsWith("Elixir") ? "an" : "a"
          } ${itemName}.`
      )
      .Bonding.set(bonding ? bonding : 0)
      .Class.set(9, subclass)
      .DisplayInfo.set(displayId)
      .Flags.PROFESSION_RECIPE.set(soulbound)
      .Material.UNDEFINED.set()
      .ItemLevel.set(reqSkillLevel / 5)
      .MaxStack.set(1)
      .Price.set(buyPrice * 0.25, buyPrice)
      .Quality.set(quality)
      .Spells.addMod((spell) => {
        spell.Spell.set(483).Trigger.ON_USE.set().Charges.set(1, "DELETE_ITEM");
      })
      .Spells.addMod((spell) => {
        spell.Spell.set(recipe.ID).Trigger.ON_LEARN.set();
      });

    ITEM.Requirements.Skill.Skill.set(resolveProfession(profession));
    ITEM.Requirements.Skill.Rank.set(reqSkillLevel);

    return ITEM;
  }

  /**
   * Creates a recipe spell for a profession. Does not add it to trainers automatically.
   * @param item Item that we're creating a recipe spell for, becomes output item. Can accept enchantment IDs to change this to an enchanting recipe.
   * @param profession Profession we're using, use double quotes and it'll show you the options.
   * @param output Number of items outputted by this recipe. Can accept a range of 2 numbers.
   * @param castTime Time it takes to create this item.
   * @param yellow What skill level this spell goes from orange to yellow at. Green is (yellow+gray)/2
   * @param gray What skill level this spell goes from green to gray at. Green is (yellow+gray)/2
   * @param reagents Array of items used to create this recipe.
   * @param reagentCounts Array of item counts used in the recipe.
   * @param tool
   * @param slot If this is an enchantment, this is what slot the enchantment goes to.
   */
  createRecipeSpell(
    item: ItemTemplate | number | Enchantment,
    profession: DefaultProfession,
    output: number | number[],
    castTime: number,
    yellow: number,
    gray: number,
    reagents: number[],
    reagentCounts: number[],
    type?: ProfessionToolTypes,
    slot?: EnchantmentSlots
  ) {
    let itemtemplate = 0;
    if (typeof item === "number") {
      itemtemplate = item;
    } else {
      itemtemplate = item.ID;
    }
    let visual = 0;
    let icon = 0;
    let outputmin = 0;
    let outputmax = 0;
    if (typeof output === "number") {
      outputmin = output;
    } else {
      outputmin = output[0];
      outputmax = output[1];
    }

    /** Grab profession crafting icon and spell visual animation */
    switch (profession) {
      // Mining is not included in the recipe creation function, but referenced here for the icon and visual
      case "MINING":
        (icon = 1), (visual = 390);
        break;

      default:
        const professionData =
          professionDisplayData[profession as RecipeProfessions];
        (icon = professionData.craftingIconId ?? 0),
          (visual = professionData.craftingVisualId ?? 0);
    }

    let totems = [0];
    let spellfocus = 0;

    /** If tool type is defined, find its visual, spell focus object, and tools (totems) */
    if (type) {
      const toolData = professionToolDisplayData[type];

      if (toolData) {
        visual = toolData.visual;
        spellfocus = toolData.spellFocus ?? 0;
        totems = toolData.totems ?? [0];
      }
    }

    /** Reagent and reagent count are arrays, so we need to check if they're the same length */
    if (reagents.length != reagentCounts.length) {
      console.log(
        "Number of reagents does not match number of reagent counts."
      );
    }

    /** If creating an Enchantment, we need to define parts of the description and what items it can apply to */
    let enchantprefix = "";
    let enchantdesc = "";
    let enchantitemclass = 4;
    let enchantitemsubclass = 31;
    let enchantiteminventorytype = 0;
    if (slot) {
      const enchantmentData = enchantmentDisplayData[slot];

      if (enchantmentData) {
        enchantdesc = enchantmentData.enchantDesc;
        enchantprefix = enchantmentData.enchantPrefix;

        enchantiteminventorytype =
          enchantmentData.enchantItemInventoryType ?? 0;
        enchantitemclass = enchantmentData.enchantItemClass ?? 4;
        enchantitemsubclass = enchantmentData.enchantItemSubclass ?? 31;
      }
    } else {
      console.log(
        "Not implemented Item slot for create recipe spell Enchantment."
      );
    }

    /** Create recipe spell */
    let RECIPE = std.Professions.load(resolveProfession(profession))
      .Recipes.addGet("azara-core", `recipe-${profession}-${itemtemplate}`)
      .OutputCount.set(outputmin - 1)
      .Ranks.Yellow.set(yellow)
      .Ranks.Gray.set(gray)
      .CastTime.setSimple(castTime)
      .SpellFocus.set(spellfocus);
    reagents.forEach((v, i) => {
      RECIPE.Reagents.addMod((value) => {
        value.Reagent.set(v).ReagentCount.set(reagentCounts[i]);
      });
    });
    if (totems[0] != 0) {
      totems.forEach((v, i) => {
        RECIPE.Totems.add(v);
      });
    }

    RECIPE.AsSpell()
      .Name.enGB.set(
        item instanceof Enchantment
          ? `Enchant ${enchantprefix} - ${item.Name.enGB.get()}`
          : std.Items.load(itemtemplate).Name.enGB.get()
      )
      .Icon.set(icon)
      .Visual.set(visual)
      .Family.set(resolveProfession(profession))
      .ClassMask.A.set(profession == "COOKING" ? 1 : 0)
      .Effects.mod(0, (eff) => {
        eff.PointsDieSides.set(outputmax + 1);
        if (item instanceof Enchantment) {
          eff.PointsBase.set(-1).Type.ENCHANT_ITEM.set().Enchant.set(item.ID);
          /** If it is a weapon, set miscvalueb to 15, otherwise 14. I do not know what this does, but every enchant has these values */
          if (
            slot == ItemInventoryType.MAINHAND ||
            slot == ItemInventoryType.OFFHAND ||
            slot == ItemInventoryType.TWOHAND ||
            slot == ItemInventoryType.WEAPON
          ) {
            eff.MiscValueB.set(15);
          } else {
            eff.MiscValueB.set(14);
          }
        }
      });
    if (item instanceof Enchantment) {
      const spell = std.Spells.load(item.Effects.get(0).Arg.get());
      /** Take the spell description and make the first letter lowercase so it can be appended to prefix text. */
      let desc = "";
      if (spell) {
        desc = spell.Description.enGB.get();
        desc = desc.charAt(0).toLowerCase() + desc.slice(1);
      }
      RECIPE.AsSpell()
        .TargetType.ITEM.set(true)
        .ItemEquips.Class.set(enchantitemclass)
        .ItemEquips.Subclass.set(enchantitemsubclass)
        .ItemEquips.InvTypes.set(enchantiteminventorytype)
        .Description.enGB.set(
          `Permanently enchant ${enchantdesc} to ${spell ? desc : `Manually name this.`
          }`
        );
    } else {
      if (std.Items.load(itemtemplate).Bonding.is("BINDS_ON_PICKUP")) {
        RECIPE.AsSpell().Description.enGB.set(
          "This item binds to you upon being crafted."
        );
      }
    }

    /** Create scroll item, this is what is created when you use an Enchanting Vellum */
    let scroll = 0;
    if (item instanceof Enchantment && profession == "ENCHANTING") {
      const sc = std.Items.create("azara-core", `enchant-scroll-${item.ID}`)
        .Name.enGB.set(
          `Scroll of Enchant ${enchantprefix} - ${item.Name.enGB.get()}`
        )
        .DisplayInfo.set(811)
        .Class.ITEM_ENHANCEMENT.set()
        .Flags.PLAYER_CAST.set(true)
        .Flags.IGNORE_REAGENTS.set(true)
        .ItemLevel.set(yellow / 5)
        .MaxStack.set(5)
        .Quality.BLUE.set()
        .Spells.addMod((sp) => {
          sp.Spell.set(RECIPE.AsSpell().ID).Charges.set(1, "DELETE_ITEM");
        });

      scroll = sc.ID;
    }

    /** Apply the actual output item at the end here so it can be a scroll if its an enchantment */
    RECIPE.AsSpell()
      .Effects.get(0)
      .ItemType.set(scroll == 0 ? itemtemplate : scroll);

    return RECIPE;
  }
}

export const ItemRegistry = new Items();
