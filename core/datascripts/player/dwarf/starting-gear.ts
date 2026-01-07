import { azaraSTD } from "shadows-of-azara.std";
import { ClassIDs } from "wow/wotlk/std/Class/ClassIDs";
import { RaceIDs } from "wow/wotlk/std/Race/RaceType";

/**
 * Warrior.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.WARRIOR, [
    { entry: 38, amount: 1, server: false },
    { entry: 39, amount: 1, server: false },
    { entry: 40, amount: 1, server: false },
    { entry: 117, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
    { entry: 12282, amount: 1, server: false },
]);

/**
 * Paladin.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.PALADIN, [
    { entry: 43, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 12282, amount: 1, server: false },
    { entry: 4540, amount: 4, server: true },
    { entry: 6117, amount: 1, server: false },
    { entry: 6118, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Hunter.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.HUNTER, [
    { entry: 37, amount: 1, server: false },
    { entry: 117, amount: 4, server: true },
    { entry: 129, amount: 1, server: false },
    { entry: 147, amount: 1, server: false },
    { entry: 148, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2102, amount: 1, server: true },
    { entry: 2508, amount: 1, server: false },
    { entry: 2516, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Rogue.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.ROGUE, [
    { entry: 47, amount: 1, server: false },
    { entry: 48, amount: 1, server: false },
    { entry: 49, amount: 1, server: false },
    { entry: 2092, amount: 1, server: false },
    { entry: 25861, amount: 1, server: false },
    { entry: 4540, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Priest.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.PRIEST, [
    { entry: 36, amount: 1, server: false },
    { entry: 51, amount: 1, server: false },
    { entry: 52, amount: 1, server: false },
    { entry: 53, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 4540, amount: 4, server: true },
    { entry: 6098, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Shaman.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.SHAMAN, [
    { entry: 36, amount: 1, server: false },
    { entry: 153, amount: 1, server: false },
    { entry: 154, amount: 1, server: false },
    { entry: 117, amount: 4, server: true },
    { entry: 159, amount: 2, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Mage.
 */
azaraSTD.Player.setStartItems(RaceIDs.DWARF, ClassIDs.MAGE, [
    { entry: 35, amount: 1, server: false },
    { entry: 55, amount: 1, server: false },
    { entry: 56, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 1395, amount: 1, server: false },
    { entry: 4536, amount: 4, server: true },
    { entry: 6096, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);