import { std } from "wow/wotlk";

const MAGE = std.Classes.load("MAGE");
const NIGHT_ELF = 4;

MAGE.Races.add(["NIGHTELF"]);

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 133 },   // Fireball
    { button: 2, action: 168 },   // Frost Armor
    { button: 3, action: 58984 }, // Shadowmeld (Night Elf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(NIGHT_ELF, MAGE.ID, button, { action, type: 0 });
})