import { DBC, std } from "wow/wotlk";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const HUNTER_CLASS = std.Classes.load("HUNTER");
const HUMAN_RACE_ID = 1;

HUNTER_CLASS.Races.add(["HUMAN"] as any);

// Starting outfit
const ORC_HUNTER_OUTFIT = DBC.CharStartOutfit.queryAll({ ClassID: HUNTER_CLASS.ID, RaceID: 2 });

ORC_HUNTER_OUTFIT.forEach(entry => {
    entry.clone(Ids.CharStartOutfit.id())
        .ClassID.set(HUNTER_CLASS.ID)
        .RaceID.set(HUMAN_RACE_ID)
})

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 2973 },  // Raptor Strike
    { button: 2, action: 75 },    // Auto Shot
    { button: 3, action: 59752 }, // Every Man for Himself (Human racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(HUMAN_RACE_ID, HUNTER_CLASS.ID, button, { action, type: 0 });
})

// Starting skills - Hunter weapon proficiencies
std.EquipSkills.Axes1H.enableAutolearnClass("HUNTER")
std.EquipSkills.Bows.enableAutolearnClass("HUNTER")