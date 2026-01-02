import { std } from "wow/wotlk";

export const STONEHELM_MAP = std.Maps
    .create('azara-core', 'stonehelm')
    .Directory.set('stonehelm')
    .Name.enGB.set('Stonehelm')

export const IRONHEART_VALLEY = std.Areas
    .create('azara-core', 'ironheart-valley')
    .Name.enGB.set('Ironheart Valley')
    .Map.set(STONEHELM_MAP.ID)
    .ExplorationLevel.set(1)

export const STONEVEIN_RIDGE = std.Areas
    .create('azara-core', 'stonevein-ridge')
    .Name.enGB.set('Stonevein Ridge')
    .Map.set(STONEHELM_MAP.ID)
    .ParentArea.set(IRONHEART_VALLEY.ID)
    .ExplorationLevel.set(1)

