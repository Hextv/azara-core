import { azaraSTD } from "shadows-of-azara.std";
// Import the area constant from your map file
// import { MY_SUBZONE } from "./my-map";

// Define the loot table for an area
// Chance values are percentages (0-100) - each item rolls independently
const MY_ZONE_FISHING_LOOT = [
    { entry: 38082, chance: 65 },   // Common fish (65% chance)
    { entry: 6289,  chance: 20 },   // Driftwood - junk
    { entry: 6290,  chance: 10 },   // Tangled Fishing Line - junk
    { entry: 6308,  chance: 5 },    // Rare fish
];

// Create fishing for an area using the imported area's ID
// First param: Area ID (from AreaTable - subzone or zone)
// Second param: Fishing skill required (1 = anyone can fish)
// const MY_ZONE_FISHING = azaraSTD.Fishing.create(MY_SUBZONE.ID, 1);
const MY_ZONE_FISHING = azaraSTD.Fishing.create(1, 1); // Replace 1 with MY_SUBZONE.ID

// Add loot to the zone's fishing table
azaraSTD.Fishing.addLoot(MY_ZONE_FISHING, MY_ZONE_FISHING_LOOT);

// ============================================================================
// Quest-Only Fishing Loot
// Use when making a quest that has fishing loot to add to an area.
// ============================================================================

// Add fish that only drops when player has a specific quest
const MY_QUEST_ID = 12345; // Replace with your quest ID
azaraSTD.Fishing.addQuestLoot(MY_ZONE_FISHING, MY_QUEST_ID, [
    { entry: 12345, chance: 25 },   // Quest fish (25% when quest active)
]);

// ============================================================================
// Fishing Pools (Schools of Fish)
// ============================================================================

// Define pool loot - pools should be rewarding (100% chance)
const MY_POOL_LOOT = [
    { entry: 6308, chance: 100 },   // Always get the target fish from this pool
];

// Define spawn positions for the pool
// TIP: Use `.cheat waterwalk on` in-game when collecting positions
const MY_POOL_POSITIONS = [
    { map: 0, x: 100.0, y: 200.0, z: 50.0, o: 0.0 },
    { map: 0, x: 105.0, y: 210.0, z: 50.0, o: 0.0 },
    { map: 0, x: 110.0, y: 220.0, z: 50.0, o: 0.0 },
];

// Create a fishing pool
// Params: name, radius (default 5), displayId (default 6291 = standard fish school)
const MY_FISHING_POOL = azaraSTD.Fishing.createPool("Mountain Trout School", 5);

// Add loot and spawn the pool
azaraSTD.Fishing.addPoolLoot(MY_FISHING_POOL, MY_POOL_LOOT);
azaraSTD.Fishing.spawnPool(MY_FISHING_POOL, MY_POOL_POSITIONS);

// ============================================================================
// Custom Pool Display
// ============================================================================

// You can specify a custom displayId for different pool visuals
// Some common display IDs:
// - 6291: Standard fish school (default)
// - 5765: Floating Wreckage
// - 6296: Oil spill
const WRECKAGE_POOL = azaraSTD.Fishing.createPool("Floating Wreckage", 5, 5765);
azaraSTD.Fishing.addPoolLoot(WRECKAGE_POOL, [
    { entry: 6289, chance: 70 },    // Driftwood
    { entry: 7973, chance: 30 },    // Big-mouth Clam
]);
