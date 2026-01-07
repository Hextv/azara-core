import { azaraSTD } from "shadows-of-azara.std";
import { ClassIDs } from "wow/wotlk/std/Class/ClassIDs";
import { RaceIDs } from "wow/wotlk/std/Race/RaceType";

/**
 * Warrior.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.WARRIOR, [
    { entry: 25, amount: 1, server: false },
    { entry: 117, amount: 4, server: true },
    { entry: 2362, amount: 1, server: false },
    { entry: 6120, amount: 1, server: false },
    { entry: 6121, amount: 1, server: false },
    { entry: 6122, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Hunter.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.HUNTER, [
    { entry: 117, amount: 4, server: true },
    { entry: 129, amount: 1, server: false },
    { entry: 147, amount: 1, server: false },
    { entry: 148, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2092, amount: 1, server: false },
    { entry: 2101, amount: 1, server: false },
    { entry: 2504, amount: 1, server: false },
    { entry: 2512, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Rogue.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.ROGUE, [
    { entry: 47, amount: 1, server: false },
    { entry: 48, amount: 1, server: false },
    { entry: 49, amount: 1, server: false },
    { entry: 2092, amount: 1, server: false },
    { entry: 28979, amount: 1, server: false },
    { entry: 4540, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Priest.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.PRIEST, [
    { entry: 36, amount: 1, server: false },
    { entry: 51, amount: 1, server: false },
    { entry: 52, amount: 1, server: false },
    { entry: 53, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2070, amount: 4, server: true },
    { entry: 6119, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Druid.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.DRUID, [
    { entry: 159, amount: 2, server: true },
    { entry: 3661, amount: 1, server: false },
    { entry: 4536, amount: 4, server: true },
    { entry: 6123, amount: 1, server: false },
    { entry: 6124, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Mage.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.MAGE, [
    { entry: 35, amount: 1, server: false },
    { entry: 55, amount: 1, server: false },
    { entry: 56, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 1395, amount: 1, server: false },
    { entry: 4536, amount: 4, server: true },
    { entry: 6096, amount: 1, server: false },
    { entry: 6948, amount: 1, server: true },
]);

/**
 * Paladin.
 */
azaraSTD.Player.setStartItems(RaceIDs.NIGHTELF, ClassIDs.PALADIN, [
    { entry: 43, amount: 1, server: false },
    { entry: 44, amount: 1, server: false },
    { entry: 45, amount: 1, server: false },
    { entry: 49778, amount: 1, server: false },
    { entry: 159, amount: 2, server: true },
    { entry: 2070, amount: 4, server: true },
    { entry: 6948, amount: 1, server: true },
]);