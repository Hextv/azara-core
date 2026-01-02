import { std, SQL } from "wow/wotlk";
import { AchievementCategory } from "wow/wotlk/std/Achievement/AchievementCategory";

export class Achievement {
    /**
     * Recursively removes an Achievement and any achievements that supersede it.
     * Also cleans up all related SQL table entries.
     * @param id The Achievement ID.
     */
    removeByID(id: number) {
        const achievement = std.Achievements.load(id);

        if (!achievement || achievement.isDeleted()) {
            return;
        }

        std.Achievements.queryAll({ Previous: id }).forEach((child) => {
            this.removeByID(child.ID);
        });

        std.Achievements.queryAll({ Shares_Criteria: id }).forEach((dependent) => {
            dependent.row.Shares_Criteria.set(0);
        });

        const criteria = achievement.Criteria.get();
        const criteriaIds = criteria.map((c: any) => c.ID);

        criteria.forEach((c: any) => {
            c.row.delete();
        });

        achievement.delete();

        const reward = SQL.achievement_reward.query({ ID: id });
        if (reward) {
            reward.delete();
        }

        SQL.achievement_reward_locale.queryAll({ ID: id }).forEach((locale) => {
            locale.delete();
        });

        SQL.player_factionchange_achievement.queryAll({ alliance_id: id }).forEach((row) => {
            row.delete();
        });
        SQL.player_factionchange_achievement.queryAll({ horde_id: id }).forEach((row) => {
            row.delete();
        });

        SQL.access_requirement.queryAll({ completed_achievement: id }).forEach((req) => {
            req.completed_achievement.set(0);
        });

        criteriaIds.forEach((criteriaId: number) => {
            SQL.achievement_criteria_data.queryAll({ criteria_id: criteriaId }).forEach((data) => {
                data.delete();
            });
        });
    }

    /**
     * Removes all of the Achievements for a specific Category 
     * and then removes the Category itself.
     * @param category The Parent Achievement Category.
     */
    removeCategory(category: AchievementCategory) {
        if (!category || category.isDeleted()) {
            return;
        }

        std.Achievements.queryAll({ Category: category.ID }).forEach((value) => {
            this.removeByID(value.ID);
        });

        category.delete();
    }
}

export const AchievementsRegistry = new Achievement();