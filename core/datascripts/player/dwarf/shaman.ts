import { DBC, std } from "wow/wotlk";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const SHAMAN_CLASS = std.Classes.load("SHAMAN");
const DWARF_RACE_ID = 3;

SHAMAN_CLASS.Races.add(["DWARF"] as any);

// Starting outfit
const ORC_SHAMAN_OUTFIT = DBC.CharStartOutfit.queryAll({ ClassID: SHAMAN_CLASS.ID, RaceID: 2 });

ORC_SHAMAN_OUTFIT.forEach(entry => {
    entry.clone(Ids.CharStartOutfit.id())
        .ClassID.set(SHAMAN_CLASS.ID)
        .RaceID.set(DWARF_RACE_ID)
})

// Starting action bars
const actions = [
    { button: 0, action: 6603 }, // Auto Attack
    { button: 1, action: 403 }, // Lightning Bolt
    { button: 2, action: 331 }, // Healing Wave
    { button: 3, action: 20594 }, // Stoneform
    { button: 4, action: 2481 }  // Find Treasure
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(DWARF_RACE_ID, SHAMAN_CLASS.ID, button, { action, type: 0 });
})

// Starting skills
std.EquipSkills.Daggers.enableAutolearnClass("SHAMAN")
std.EquipSkills.Axes1H.enableAutolearnClass("SHAMAN")
std.EquipSkills.FistWeapons.enableAutolearnClass("SHAMAN")