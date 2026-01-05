import { azaraSTD } from "shadows-of-azara.std"
import { ToolType } from "shadows-of-azara.std/items"
import { std } from "wow/wotlk"
import { ItemQuality } from "wow/wotlk/std/Item/ItemQuality"

/** Create item */
const EXAMPLE_ITEM = std.Items.create('azara-core', 'example-recipe-item')
    .Name.enGB.set("Example Recipe Item")
    .ItemLevel.set(1)
    .Class.MACE_1H.set()
    .InventoryType.MAINHAND.set()
    .Quality.GREEN.set()
    .Bonding.BINDS_ON_EQUIP.set()
    .DisplayInfo.set(8287)

/**
    The below example uses a bunch of lines so the comments are clear. In real use cases please do something like this:

    const RECIPE = azaraSTD.Items.createRecipeSpell(EXAMPLE_ITEM, "BLACKSMITHING", 1, 25000, 280, 290,
    [12359, 12644],
    [16, 4],
    ToolType.HAMMER_ANVIL)
*/

const RECIPE = azaraSTD.Items.createRecipeSpell(
    EXAMPLE_ITEM,           // Item being created
    "BLACKSMITHING",        // Profession
    1,                      // Output count
    25000,                  // Cast time
    280,                    // Skill level recipe goes from orange to yellow
    290,                    // Skill level recipe goes from green to gray
    [                       // Reagents
        12359,              // Thorium Bar
        12644,              // Dense Grinding Stone
    ],
    [                       // Reagent count
        16,
        4,
    ],
    ToolType.HAMMER_ANVIL   // Tool
)


/** Create recipe learn item */
const RECIPE_ITEM = azaraSTD.Items.createRecipeItem('azara-core', 'example-recipe-item', 'Example Recipe Item', ItemQuality.WHITE, "BLACKSMITHING", RECIPE, 280, 30000)
