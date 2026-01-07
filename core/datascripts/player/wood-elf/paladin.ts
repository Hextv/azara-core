import { DBC, std } from "wow/wotlk";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const PALADIN_CLASS = std.Classes.load("PALADIN");
const NIGHTELF_RACE_ID = 4;
const NEW_STARTER_WEAPON = 49778;

PALADIN_CLASS.Races.add(["NIGHTELF"] as any);

// Starting outfit - clone from Human Paladin (Race ID 1)
const HUMAN_PALADIN_OUTFIT = DBC.CharStartOutfit.queryAll({ ClassID: PALADIN_CLASS.ID, RaceID: 1 });

HUMAN_PALADIN_OUTFIT.forEach(entry => {
    const newOutfit = entry.clone(Ids.CharStartOutfit.id())
        .ClassID.set(PALADIN_CLASS.ID)
        .RaceID.set(NIGHTELF_RACE_ID)
    newOutfit.ItemID.setIndex(0, NEW_STARTER_WEAPON)
})

// Starting action bars
const actions = [
    { button: 0, action: 6603 },  // Auto Attack
    { button: 1, action: 21084 }, // Seal of Righteousness
    { button: 2, action: 635 },   // Holy Light
    { button: 3, action: 58984 }, // Shadowmeld (Night Elf racial)
]

actions.forEach(({ button, action }) => {
    std.SQL.playercreateinfo_action.add(NIGHTELF_RACE_ID, PALADIN_CLASS.ID, button, { action, type: 0 });
})

// Starting skills - Paladin weapon proficiencies
std.EquipSkills.Swords1H.enableAutolearnClass("PALADIN")
std.EquipSkills.Swords2H.enableAutolearnClass("PALADIN")

// Remove Maces1H & Maces2H
std.EquipSkills.Maces1H.Skill.get().Autolearn.clearPair("PALADIN", "NIGHTELF")
std.EquipSkills.Maces2H.Skill.get().Autolearn.clearPair("PALADIN", "NIGHTELF")