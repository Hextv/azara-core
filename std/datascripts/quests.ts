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
}

export const QuestsRegistry = new Quests();