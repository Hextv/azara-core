import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";

/** Create Example Item */
const EXAMPLE_ITEM = std.Items.create('azara-core', 'example-item-register-drop')
    .Name.enGB.set('Example Item')
    .DisplayInfo.set(929)
    .Bonding.QUEST_ITEM.set()
    .Quality.WHITE.set()

/** Add to single creature */
azaraSTD.Quests.registerCreatureDrop(448, EXAMPLE_ITEM.ID) // Register Hogger as dropping Example Item