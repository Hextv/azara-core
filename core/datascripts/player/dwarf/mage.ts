import { DBC, std } from "wow/wotlk";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const MAGE_CLASS = std.Classes.load("MAGE");
const DWARF_RACE_ID = 3;

MAGE_CLASS.Races.add(["DWARF"] as any);

// Starting outfit
const GNOME_MAGE_OUTFIT = DBC.CharStartOutfit.queryAll({ ClassID: MAGE_CLASS.ID, RaceID: 7 });

GNOME_MAGE_OUTFIT.forEach(entry => {
    entry.clone(Ids.CharStartOutfit.id())
        .ClassID.set(MAGE_CLASS.ID)
        .RaceID.set(DWARF_RACE_ID)
})

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 133 },   // Fireball
    { button: 2, action: 168 },   // Frost Armor
    { button: 3, action: 20594 }, // Stoneform (Dwarf racial)
    { button: 4, action: 2481 },  // Find Treasure (Dwarf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(DWARF_RACE_ID, MAGE_CLASS.ID, button, { action, type: 0 });
})

// Starting skills - Mage weapon proficiencies
std.EquipSkills.Staves.enableAutolearnClass("MAGE")
std.EquipSkills.Wands.enableAutolearnClass("MAGE")