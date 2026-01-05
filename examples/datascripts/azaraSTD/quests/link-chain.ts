import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";

/** Links two quests together sequentially */

const EXAMPLE_QUEST_ONE = std.Quests.load(12) // The People's Militia (part one)
const EXAMPLE_QUEST_TWO = std.Quests.load(13) // The People's Militia (part two)

azaraSTD.Quests.linkChain(EXAMPLE_QUEST_ONE, EXAMPLE_QUEST_TWO)