import { ItemInventoryType } from "wow/wotlk/std/Item/ItemInventoryType";
import { ItemQuality } from "wow/wotlk/std/Item/ItemQuality";
import { DefaultProfession } from "wow/wotlk/std/Profession/ProfessionType";

export enum ToolType {
  NONE,
  FORGE,
  ANVIL,
  COOKINGFIRE,
  ALCHEMYLAB,
  HAMMER_ANVIL,
  HAMMER_SPANNER,
  HAMMER_SPANNER_ANVIL,
  SPANNER,
  SPANNER_SCREWDRIVER,
  SCREWDRIVER,
  BLACKANVIL_HAMMER,
  BLACKANVIL_SPANNER_HAMMER,
  BLACKFORGE,
  MOONWELL,
  ROD_COPPER,
  ROD_SILVER,
  ROD_GOLDEN,
  ROD_TRUESILVER,
  ROD_ARCANITE,
}

export type ProfessionRecipeData = {
  subclass: number;
  recipePrefix: string;
  craftingIconId?: number;
  craftingVisualId?: number;
  displayId?: number;
};

export type EnchantmentDisplayData = {
  enchantPrefix: string;
  enchantDesc: string;
  enchantItemInventoryType?: number;
  enchantItemClass?: number;
  enchantItemSubclass?: number;
};

export type RecipeProfessions = Exclude<
  DefaultProfession,
  "INSCRIPTION" | "MINING" | "SKINNING" | "HERBALISM" | "JEWELCRAFTING"
>;

export type EnchantmentSlots = Extract<
  ItemInventoryType,
  | ItemInventoryType.BACK
  | ItemInventoryType.CHEST
  | ItemInventoryType.FEET
  | ItemInventoryType.FINGER
  | ItemInventoryType.HANDS
  | ItemInventoryType.MAINHAND
  | ItemInventoryType.TWOHAND
  | ItemInventoryType.SHIELD
  | ItemInventoryType.WRISTS
  | ItemInventoryType.OFFHAND
  | ItemInventoryType.WEAPON
>;

export type ProfessionToolTypes = Exclude<ToolType, ToolType.HAMMER_SPANNER>;

export type ToolDisplayData = {
  visual: number;
  spellFocus?: number;
  totems?: number[];
};


export const recipeQualityDisplays: Record<ItemQuality, number> = {
  [ItemQuality.WHITE]: 1301,
  [ItemQuality.GREEN]: 15274,
  [ItemQuality.BLUE]: 6270,
  [ItemQuality.PURPLE]: 1096,
  [ItemQuality.GRAY]: 1301,
  [ItemQuality.ORANGE]: 0,
  [ItemQuality.HEIRLOOM]: 0,
};

export const professionDisplayData: Record<
  RecipeProfessions,
  ProfessionRecipeData
> = {
  LEATHERWORKING: {
    subclass: 1,
    recipePrefix: "Pattern: ",
    craftingIconId: 346,
    craftingVisualId: 4439,
  },
  TAILORING: {
    subclass: 2,
    recipePrefix: "Pattern: ",
    craftingIconId: 1377,
    craftingVisualId: 1168,
  },
  ENGINEERING: {
    subclass: 3,
    recipePrefix: "Schematic: ",
    craftingIconId: 1,
    craftingVisualId: 2641,
  },
  BLACKSMITHING: {
    subclass: 4,
    recipePrefix: "Plans: ",
    craftingIconId: 140,
    craftingVisualId: 13785,
  },
  COOKING: {
    subclass: 5,
    recipePrefix: "Recipe: ",
    displayId: 1301,
    craftingIconId: 140,
    craftingVisualId: 3881,
  },
  ALCHEMY: {
    subclass: 6,
    recipePrefix: "Recipe: ",
    craftingIconId: 1,
    craftingVisualId: 92,
  },
  FIRSTAID: {
    subclass: 7,
    recipePrefix: "Manual: ",
    displayId: 8117,
    craftingIconId: 140,
    craftingVisualId: 5499,
  },
  ENCHANTING: {
    subclass: 8,
    recipePrefix: "Formula: ",
    displayId: 11431,
    craftingIconId: 241,
    craftingVisualId: 3182,
  },
  FISHING: {
    subclass: 9,
    recipePrefix: "",
    displayId: 1155,
  },
};

