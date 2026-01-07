import { std } from "wow/wotlk";

const SHAMAN = std.Classes.load("SHAMAN");
const DWARF = 3;

SHAMAN.Races.add(["DWARF"]);

// Starting action bars
const actions = [
    { button: 0, action: 6603 },    // Auto Attack
    { button: 1, action: 403 },     // Lightning Bolt
    { button: 2, action: 331 },     // Healing Wave
    { button: 3, action: 20594 },   // Stoneform (Dwarf racial)
    { button: 4, action: 2481 }     // Find Treasure (Dwarf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(DWARF, SHAMAN.ID, button, { action, type: 0 });
})