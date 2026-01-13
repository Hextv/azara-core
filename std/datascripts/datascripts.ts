import { AchievementsRegistry } from "./classes/achievement";
import { ConditionRegistry } from "./classes/conditions";
import { CreatureTemplateRegistry } from "./classes/creature";
import { EmotesRegistry } from "./classes/emotes";
import { FishingRegistry } from "./classes/fishing";
import { GossipRegistry } from "./classes/gossip";
import { HolidaysRegistry } from "./classes/holidays";
import { ItemRegistry } from "./classes/items";
import { PlayerRegistry } from "./classes/player";
import { QuestsRegistry } from "./classes/quests";
import { VendorsRegistry } from "./classes/vendors";

export const azaraSTD = {
    Achievements: AchievementsRegistry,
    Conditions: ConditionRegistry,
    Creatures: CreatureTemplateRegistry,
    Emotes: EmotesRegistry,
    Fishing: FishingRegistry,
    Gossip: GossipRegistry,
    Holiday: HolidaysRegistry,
    Items: ItemRegistry,
    Player: PlayerRegistry,
    Quests: QuestsRegistry,
    Vendors: VendorsRegistry
};

console.log("Initializing library shadows-of-azara.std");