import { std } from "wow/wotlk";
import { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";

export class Vendors {
    /**
    * Configures an NPC as a Vendor and adds the vendor option.
    * @param creature - The ID of the creature or the CreatureTemplate object to be configured as a vendor.
    * @param items - An array of item IDs that the vendor will sell.
    * @param gossip - Does the creature have a gossip? Defaults to false.
    * @param optionText - The text displayed in the gossip menu for accessing the vendor's goods. Defaults to "I would like to browse your goods."
    */
    add(creature: number | CreatureTemplate, items: number[], gossip: boolean = false, optionText: string = "I would like to browse your goods.") {
        const npc = typeof creature === 'number' ? std.CreatureTemplates.load(creature) : creature;

        if (gossip) {
            npc.Gossip.modRef(gossip => {
                gossip.Options.addMod((option) => {
                    option
                        .Icon.VENDOR.set()
                        .Text.setSimple({ enGB: optionText })
                        .Action.VENDOR.setNew(vendor => {
                            items.forEach((item, index) => {
                                vendor.Items.addMod(item, 0, (item) => {
                                    item.Slot.set(index);
                                });
                            });
                        });
                });
            })
        } else {
            items.forEach(item => {
                npc.Vendor.add(item)
            })
        }
    }
}

export const VendorsRegistry = new Vendors();