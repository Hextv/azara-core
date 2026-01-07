import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";
import { ClassMask } from "wow/wotlk/std/Class/ClassRegistry";
import { RaceMask } from "wow/wotlk/std/Race/RaceType";

// Wipe existing skill info
[
    45,  // Bows
    226, // Crossbows
    173, // Daggers
    46,  // Guns
    44,  // One-Handed Axes
    54,  // One-Handed Maces
    43,  // One-Handed Swords
    136, // Staves
    176, // Thrown
    172, // Two-Handed Axes
    160, // Two-Handed Maces
    55,  // Two-Handed Swords
    228  // Wands
].forEach((v) => {
    std.SQL.playercreateinfo_skills
        .queryAll({ skill: v })
        .forEach((v) => v.delete());
});

/* Druid (Night Elf) */
azaraSTD.Player.setStartSkills(173, RaceMask.NIGHTELF, ClassMask.DRUID); // Daggers
azaraSTD.Player.setStartSkills(136, RaceMask.NIGHTELF, ClassMask.DRUID); // Staves

/* Hunter (Dwarf) */
azaraSTD.Player.setStartSkills(46, RaceMask.DWARF, ClassMask.HUNTER); // Guns
azaraSTD.Player.setStartSkills(44, RaceMask.DWARF, ClassMask.HUNTER); // One-Handed Axes

/* Hunter (Night Elf) */
azaraSTD.Player.setStartSkills(45, RaceMask.NIGHTELF, ClassMask.HUNTER); // Bows
azaraSTD.Player.setStartSkills(173, RaceMask.NIGHTELF, ClassMask.HUNTER); // Daggers

/* Hunter (Human) */
azaraSTD.Player.setStartSkills(45, RaceMask.HUMAN, ClassMask.HUNTER); // Bows
azaraSTD.Player.setStartSkills(43, RaceMask.HUMAN, ClassMask.HUNTER); // One-Handed Swords

/* Mage (Human) */
azaraSTD.Player.setStartSkills(136, RaceMask.HUMAN, ClassMask.MAGE); // Staves
azaraSTD.Player.setStartSkills(228, RaceMask.HUMAN, ClassMask.MAGE); // Wands

/* Mage (Dwarf) */
azaraSTD.Player.setStartSkills(136, RaceMask.DWARF, ClassMask.MAGE); // Staves
azaraSTD.Player.setStartSkills(228, RaceMask.DWARF, ClassMask.MAGE); // Wands

/* Mage (Night Elf) */
azaraSTD.Player.setStartSkills(136, RaceMask.NIGHTELF, ClassMask.MAGE); // Staves
azaraSTD.Player.setStartSkills(228, RaceMask.NIGHTELF, ClassMask.MAGE); // Wands

/* Paladin (Dwarf) */
azaraSTD.Player.setStartSkills(44, RaceMask.DWARF, ClassMask.PALADIN); // One-Handed Axes
azaraSTD.Player.setStartSkills(172, RaceMask.DWARF, ClassMask.PALADIN); // Two-Handed Axes

/* Paladin (Human) */
azaraSTD.Player.setStartSkills(54, RaceMask.HUMAN, ClassMask.PALADIN); // One-Handed Maces
azaraSTD.Player.setStartSkills(160, RaceMask.HUMAN, ClassMask.PALADIN); // Two-Handed Maces

/* Paladin (Night Elf) */
azaraSTD.Player.setStartSkills(43, RaceMask.NIGHTELF, ClassMask.PALADIN); // One-Handed Swords
azaraSTD.Player.setStartSkills(55, RaceMask.NIGHTELF, ClassMask.PALADIN); // Two-Handed Swords

/* Priest (Dwarf) */
azaraSTD.Player.setStartSkills(54, RaceMask.DWARF, ClassMask.PRIEST); // One-Handed Maces
azaraSTD.Player.setStartSkills(228, RaceMask.DWARF, ClassMask.PRIEST); // Wands

/* Priest (Human) */
azaraSTD.Player.setStartSkills(54, RaceMask.HUMAN, ClassMask.PRIEST); // One-Handed Maces
azaraSTD.Player.setStartSkills(228, RaceMask.HUMAN, ClassMask.PRIEST); // Wands

/* Priest (Night Elf) */
azaraSTD.Player.setStartSkills(54, RaceMask.NIGHTELF, ClassMask.PRIEST); // One-Handed Maces
azaraSTD.Player.setStartSkills(228, RaceMask.NIGHTELF, ClassMask.PRIEST); // Wands

/* Rogue (Dwarf) */
azaraSTD.Player.setStartSkills(173, RaceMask.DWARF, ClassMask.ROGUE); // Daggers
azaraSTD.Player.setStartSkills(176, RaceMask.DWARF, ClassMask.ROGUE); // Thrown

/* Rogue (Human) */
azaraSTD.Player.setStartSkills(173, RaceMask.HUMAN, ClassMask.ROGUE); // Daggers
azaraSTD.Player.setStartSkills(176, RaceMask.HUMAN, ClassMask.ROGUE); // Thrown

/* Rogue (Night Elf) */
azaraSTD.Player.setStartSkills(173, RaceMask.NIGHTELF, ClassMask.ROGUE); // Daggers
azaraSTD.Player.setStartSkills(176, RaceMask.NIGHTELF, ClassMask.ROGUE); // Thrown

/* Shaman (Dwarf) */
azaraSTD.Player.setStartSkills(54, RaceMask.DWARF, ClassMask.SHAMAN); // One-Handed Maces
azaraSTD.Player.setStartSkills(136, RaceMask.DWARF, ClassMask.SHAMAN); // Staves

/* Warlock (Human) */
azaraSTD.Player.setStartSkills(173, RaceMask.HUMAN, ClassMask.WARLOCK); // Daggers
azaraSTD.Player.setStartSkills(228, RaceMask.HUMAN, ClassMask.WARLOCK); // Wands

/* Warrior (Dwarf) */
azaraSTD.Player.setStartSkills(44, RaceMask.DWARF, ClassMask.WARRIOR); // One-Handed Axes
azaraSTD.Player.setStartSkills(54, RaceMask.DWARF, ClassMask.WARRIOR); // One-Handed Maces
azaraSTD.Player.setStartSkills(172, RaceMask.DWARF, ClassMask.WARRIOR); // Two-Handed Axes

/* Warrior (Human) */
azaraSTD.Player.setStartSkills(44, RaceMask.HUMAN, ClassMask.WARRIOR); // One-Handed Axes
azaraSTD.Player.setStartSkills(54, RaceMask.HUMAN, ClassMask.WARRIOR); // One-Handed Maces
azaraSTD.Player.setStartSkills(43, RaceMask.HUMAN, ClassMask.WARRIOR); // One-Handed Swords

/* Warrior (Night Elf) */
azaraSTD.Player.setStartSkills(54, RaceMask.NIGHTELF, ClassMask.WARRIOR); // One-Handed Maces
azaraSTD.Player.setStartSkills(43, RaceMask.NIGHTELF, ClassMask.WARRIOR); // One-Handed Swords
azaraSTD.Player.setStartSkills(173, RaceMask.NIGHTELF, ClassMask.WARRIOR); // Daggers