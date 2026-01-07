import { std } from "wow/wotlk";

export const NORTHERN_MOUNTAINS = std.Maps
    .create('azara-core', 'northern-mountains')
    .Directory.set('NorthernMountains')
    .Name.enGB.set('Northern Mountains')

export const IRONHEART_VALLEY = std.Areas
    .create('azara-core', 'ironheart-valley')
    .Name.enGB.set('Ironheart Valley')
    .Map.set(NORTHERN_MOUNTAINS.ID)
    .ExplorationLevel.set(1)

export const STONEVEIN_RIDGE = std.Areas
    .create('azara-core', 'stonevein-ridge')
    .Name.enGB.set('Stonevein Ridge')
    .Map.set(NORTHERN_MOUNTAINS.ID)
    .ParentArea.set(IRONHEART_VALLEY.ID)
    .ExplorationLevel.set(1)

