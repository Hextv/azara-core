import { std } from "wow/wotlk";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const DWARF_RACE_ID = 3;
const ORC_RACE_ID = 2;

const shamanClass = std.Classes.load("SHAMAN");

shamanClass.Races.add(["DWARF"] as any);

const sourceGearEntries = std.DBC.CharStartOutfit.queryAll({
    ClassID: shamanClass.ID,
    RaceID: ORC_RACE_ID
});

for (const sourceEntry of sourceGearEntries) {
    const clonedEntry = sourceEntry.clone(Ids.CharStartOutfit.id());
    clonedEntry.ClassID.set(shamanClass.ID);
    clonedEntry.RaceID.set(DWARF_RACE_ID);
}

std.EquipSkills.Daggers.enableAutolearnClass(shamanClass.Mask)
std.EquipSkills.Axes1H.enableAutolearnClass(shamanClass.Mask)
std.EquipSkills.FistWeapons.enableAutolearnClass(shamanClass.Mask)