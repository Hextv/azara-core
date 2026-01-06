import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";
import { EXAMPLE_LIST } from "./vendor-list";

/** Create creature */
const CREATURE = std.CreatureTemplates.create("azara-core", "example-vendor-no-gossip")
    .Name.enGB.set("Vendor No Gossip")
    .Level.set(20)
    .FactionTemplate.STORMWIND.set()
    .Models.addDefaultBear()
    .NPCFlags.VENDOR.set(true)

azaraSTD.Vendors.add(CREATURE, EXAMPLE_LIST)