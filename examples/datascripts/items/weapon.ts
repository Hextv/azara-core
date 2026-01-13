import { std } from "wow/wotlk";
import { Stat } from "wow/wotlk/std/Item/ItemStats";

const EXAMPLE_WEAPON = std.Items.create("azara-core", "example-weapon")
    .Name.enGB.set("Example Weapon")
    .ItemLevel.set(21)
    .DisplayInfo.set(20086)
    .Quality.BLUE.set()
    .Class.MACE_2H.set()
    .InventoryType.TWOHAND.set()
    .Delay.setAsMilliseconds(2600)
    .Attributes.set(
        {
            stats: [
                [Stat.STRENGTH, 25],
                [Stat.STAMINA, 50],
                [Stat.SPIRIT, 25],
            ],
        }
    )