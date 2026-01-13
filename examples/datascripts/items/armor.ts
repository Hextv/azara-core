import { std } from "wow/wotlk";
import { Stat } from "wow/wotlk/std/Item/ItemStats";

const EXAMPLE_ARMOR = std.Items.create("azara-core", "example-armor")
    .Name.enGB.set("Example Armor")
    .ItemLevel.set(25)
    .DisplayInfo.set(9374)
    .Quality.GREEN.set()
    .Class.LEATHER_EQUIP.set()
    .InventoryType.HANDS.set()
    .Attributes.set(
        {
            stats: [
                [Stat.INTELLECT, 33],
                [Stat.SPIRIT, 33],
                [Stat.SPELL_POWER, 34],
            ],
        }
    )