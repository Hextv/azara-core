import { azaraSTD } from "shadows-of-azara.std";
import { ClassIDs } from "wow/wotlk/std/Class/ClassIDs";
import { RaceIDs } from "wow/wotlk/std/Race/RaceType";

/**
 * Warrior.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.WARRIOR, [
    { entry: 38, amount: 1, server: false },
    { entry: 39, amount: 1, server: false },
    { entry: 40, amount: 1, server: false },
    { entry: 25, amount: 1, server: false },
    { entry: 2362, amount: 1, server: false },
    { entry: 117, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Paladin.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.PALADIN, [
    { entry: 43, amount: 1, server: false },
    { entry: 44, amount: 1, server: false },
    { entry: 45, amount: 1, server: false },
    { entry: 2361, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2070, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Rogue.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.ROGUE, [
    { entry: 47, amount: 1, server: false },
    { entry: 48, amount: 1, server: false },
    { entry: 49, amount: 1, server: false },
    { entry: 2070, amount: 4, server: true },
    { entry: 2092, amount: 1, server: false },
    { entry: 28979, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Priest.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.PRIEST, [
    { entry: 36, amount: 1, server: false },
    { entry: 51, amount: 1, server: false },
    { entry: 52, amount: 1, server: false },
    { entry: 53, amount: 1, server: false },
    { entry: 6098, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2070, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Mage.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.MAGE, [
    { entry: 35, amount: 1, server: false },
    { entry: 55, amount: 1, server: false },
    { entry: 56, amount: 1, server: false },
    { entry: 1395, amount: 1, server: false },
    { entry: 6096, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2070, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Warlock.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.WARLOCK, [
    { entry: 57, amount: 1, server: false },
    { entry: 59, amount: 1, server: false },
    { entry: 1396, amount: 1, server: false },
    { entry: 2092, amount: 1, server: false },
    { entry: 6097, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 4604, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Hunter.
 */
azaraSTD.Player.setStartItems(RaceIDs.HUMAN, ClassIDs.HUNTER, [
    { entry: 117, amount: 4, server: true },
    { entry: 129, amount: 1, server: false },
    { entry: 147, amount: 1, server: false },
    { entry: 148, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 25, amount: 1, server: false },
    { entry: 2101, amount: 1, server: false },
    { entry: 2504, amount: 1, server: false },
    { entry: 2512, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);