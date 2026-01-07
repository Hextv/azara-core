import { std } from "wow/wotlk";

const PALADIN = std.Classes.load("PALADIN");
const NIGHT_ELF = 4;

PALADIN.Races.add(["NIGHTELF"]);

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 21084 }, // Seal of Righteousness
    { button: 2, action: 635 },   // Holy Light
    { button: 3, action: 58984 }, // Shadowmeld (Night Elf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(NIGHT_ELF, PALADIN.ID, button, { action, type: 0 });
})