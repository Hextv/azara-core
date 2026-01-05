import { std } from "wow/wotlk";
import { azaraSTD } from "shadows-of-azara.std";
import { SpellTargets } from "shadows-of-azara.std/conditions";
import { WorldObjectTypes } from "wow/wotlk/std/Conditions/Settings/WorldObjectType";

/** Create Spell */
const SPELL = std.Spells.create('azara-core', 'example-target-spell')

/** Condition - Spell only usable on Hogger. */
azaraSTD.Conditions.spell(SPELL, SpellTargets.EXPLICIT_TARGET).addObjectEntry(WorldObjectTypes.UNIT, 448);