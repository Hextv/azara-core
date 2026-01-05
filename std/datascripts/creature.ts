import { std } from "wow/wotlk";
import { CreatureTemplateRegistryClass } from "wow/wotlk/std/Creature/Creatures";
import { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";

export class Creature extends CreatureTemplateRegistryClass {
    /**
     * Adds given items to the NPC, equipment slot 1.
     * @param creature 
     * @param primary 
     * @param secondary 
     * @param ranged 
     */
    addEquipment(creature: CreatureTemplate, primary: number = 0, secondary: number = 0, ranged: number = 0) {
        std.SQL.creature_equip_template.add(creature.ID, 1)
            .ItemID1.set(primary)
            .ItemID2.set(secondary)
            .ItemID3.set(ranged);
    }

    /**
     * Builds a re-usable Dummy Bunny often used for hidden behaviour / spell targetting.
     * @param id Unique ID.
     */
    createDummyBunny(id: string): CreatureTemplate {
        return std.CreatureTemplates.create('azara-core', id)
            .Name.enGB.set('Dummy Trigger')
            .Models.addIds(328)
            .Type.NONE.set()
            .FactionTemplate.NEUTRAL_PASSIVE.set()
            .UnitFlags.NOT_SELECTABLE.set(true)
            .UnitFlags.IMMUNE_TO_NPC.set(true)
            .UnitFlags.IMMUNE_TO_PC.set(true)
            .FlagsExtra.set(128);
    }
}

export const CreatureTemplateRegistry = new Creature();