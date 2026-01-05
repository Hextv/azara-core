import { AchievementsRegistry } from "./achievement";
import { ConditionRegistry } from "./conditions";
import { CreatureTemplateRegistry } from "./creature";
import { EmotesRegistry } from "./emotes";
import { GossipRegistry } from "./gossip";
import { ItemRegistry } from "./items";
import { QuestsRegistry } from "./quests";

export const azaraSTD = {
    Achievements: AchievementsRegistry,
    Conditions: ConditionRegistry,
    Creatures: CreatureTemplateRegistry,
    Emotes: EmotesRegistry,
    Gossip: GossipRegistry,
    Items: ItemRegistry,
    Quests: QuestsRegistry
};

console.log("Initializing library shadows-of-azara.std");