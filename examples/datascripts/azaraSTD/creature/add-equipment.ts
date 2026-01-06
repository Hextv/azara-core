import { std } from "wow/wotlk";
import { azaraSTD } from "shadows-of-azara.std";

/** Create creature */
const CREATURE = std.CreatureTemplates.create("azara-core", "example-add-equipment-creature")
    .Name.enGB.set("Add Equipment Creature")
    .Level.set(20)
    .FactionTemplate.STORMWIND.set()
    .NPCFlags.QUEST_GIVER.set(true)
    .NPCFlags.GOSSIP.set(true)
    .Models.addIds(3732)
    
    /** Add equipment */
    azaraSTD.Creatures.addEquipment(CREATURE, 12063)