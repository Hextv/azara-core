import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";
import { EXAMPLE_LIST } from "./vendor-list";

/** Create creature */
const CREATURE = std.CreatureTemplates.create("azara-core", "example-vendor-gossip")
    .Name.enGB.set("Vendor Gossip")
    .Level.set(20)
    .FactionTemplate.STORMWIND.set()
    .Models.addDefaultBear()
    .NPCFlags.GOSSIP.set(true)
    .NPCFlags.VENDOR.set(true)
    .NPCFlags.QUEST_GIVER.set(true)
    .Gossip.modNew(gossip => {
        gossip.Text.add({ enGB: "Example gossip." })
    })

azaraSTD.Vendors.add(CREATURE, EXAMPLE_LIST, true, "What are you selling?");

// Requires more than one gossip option for vendor gossip to appear so we add a quest (Wanted: "Hogger") to creature
std.Quests.load(176).Questgiver.addCreatureStarter(CREATURE.ID)