export const professionToolDisplayData: Record<
  ProfessionToolTypes,
  ToolDisplayData
> = {
  [ToolType.NONE]: { visual: 4439 },
  [ToolType.FORGE]: { visual: 390, spellFocus: 3 },
  [ToolType.ANVIL]: { visual: 395, spellFocus: 1 },
  [ToolType.COOKINGFIRE]: { visual: 3881, spellFocus: 4 },
  [ToolType.ALCHEMYLAB]: { visual: 92, spellFocus: 663 },
  [ToolType.HAMMER_ANVIL]: { visual: 395, spellFocus: 1, totems: [162] },
  [ToolType.HAMMER_SPANNER_ANVIL]: {
    visual: 395,
    spellFocus: 1,
    totems: [162, 14],
  },
  [ToolType.SPANNER]: { visual: 2641, totems: [14] },
  [ToolType.SPANNER_SCREWDRIVER]: { visual: 2641, totems: [14, 15] },
  [ToolType.SCREWDRIVER]: { visual: 2641, totems: [15] },
  [ToolType.BLACKANVIL_HAMMER]: {
    visual: 395,
    spellFocus: 623,
    totems: [162],
  },
  [ToolType.BLACKANVIL_SPANNER_HAMMER]: {
    visual: 395,
    spellFocus: 623,
    totems: [162, 14],
  },
  [ToolType.BLACKFORGE]: { visual: 390, spellFocus: 543 },
  [ToolType.MOONWELL]: { visual: 1168, spellFocus: 883 },
  [ToolType.ROD_COPPER]: { visual: 3182, totems: [6] },
  [ToolType.ROD_SILVER]: { visual: 3182, totems: [7] },
  [ToolType.ROD_GOLDEN]: { visual: 3182, totems: [8] },
  [ToolType.ROD_TRUESILVER]: { visual: 3182, totems: [9] },
  [ToolType.ROD_ARCANITE]: { visual: 3182, totems: [10] },
};

export const enchantmentDisplayData: Record<
  EnchantmentSlots,
  EnchantmentDisplayData | undefined
> = {
  [ItemInventoryType.BACK]: {
    enchantPrefix: "Cloak",
    enchantDesc: "a cloak",
    enchantItemInventoryType: 65536,
  },
  [ItemInventoryType.CHEST]: {
    enchantPrefix: "Chest",
    enchantDesc: "chest armor",
    enchantItemInventoryType: 1048608,
  },
  [ItemInventoryType.FEET]: {
    enchantPrefix: "Boots",
    enchantDesc: "boots",
    enchantItemInventoryType: 256,
  },
  [ItemInventoryType.FINGER]: {
    enchantPrefix: "Ring",
    enchantDesc: "a ring",
    enchantItemInventoryType: 2048,
  },
  [ItemInventoryType.HANDS]: {
    enchantPrefix: "Gloves",
    enchantDesc: "gloves",
    enchantItemInventoryType: 1024,
  },
  [ItemInventoryType.MAINHAND]: {
    enchantPrefix: "Weapon",
    enchantDesc: "a melee weapon",
    enchantItemInventoryType: 1024,
  },
  [ItemInventoryType.TWOHAND]: {
    enchantPrefix: "2H Weapon",
    enchantDesc: "a two-handed melee weapon",
    enchantItemInventoryType: 1024,
  },
  [ItemInventoryType.SHIELD]: {
    enchantPrefix: "Shield",
    enchantDesc: "a shield",
    enchantItemInventoryType: 1024,
  },
  [ItemInventoryType.WRISTS]: {
    enchantPrefix: "Bracers",
    enchantDesc: "bracers",
    enchantItemInventoryType: 512,
  },
  [ItemInventoryType.WEAPON]: undefined,
  [ItemInventoryType.OFFHAND]: {
    enchantPrefix: "Weapon",
    enchantDesc: "a melee weapon",
    enchantItemClass: 2,
    enchantItemSubclass: 189939,
  },
};

/**
 *
 * @param profession Name of the Profession
 * @param quality Quality level of the recipe
 * @returns object with recipePrefix, subclass, and displayId
 */
export function getProfessionDisplayData(
  profession: RecipeProfessions,
  quality: ItemQuality
) {
  const displayData = professionDisplayData[profession];

  return {
    ...displayData,
    displayId: displayData.displayId ?? recipeQualityDisplays[quality],
  };
}