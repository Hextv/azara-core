import { std } from "wow/wotlk";
import { AchievementCategory } from "wow/wotlk/std/Achievement/AchievementCategory";

export class Achievement {
    /**
     * Recursively removes an Achievement and any achievements that supersede it.
     * @param id The Achievement ID.
     */
    removeByID(id: number) {
        std.Achievements.queryAll({ Previous: id }).forEach((child) => {
            this.removeByID(child.ID);
        });

        std.Achievements.load(id).delete();
    }

    /**
     * Removes all of the Achievements for a specific Category 
     * and then removes the Category itself.
     * @param category The Parent Achievement Category.
     */
    removeCategory(category: AchievementCategory) {
        std.Achievements.queryAll({ Category: category.ID }).forEach((value) => {
            this.removeByID(value.ID);
        });

        category.delete();
    }
}

export const AchievementsRegistry = new Achievement();