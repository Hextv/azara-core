import { MaskCon, MaskCell32 } from "wow/data/cell/cells/MaskCell";
import { SQL, std } from "wow/wotlk";
import { ClassIDs } from "wow/wotlk/std/Class/ClassIDs";
import { ClassMask } from "wow/wotlk/std/Class/ClassRegistry";
import { RaceIDs, RaceMask } from "wow/wotlk/std/Race/RaceType";
import { EquipSkill } from "wow/wotlk/std/SkillLines/EquipSkills";

/**
 * An interface used to define what items a character starts with 
 * and whether they are server side spawns (and how many) or 
 * read from dbc which always spawns max stack of an item. 
 */
interface StartItem {
    /**
     * The Item ID.
     */
    entry: number;

    /**
     * How many of them we'll add, only used for server side additions.
     */
    amount: number;

    /**
     * Dictates whether something is shown in dbc's or added server side. 
     * Difference is basically items existing pre-create and post-create.
     */
    server: bool;
}

/**
 * Utility class for handling the player.
 */
export class Player {
    /**
     * Calculates the maximum skill value for a given player level.
     * Formula: level > 60 ? 300 + ((level - 60) * 75) / 10 : level * 5
     * 
     * @param maxLevel Maximum player level
     * @returns Maximum skill value
     */
    private getMaxSkillValue(maxLevel: number): number {
        return maxLevel > 60 ? 300 + Math.floor((maxLevel - 60) * 75 / 10) : maxLevel * 5;
    }

    /**
     * Sets the level cap and fixes all related validation errors.
     * 
     * This fixes:
     * - Quest RequiredSkillPoints that exceed max skill value (sets to 0)
     * - LFG dungeon rewards with maxLevel > cap (deletes them, since maxLevel is a primary key)
     * - Conditions with skill values > max skill (deletes them)
     * 
     * @param maxLevel Maximum player level (e.g., 60)
     */
    setMaxLevel(maxLevel: number) {
        const maxSkill = this.getMaxSkillValue(maxLevel);

        // Remove quest skill requirements
        SQL.quest_template_addon.queryAll({}).forEach(addon => {
            if (addon.RequiredSkillPoints.get() > maxSkill) {
                addon.RequiredSkillPoints.set(0);
            }
        });

        // Delete LFG dungeon rewards with maxLevel > cap
        // Note: maxLevel is part of the primary key, so we can't modify it - must delete
        SQL.lfg_dungeon_rewards.queryAll({}).forEach(reward => {
            if (reward.maxLevel.get() > maxLevel) {
                reward.delete();
            }
        });

        // Delete conditions with invalid skill values
        // Note: These conditions are currently skipped by the server (they fail validation),
        // so deleting them has no immediate gameplay impact. However, if you later change the
        // level cap or want players to access higher-level content from a lower level, be aware
        // that deleting these conditions removes skill-based restrictions on:
        // - Creature/GameObject loot drops (SourceType 1, 4)
        // - Gossip menus/options (SourceType 14, 15)
        // - Spell targeting (SourceType 17)
        // This may allow access to content that was previously gated behind skill requirements.
        SQL.conditions.queryAll({ ConditionTypeOrReference: 7 }).forEach(condition => {
            if (condition.ConditionValue2.get() > maxSkill) {
                condition.delete();
            }
        });
    }

    /**
     * Sets XP values for specific levels, modifying existing entries or creating new ones.
     * 
     * This function only modifies the specified levels, leaving all other levels unchanged.
     * This is useful when you want to customize XP for levels 1-60 while preserving
     * entries for levels 61-80 (which may be referenced by other systems even if
     * players can't reach those levels due to server config).
     * 
     * @param xpValues Array of [level, xp] pairs. Example: [[1, 400], [2, 900], ...]
     */
    setXpForLevel(xpValues: Array<[number, number]>) {
        xpValues.forEach(([level, xp]) => {
            const existing = SQL.player_xp_for_level.query({ Level: level });
            if (existing) {
                // Modify existing entry
                existing.Experience.set(xp);
            } else {
                // Create new entry if it doesn't exist
                SQL.player_xp_for_level.add(level, { Experience: xp });
            }
        });
    }

