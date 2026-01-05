import { DBC } from "wow/wotlk";

const EXCLUDED_SOUNDS = new Set([
    "HumanFemaleOfficialNPCFarewell05",
    "HumanFemaleOfficialNPCGreeting04",
    "HumanMaleOfficialNPCFarewell02",
    "HumanMaleOfficialNPCFarewell04",
    "HumanMaleOfficialNPCGreeting05",
    "HumanMaleWarriorNPCFarewell05",
    "NightElfFemalePriestessNPCFarewell02",
    "NightElfFemalePriestessNPCFarewell03",
    "NightElfFemalePriestessNPCFarewell04",
    "NightElfFemalePriestessNPCFarewell05",
    "NightElfFemalePriestessNPCGreeting01",
    "NightElfFemalePriestessNPCGreeting04",
    "NightElfFemalePriestessNPCGreeting06",
    "NightElfFemaleSentinelNPCFarewell03",
    "NightElfFemaleSentinelNPCFarewell05",
    "NightElfFemaleSentinelNPCGreeting02",
    "NightElfFemaleStandardNPCFarewell04",
    "NightElfFemaleStandardNPCFarewell05",
    "NightElfFemaleStandardNPCGreeting02",
    "NightElfFemaleStandardNPCGreeting04",
    "NightElfFemaleStandardNPCGreeting05",
    "NightElfMaleOfficialNPCFarewell04",
    "NightElfMaleOfficialNPCFarewell05",
    "NightElfMaleOfficialNPCGreeting05",
    "NightElfMaleStandardNPCFarewell02",
    "NightElfMaleStandardNPCFarewell03",
    "NightElfMaleStandardNPCGreeting01",
    "NightElfMaleStandardNPCGreeting06",
    "NightElfMaleWarriorNPCFarewell02",
    "NightElfMaleWarriorNPCFarewell03",
    "NightElfMaleWarriorNPCGreeting03",
]);

DBC.SoundEntries.queryAll({}).forEach((entry) => {
    const files = entry.File.get();
    const freqs = entry.Freq.get();

    // Collect non-excluded files with their frequencies
    const kept: { file: string; freq: number }[] = [];
    files.forEach((file, index) => {
        if (file) {
            const basename = file.replace(/\.wav$/i, "");
            if (!EXCLUDED_SOUNDS.has(basename)) {
                kept.push({ file, freq: freqs[index] || 1 });
            }
        }
    });

    // Rebuild arrays: valid entries packed at start, rest empty/zeroed
    files.forEach((_, index) => {
        if (index < kept.length) {
            entry.File.setIndex(index, kept[index].file);
            entry.Freq.setIndex(index, kept[index].freq);
        } else {
            entry.File.setIndex(index, "");
            entry.Freq.setIndex(index, 0);
        }
    });
});
