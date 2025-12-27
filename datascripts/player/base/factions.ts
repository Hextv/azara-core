import { std } from "wow/wotlk";

// This handles the character selection screen and other UI elements.
std.UI.GlueStrings.ALLIANCE.set("Azara");
// Also rename the Race Info/Faction Info text if possible, but ALLIANCE is the main one.

// Stormwind (72) -> Arcadia
const stormwind = std.Factions.load(72);
stormwind.Name.enGB.set("Arcadia");

// Ironforge (47) -> Stonehelm
const ironforge = std.Factions.load(47);
ironforge.Name.enGB.set("Stonehelm");

// Darnassus (69) -> Letharion
const darnassus = std.Factions.load(69);
darnassus.Name.enGB.set("Letharion");

// Move Horde Races to the Alliance (now Azara)
const hordeRaceIds = [
    2,  // Orc
    5,  // Undead
    6,  // Tauren
    8,  // Troll
    10  // Blood Elf
];

hordeRaceIds.forEach(id => {
    const race = std.DBC.ChrRaces.findById(id);
    if (race) {
        race.FactionID.set(1); // Set to Human/Alliance Faction
    }
});

// 4. Make all Horde NPCs friendly to Azara (Alliance Group)
const MASK_ALLIANCE = 2;
const MASK_HORDE = 4;

std.DBC.FactionTemplate.queryAll({}).forEach(row => {
    const factionGroup = row.FactionGroup.get();
    
    // Check if the faction template belongs to the Horde group
    if ((factionGroup & MASK_HORDE) !== 0) {
        // Add ALLIANCE to FriendGroup
        row.FriendGroup.set(row.FriendGroup.get() | MASK_ALLIANCE);
        // Remove ALLIANCE from EnemyGroup
        row.EnemyGroup.set(row.EnemyGroup.get() & ~MASK_ALLIANCE);
    }
});

// 5. Hide unwanted City Reputations (Orgrimmar, Undercity, Thunder Bluff, etc.)
// We only want Arcadia (Stormwind), Stonehelm (Ironforge), and Letharion (Darnassus) to be visible.
const factionsToHide = [
    85,   // Orgrimmar
    71,   // Undercity
    105,  // Thunder Bluff
    126,  // Darkspear Trolls
    1604, // Silvermoon City
    1639, // The Exodar
    54    // Gnomeregan Exiles
];

factionsToHide.forEach(id => {
    const faction = std.Factions.load(id);
    if (faction) {
        // Iterate through all reputation settings (usually 4 slots)
        for (let i = 0; i < faction.Reputation.length; i++) {
            const rep = faction.Reputation.get(i);
            
            // 1. Clear Race and Class masks so NO ONE can have this reputation
            rep.RaceMask.set(0);
            rep.ClassMask.set(0);

            // 2. Set Flags to HIDDEN and INVISIBLE_FORCED just in case
            // HIDDEN (4) | INVISIBLE_FORCED (8) = 12
            rep.Flags.set(12);
            
            // 3. Clear base reputation value
            rep.StartReputation.set(0);
        }
    }
});