    /**
     * Enables automatic learning of an equipment-related skill line for specified classes and races.
     * 
     * @param skill The EquipSkill object representing the weapon/armor proficiency to enable.
     * @param cls Optional class mask constraining which classes can learn this skill.
     * @param race Race mask constraining which races can learn this skill.
     * @param rank The starting rank that characters receive when they autolearn the skill.
     */
    private enableEquipSkill(skill: EquipSkill, cls?: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask> = MaskCell32.AllBits, rank: number = 0) {
        if (skill.Skill.get().RaceClassInfos.length === 0) {
            skill.Skill.get().enableAutolearn(cls, race)
        } else {
            skill.Skill.get().RaceClassInfos.forEach(x => x.ClassMask.add(cls).RaceMask.add(race))
            skill.Skill.get().Autolearn.addGet(cls, race).Rank.set(rank);
        }
    }

    /**
     * Configures starting weapon/armor proficiencies for new characters based on race and class.
     * 
     * This maps a SkillLine ID (e.g., Swords = 43) to the corresponding spell that grants the proficiency,
     * then enables automatic learning of that proficiency for the specified races and classes.
     * 
     * @param entry The SkillLine ID from skillline.dbc
     * @param races Bitmask of allowed races
     * @param classes Bitmask of allowed classes
     */
    setStartSkills(entry: number, races: number, classes: number) {
        const skill_line = std.SkillLines.load(entry);

        let spell = 0;

        switch (skill_line.ID) {
            case 54: spell = 198; break;
            case 160: spell = 199; break;
            case 173: spell = 1180; break;
            case 43: spell = 201; break;
            case 55: spell = 202; break;
            case 44: spell = 196; break;
            case 172: spell = 197; break;
            case 229: spell = 200; break;
            case 473: spell = 15590; break;
            case 45: spell = 264; break;
            case 226: spell = 5011; break;
            case 46: spell = 266; break;
            case 136: spell = 227; break;
            case 176: spell = 2567; break;
            case 228: spell = 5009; break;
            case 433: spell = 9116; break;
            case 415: spell = 9078; break;
            case 414: spell = 9077; break;
            case 413: spell = 8737; break;
            case 293: spell = 750; break;
            default:
                console.warn(`Unhandled equip skill ID: ${skill_line.ID}`);
                break;
        }

        const equip_skill = std.EquipSkills.load(skill_line.ID, spell);

        this.enableEquipSkill(equip_skill, classes, races);
    }

    /**
     * Adds items as on-create for Players based on race and class. 
     * @param race Race ID we're setting items too.
     * @param classType Class ID we're setting items too.
     * @param startItems The items themselves. The target slot is automatically derived from the item's InventoryType.
     */
    setStartItems(race: RaceIDs, classType: ClassIDs, startItems: Array<StartItem>) {
        std.DBC.CharStartOutfit.queryAll({ RaceID: race, ClassID: classType }).forEach((value) => {
            let displays: Array<number> = [];
            let inventories: Array<number> = [];
            let entries: Array<number> = [];

            startItems.forEach((startItem) => {
                if (startItem.server) {
                    std.SQL.playercreateinfo_item.add(race, classType, startItem.entry, { amount: startItem.amount });
                    return;
                }

                let dbc = std.Items.load(startItem.entry);

                entries.push(startItem.entry);
                displays.push(dbc.DisplayInfo.get());
                inventories.push(dbc.InventoryType.get());
            });

            value
                .ItemID.fill(-1)
                .ItemID.set(entries)
                .DisplayItemID.fill(-1)
                .DisplayItemID.set(displays)
                .InventoryType.fill(-1)
                .InventoryType.set(inventories);
        });
    }
}

export const PlayerRegistry = new Player();

