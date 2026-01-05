import { AchievementsRegistry } from "./achievement";
import { ConditionRegistry } from "./conditions";
import { CreatureTemplateRegistry } from "./creature";
import { GossipRegistry } from "./gossip";
import { ItemRegistry } from "./items";
import { QuestsRegistry } from "./quests";

export const azaraSTD = {
    Achievement: AchievementsRegistry,
    Conditions: ConditionRegistry,
    Creature: CreatureTemplateRegistry,
    Gossip: GossipRegistry,
    Items: ItemRegistry,
    Quest: QuestsRegistry
};

console.log("Initializing library shadows-of-azara.std");