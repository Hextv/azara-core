import { std, SQL } from "wow/wotlk";
import { AchievementFlags } from "wow/wotlk/std/Achievement/Achievement";

export class Achievement {
    // Track which achievements are being processed to prevent duplicate processing
    private static processingAchievements = new Set<number>();

    /**
     * Disables an Achievement by disabling all its criteria and setting it to hidden.
     * 
     * The achievement will:
     * - Have its criteria disabled (via SQL disables table)
     * - Be marked as hidden in the DBC (will be exported to client)
     * - Not track progress or be completable
     * 
     * @param id The Achievement ID to disable.
     */
    disableByID(id: number) {
        // Prevent duplicate processing
        if (Achievement.processingAchievements.has(id)) {
            return;
        }
        
        Achievement.processingAchievements.add(id);
        
        const achievement = std.Achievements.load(id);

        if (!achievement || achievement.isDeleted()) {
            Achievement.processingAchievements.delete(id);
            return;
        }

        // Disable all criteria for this achievement
        const criteria = achievement.Criteria.get();
        criteria.forEach((c: any) => {
            const criteriaId = c.ID;
            // Check if already disabled
            const existingDisable = SQL.disables.query({ sourceType: 4, entry: criteriaId });
            if (!existingDisable) {
                // sourceType = 4 is DISABLE_TYPE_ACHIEVEMENT_CRITERIA
                SQL.disables.add(4, criteriaId, {
                    flags: 0,
                    params_0: '',
                    params_1: '',
                    comment: `Disabled achievement criteria ${criteriaId} for achievement ${id}`
                });
            }
        });


        achievement.Flags.add(AchievementFlags.Hidden);

        const childAchievements = std.Achievements.queryAll({ Previous: id });
        childAchievements.forEach((child) => {
            this.disableByID(child.ID);
        });
        
        Achievement.processingAchievements.delete(id);
    }

    /**
     * Disables all Achievements in a specific Category by category ID.
     * 
     * @param categoryId The Achievement Category ID.
     */
    disableCategoryById(categoryId: number) {
        const category = std.AchievementCategory.load(categoryId);
        if (!category || category.isDeleted()) {
            return;
        }

        const achievements = std.Achievements.queryAll({ Category: categoryId });
        achievements.forEach((value) => {
            this.disableByID(value.ID);
        });
    }
}

export const AchievementsRegistry = new Achievement();