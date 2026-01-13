import { std } from "wow/wotlk";
import { GameObjectFishingHole } from "wow/wotlk/std/GameObject/GameObjectTemplate";
import { Ids } from "wow/wotlk/std/Misc/Ids";
import { Position } from "wow/wotlk/std/Misc/Position";
import { ConditionRegistry } from "./conditions";

const FISHING_MOD = 'azara-core';
let poolCounter = 0;
let spawnCounter = 0;

export class Fishing {
    /**
     * Creates a fishing loot table for an area with a required skill level.
     * @param areaId The area ID where fishing will use this loot table.
     * @param skillRequired The fishing skill required for this area.
     * @returns The reference loot template ID to use with addLoot().
     */
    create(areaId: number, skillRequired: number): number {
        const LOOT_TEMPLATE = Ids.reference_loot_template.id()

        std.SQL.skill_fishing_base_level.add(areaId)
            .skill.set(skillRequired);

        std.SQL.fishing_loot_template.add(areaId, LOOT_TEMPLATE)
            .Reference.set(LOOT_TEMPLATE)
            .Chance.set(100);

        return LOOT_TEMPLATE;
    }

    /**
     * Adds loot entries to a fishing loot table.
     * @param lootTemplateId The reference loot template ID from create().
     * @param loot Array of { entry: itemId, chance: dropChance }.
     */
    addLoot(lootTemplateId: number, loot: { entry: number, chance: number }[]): void {
        loot.forEach((item) => {
            std.SQL.reference_loot_template.add(lootTemplateId, item.entry)
                .Chance.set(item.chance);
        });
    }

    /**
     * Adds a quest-only fish to a loot table (only drops when player has the quest).
     * @param lootTemplateId The reference loot template ID from create().
     * @param questId The quest ID required.
     * @param loot Array of { entry: itemId, chance: dropChance }.
     */
    addQuestLoot(lootTemplateId: number, questId: number, loot: { entry: number, chance: number }[]): void {
        loot.forEach((item) => {
            std.SQL.reference_loot_template.add(lootTemplateId, item.entry)
                .Chance.set(item.chance);

            ConditionRegistry.referenceLootTemplate(lootTemplateId, item.entry)
                .addStartedQuest(questId);
        });
    }

    // ========================================================================
    // Fishing Pools (special fishing nodes/schools)
    // ========================================================================

    /**
     * Creates a fishing pool (fishing hole) gameobject template.
     * @param name Display name of the pool (e.g., "Mountain Trout School").
     * @param radius How close bobber must land to catch from this pool (default 5).
     * @param displayId The visual display ID (default 6291 = standard fish school).
     * @returns The FishingHole gameobject template for further configuration.
     */
    createPool(name: string, radius: number = 5, displayId: number = 6291): GameObjectFishingHole {
        const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        const id = `fishing-pool-${poolCounter++}-${safeName}`;
        return std.GameObjectTemplates.FishingHoles.create(FISHING_MOD, id)
            .Name.enGB.set(name)
            .Display.set(displayId)
            .Radius.set(radius)
            .MinSuccessOpens.set(2)
            .MaxSuccessOpens.set(4)
            .Lock.set(1628); // Standard fishing lock
    }

    /**
     * Adds loot to a fishing pool.
     * @param pool The pool gameobject from createPool().
     * @param loot Array of { entry: itemId, chance: dropChance }.
     */
    addPoolLoot(pool: GameObjectFishingHole, loot: { entry: number, chance: number }[]): void {
        loot.forEach((item) => {
            pool.Loot.modRefCopy((table) => {
                table.addItem(item.entry, item.chance, 1, 1);
            });
        });
    }

    /**
     * Spawns a fishing pool at given positions.
     * @param pool The pool gameobject from createPool().
     * @param positions Array of spawn positions.
     * @tip Use `.cheat waterwalk on` in-game when collecting positions so pools spawn correctly on the water surface.
     */
    spawnPool(pool: GameObjectFishingHole, positions: Position[]): void {
        const id = `fishing-pool-spawn-${spawnCounter++}`;
        pool.Spawns.add(FISHING_MOD, id, positions);
    }
}

export const FishingRegistry = new Fishing();
