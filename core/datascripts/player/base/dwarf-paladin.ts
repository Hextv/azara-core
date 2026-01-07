import { DBC, std } from "wow/wotlk";

const PALADIN_CLASS = std.Classes.load("PALADIN");
const NEW_STARTER_WEAPON = 12282

// Starting outfit
const DWARF_PALADIN_OUTFIT = DBC.CharStartOutfit.queryAll({ ClassID: PALADIN_CLASS.ID, RaceID: 3 });

DWARF_PALADIN_OUTFIT.forEach(entry => {
    entry.ItemID.setIndex(0, NEW_STARTER_WEAPON)
})

// Starting skills - Change Paladin weapon proficiencies
std.EquipSkills.Axes1H.enableAutolearnClass("PALADIN")
std.EquipSkills.Axes2H.enableAutolearnClass("PALADIN")

// Remove Maces1H & Maces2H
std.EquipSkills.Maces1H.Skill.get().Autolearn.clearPair("PALADIN", "DWARF")
std.EquipSkills.Maces2H.Skill.get().Autolearn.clearPair("PALADIN", "DWARF")