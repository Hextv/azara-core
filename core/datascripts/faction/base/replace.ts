import { std } from "wow/wotlk";

std.UI.GlueStrings.ALLIANCE.set("Azara");
std.Factions.query({ ID: 469 }).Name.enGB.set("Azara")

// Stormwind
std.Factions.load(72)
    .Name.enGB.set("Arcadia")
    .Description.enGB.set("Placeholder")

// Ironforge
std.Factions.load(47)
    .Name.enGB.set("Stonehelm")
    .Description.enGB.set("Placeholder")

// Darnassus
std.Factions.load(69)
    .Name.enGB.set("Letharion")
    .Description.enGB.set("Placeholder");

// Hide unwanted city reputations (Orgrimmar, Undercity, Thunder Bluff, etc.)
[
    76,   // Orgrimmar
    68,   // Undercity
    81,  // Thunder Bluff
    530,  // Darkspear Trolls
    911, // Silvermoon City
    930, // The Exodar
    54    // Gnomeregan Exiles
].forEach(id => {
    std.Factions.load(id)
        .Reputation.forEach((rep) => {
            rep
                .Flags.INVISIBLE_FORCED.set(true)
                .Flags.HIDDEN.set(true);
        });
});

// Factions under the Classic parent get moved to their own category
std.Factions.queryAll({ ParentFactionID: 1118 }).forEach(value => value.Parent.set(0));