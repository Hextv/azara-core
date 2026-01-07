import { AchievementsRegistry } from "./achievement";
import { ConditionRegistry } from "./conditions";
import { CreatureTemplateRegistry } from "./creature";
import { EmotesRegistry } from "./emotes";
import { GossipRegistry } from "./gossip";
import { HolidaysRegistry } from "./holidays";
import { ItemRegistry } from "./items";
import { PlayerRegistry } from "./player";
import { QuestsRegistry } from "./quests";
import { VendorsRegistry } from "./vendors";

export const azaraSTD = {
    Achievements: AchievementsRegistry,
    Conditions: ConditionRegistry,
    Creatures: CreatureTemplateRegistry,
    Emotes: EmotesRegistry,
    Gossip: GossipRegistry,
    Holiday: HolidaysRegistry,
    Items: ItemRegistry,
    Player: PlayerRegistry,
    Quests: QuestsRegistry,
    Vendors: VendorsRegistry
};

console.log("Initializing library shadows-of-azara.std");