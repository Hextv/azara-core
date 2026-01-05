import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";

const EXAMPLE_QUEST_ONE = std.Quests.load(12) // The People's Militia (part one)

azaraSTD.Quests.addReputation(EXAMPLE_QUEST_ONE, 72) // Award reputation to Arcadia