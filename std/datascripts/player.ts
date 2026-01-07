import { SQL } from "wow/wotlk";

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
}

export const PlayerRegistry = new Player();

