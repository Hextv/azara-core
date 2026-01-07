import { std } from "wow/wotlk";

const MAGE = std.Classes.load("MAGE");
const DWARF = 3;

MAGE.Races.add(["DWARF"]);

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 133 },   // Fireball
    { button: 2, action: 168 },   // Frost Armor
    { button: 3, action: 20594 }, // Stoneform (Dwarf racial)
    { button: 4, action: 2481 },  // Find Treasure (Dwarf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(DWARF, MAGE.ID, button, { action, type: 0 });
})