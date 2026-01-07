import { std } from "wow/wotlk";

const HUNTER = std.Classes.load("HUNTER");
const HUMAN = 1;

HUNTER.Races.add(["HUMAN"]);

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 2973 },  // Raptor Strike
    { button: 2, action: 75 },    // Auto Shot
    { button: 3, action: 59752 }, // Every Man for Himself (Human racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(HUMAN, HUNTER.ID, button, { action, type: 0 });
})