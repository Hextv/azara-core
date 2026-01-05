import { std } from "wow/wotlk";
import { Quest } from "wow/wotlk/std/Quest/Quest";

export class Quests {
    /**
     * Links two quests together so it is a properly flowing quest chain.
     * @param first The first link in the chain.
     * @param second The second link in the chain.
     */
    linkChain(first: Quest, second: Quest) {
        first.NextQuest.set(second.ID);
        first.row.RewardNextQuest.set(second.ID);
        second.PrevQuest.set(first.ID);
    }

    /**
     * Calculates the amount of reputation to reward.
     * @param quest The quest to update.
     * @param faction The faction ID to reward.
     */
    addReputation(quest: Quest, faction: int) {
        let difficulty = quest.Rewards.Difficulty.get();

        if (difficulty == 1)
            quest.Rewards.Reputation.add(faction, 10);

        if (difficulty == 2)
            quest.Rewards.Reputation.add(faction, 25);

        if (difficulty == 3)
            quest.Rewards.Reputation.add(faction, 50);

        if (difficulty == 4)
            quest.Rewards.Reputation.add(faction, 75);

        if (difficulty == 5)
            quest.Rewards.Reputation.add(faction, 100);

        if (difficulty == 6)
            quest.Rewards.Reputation.add(faction, 150);

        if (difficulty == 7)
            quest.Rewards.Reputation.add(faction, 200);
    }

    /**
     * Assigns a Creature Template as explicitly dropping an item 
     * used for displaying hover info in game tooltip.
     * @param creature Creature Entry.
     * @param item Item Entry.
     */
    registerCreatureDrop(creature: number, item: number) {
        this.registerDrop(0, item, creature);
    }

    /**
     * Assigns a Game Object as explicitly dropping an item 
     * used for displaying hover info in game tooltip.
     * @param go Game Object Entry.
     * @param item Item Entry.
     */
    registerGameobjectDrop(go: number, item: number) {
        this.registerDrop(1, item, go);
    }

    private registerDrop(type: number, item: number, entity: number) {
        let id = 0;

        const i = std.Items.load(item);
        if (i != undefined)
            i.Flags.PARTY_LOOT.set(true);

        /** Figure out ID. */
        if (type === 0) {
            id = std.SQL.creature_questitem.queryAll({ CreatureEntry: entity }).length;
        } else {
            id = std.SQL.gameobject_questitem.queryAll({ GameObjectEntry: entity }).length;
        }

        /** Write. */
        if (type === 0) {
            std.SQL.creature_questitem.add(entity, id).ItemId.set(item).VerifiedBuild.set(101);
        } else {
            std.SQL.gameobject_questitem.add(entity, id).ItemId.set(item).VerifiedBuild.set(101);
        }
    }
}

export const QuestsRegistry = new Quests();