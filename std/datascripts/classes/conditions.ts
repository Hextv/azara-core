import { EnumCon, makeEnum } from "wow/data/cell/cells/EnumCell";
import { makeMask, MaskCon } from "wow/data/cell/cells/MaskCell";
import { std } from "wow/wotlk";
import { conditionsRow } from "wow/wotlk/sql/conditions";
import { ClassMask } from "wow/wotlk/std/Class/ClassRegistry";
import { ComparisonTypes } from "wow/wotlk/std/Conditions/Settings/ComparisonType";
import { GendersAllowNone } from "wow/wotlk/std/Conditions/Settings/Gender";
import { makeQuestStateMask, QuestState } from "wow/wotlk/std/Conditions/Settings/QuestState";
import { RelationTypes } from "wow/wotlk/std/Conditions/Settings/RelationType";
import { StandStates } from "wow/wotlk/std/Conditions/Settings/StandState";
import { WorldObjectTypes, WorldObjectTypesMask } from "wow/wotlk/std/Conditions/Settings/WorldObjectType";
import { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";
import { GameObjectTemplate } from "wow/wotlk/std/GameObject/GameObjectTemplate";
import { Gossip } from "wow/wotlk/std/Gossip/Gossip";
import { GossipOption } from "wow/wotlk/std/Gossip/GossipOption";
import { NPCText } from "wow/wotlk/std/Gossip/GossipText";
import { ItemTemplate } from "wow/wotlk/std/Item/ItemTemplate";
import { DrunkState, resolveDrunkState } from "wow/wotlk/std/Misc/DrunkState";
import { ReputationRank, ReputationRankMask } from "wow/wotlk/std/Misc/ReputationRank";
import { Quest } from "wow/wotlk/std/Quest/Quest";
import { RaceMask } from "wow/wotlk/std/Race/RaceType";
import { SmartScript } from "wow/wotlk/std/SmartScript/SmartScript";
import { Spell } from "wow/wotlk/std/Spell/Spell";

export enum ConditionSources {
    CREATURE_LOOT_TEMPLATE = 1,
    DISENCHANT_LOOT_TEMPLATE,
    FISHING_LOOT_TEMPLATE,
    GAMEOBJECT_LOOT_TEMPLATE,
    ITEM_LOOT_TEMPLATE,
    MAIL_LOOT_TEMPLATE,
    MILLING_LOOT_TEMPLATE,
    PICKPOCKETING_LOOT_TEMPLATE,
    PROSPECTING_LOOT_TEMPLATE,
    REFERENCE_LOOT_TEMPLATE,
    SKINNING_LOOT_TEMPLATE,
    SPELL_LOOT_TEMPLATE,
    SPELL_IMPLICIT_TARGET,
    GOSSIP_MENU,
    GOSSIP_MENU_OPTION,
    CREATURE_TEMPLATE_VEHICLE,
    SPELL,
    SPELL_CLICK_EVENT,
    QUEST_AVAILABLE,
    VEHICLE_SPELL = 21,
    SMART_EVENT,
    NPC_VENDOR,
    SPELL_PROC,
}

export enum SpellTargets {
    CASTER,
    EXPLICIT_TARGET,
}

export enum SpellImplicitTargets {
    POTENTIAL_TARGET,
    CASTER,
}

export enum CreatureTemplateVehicleTargets {
    PLAYER,
    CREATURE,
}

export enum SpellClickTargets {
    CLICKER,
    CLICKEE,
}

export enum VehicleSpellTargets {
    PLAYER,
    VEHICLE,
}

export enum SpellProcTargets {
    ACTOR,
    ACTION_TARGET,
}

export enum GossipTargets {
    PLAYER,
    WORLD_OBJECT,
}

export enum SmartEventTargets {
    INVOKER,
    OBJECT,
}

export class ConditionBuilder {
    private sourceType: number = 0;
    private sourceGroup: number = 0;
    private sourceEntry: number = 0;
    private target: number = 0;
    private sourceId: number = 0;

    constructor(sourceType: number = 0, sourceGroup: number = 0, sourceEntry: number = 0, target: number = 0, sourceId: number = 0) {
        this.sourceType = sourceType;
        this.sourceGroup = sourceGroup;
        this.sourceEntry = sourceEntry;
        this.target = target;
        this.sourceId = sourceId;
    }

    private build(conditionType: number, elseGroup: number = 0, value1: number = 0, value2: number = 0, value3: number = 0): conditionsRow {
        const row = std.SQL.conditions.add(
            this.sourceType,
            this.sourceGroup,
            this.sourceEntry,
            this.sourceId,
            elseGroup,
            conditionType,
            this.target,
            value1,
            value2,
            value3,
        );

        row.Comment.set('tswow');
        row.NegativeCondition.set(0);
        row.ErrorTextId.set(0);
        row.ErrorType.set(0);
        row.ScriptName.set('');

        return row;
    }

    addHasAura(spellId: number, effectIndex: number, elseGroup: number) {
        return this.build(1, elseGroup, spellId, effectIndex);
    }

    addHasItem(item: number, count: number, inBank: boolean = false, group = 0) {
        return this.build(2, group, item, count, inBank ? 1 : 0);
    }

    addHasItemEquipped(item: number, group = 0) {
        return this.build(3, group, item);
    }

    addZoneId(zone: number, group = 0) {
        return this.build(4, group, zone);
    }

    addReputationRank(factionTemplate: number, ranks: MaskCon<keyof typeof ReputationRank>, group = 0) {
        return this.build(5, group, factionTemplate, makeMask(ReputationRank, ranks));
    }

    addIsTeam(team: 'HORDE' | 'ALLIANCE', group = 0) {
        return this.build(6, group, team === 'HORDE' ? 67 : 469);
    }

    addSkill(skillLine: number, rankValue: number, group = 0) {
        return this.build(7, group, skillLine, rankValue);
    }

    addFinishedQuest(questId: number, group = 0) {
        return this.build(8, group, questId);
    }

    addStartedQuest(questId: number, group = 0) {
        return this.build(9, group, questId);
    }

    addIsDrunk(state: DrunkState, group = 0) {
        return this.build(10, group, resolveDrunkState(state));
    }

    addWorldState(index: number, value: number, group = 0) {
        return this.build(11, group, index, value);
    }

    addActiveEvent(entry: number, group = 0) {
        return this.build(12, group, entry);
    }

    addNight(group = 0) {
        return this.build(12, group, 25);
    }

    addInstanceInfo(entry: number, data: number, type: number, group = 0) {
        return this.build(13, group, entry, data, type);
    }

    addQuestNone(quest: number, group = 0) {
        return this.build(14, group, quest);
    }

    addIsClass(cls: MaskCon<keyof typeof ClassMask>, group = 0) {
        return this.build(15, group, makeMask(ClassMask, cls))
    }

    addIsRace(races: MaskCon<keyof typeof RaceMask>, group = 0) {
        return this.build(16, group, makeMask(ClassMask, races));
    }

    addHasAchievement(id: number, group = 0) {
        return this.build(17, group, id);
    }

    addHasTitle(id: number, group = 0) {
        return this.build(18, group, id);
    }

    addSpawnMask(spawnMask: number, group = 0) {
        return this.build(19, group, spawnMask);
    }

    addGender(gender: EnumCon<GendersAllowNone>, group = 0) {
        return this.build(20, group, makeEnum(GendersAllowNone, gender));
    }

    addUnitState(state: number, group = 0) {
        return this.build(21, group, state);
    }

    addMapId(mapid: number, group = 0) {
        return this.build(22, group, mapid);
    }

    addAreaId(areaId: number, group = 0) {
        return this.build(23, group, areaId);
    }

    addCreatureType(type: number, group = 0) {
        return this.build(24, group, type);
    }

    addHasSpell(id: number, group = 0) {
        return this.build(25, group, id);
    }

    addInPhase(phasemask: number, group = 0) {
        return this.build(26, group, phasemask);
    }

    addLevel(level: number, comparison: EnumCon<ComparisonTypes>, group = 0) {
        return this.build(27, group, level, makeEnum(ComparisonTypes, comparison));
    }

    addQuestComplete(questId: number, group = 0) {
        return this.build(28, group, questId);
    }

    addNearCreature(creatureId: number, distance: number, alive: number, group = 0) {
        return this.build(29, group, creatureId, distance, alive);
    }

    addNearGameObject(gameObjectId: number, distance: number, group = 0) {
        return this.build(30, group, gameObjectId, distance);
    }

    addObjectEntry(typeId: EnumCon<WorldObjectTypes>, id: number, guid: number = 0, group = 0) {
        return this.build(31, group, makeEnum(WorldObjectTypes, typeId), id, guid);
    }

    addTypeMask(typeMask: MaskCon<WorldObjectTypesMask>, group = 0) {
        return this.build(32, group, makeMask(WorldObjectTypesMask, typeMask));
    }

    addRelationTo(target: number, relationType: EnumCon<RelationTypes>, group = 0) {
        return this.build(33, group, target, makeEnum(RelationTypes, relationType));
    }

    addReactionTo(target: number, rankMask: MaskCon<keyof typeof ReputationRankMask>, group = 0) {
        return this.build(34, group, target, makeMask(ReputationRankMask, rankMask));
    }

    addDistanceTo(target: number, distance: number, comparison: EnumCon<ComparisonTypes>, group = 0) {
        return this.build(35, group, target, distance, makeEnum(ComparisonTypes, comparison));
    }

    addAlive(group = 0) {
        return this.build(36, group);
    }

    addHpValue(hpValue: number, comparison: EnumCon<ComparisonTypes>, group = 0) {
        return this.build(37, group, hpValue, makeEnum(ComparisonTypes, comparison));
    }

    addHpPercentage(hpPercentage: number, comparison: EnumCon<ComparisonTypes>, group = 0) {
        return this.build(38, group, hpPercentage, makeEnum(ComparisonTypes, comparison));
    }

    addRealmAchievement(achievementID: number, group = 0) {
        return this.build(39, group, achievementID);
    }

    addInWater(group = 0) {
        return this.build(40, group);
    }

    addStandState(stateType: number, standState: EnumCon<StandStates>, group = 0) {
        return this.build(42, group, stateType, makeEnum(StandStates, standState));
    }

    addDailyQuestDone(questId: number, group = 0) {
        return this.build(43, group, questId);
    }

    addCharmed(group = 0) {
        return this.build(44, group);
    }

    addPetType(petTypeMask: number, group = 0) {
        return this.build(45, group, petTypeMask);
    }

    addTaxi(group = 0) {
        return this.build(46, group);
    }

    addQuestState(questId: number, stateMask: QuestState[], group = 0) {
        return this.build(47, group, questId, makeQuestStateMask(stateMask));
    }

    addQuestObjective(questId: number, objectiveIndex: number, group = 0) {
        return this.build(48, group, questId, objectiveIndex);
    }
}

export class ConditionRegistryClass {
    smartEvent(script: SmartScript, target: SmartEventTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SMART_EVENT, script.row.id.get() + 1, script.row.entryorguid.get(), target, script.row.source_type.get())
    }

    creatureLootTemplate(creature: CreatureTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.CREATURE_LOOT_TEMPLATE, creature.NormalLoot.get(), drop instanceof ItemTemplate ? drop.ID : drop);
    }

    creatureLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.CREATURE_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    disenchantLootTemplate(base: ItemTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.DISENCHANT_LOOT_TEMPLATE, base.Disenchant.get(), drop instanceof ItemTemplate ? drop.ID : drop);
    }

    disenchantLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.DISENCHANT_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    fishingLootTemplate(template: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.FISHING_LOOT_TEMPLATE, template, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    gameObjectLootTemplate(go: GameObjectTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.GAMEOBJECT_LOOT_TEMPLATE, go.Type.CHEST.as().Loot.get(), drop instanceof ItemTemplate ? drop.ID : drop);
    }

    gameObjectLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.GAMEOBJECT_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    itemLootTemplate(base: ItemTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.ITEM_LOOT_TEMPLATE, base.Loot.get().ID, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    itemLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.ITEM_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    mailLootTemplate(template: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.MAIL_LOOT_TEMPLATE, template, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    pickpocketingLootTemplate(creature: CreatureTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.PICKPOCKETING_LOOT_TEMPLATE, creature.PickpocketLoot.get(), drop instanceof ItemTemplate ? drop.ID : drop);
    }

    pickpocketingLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.PICKPOCKETING_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    referenceLootTemplate(reference: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.REFERENCE_LOOT_TEMPLATE, reference, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    skinningLootTemplate(creature: CreatureTemplate, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SKINNING_LOOT_TEMPLATE, creature.SkinningLoot.get(), drop instanceof ItemTemplate ? drop.ID : drop);
    }

    skinningLootEntry(loot_id: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SKINNING_LOOT_TEMPLATE, loot_id, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    spellLootTemplate(template: number, drop: ItemTemplate | number): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SPELL_LOOT_TEMPLATE, template, drop instanceof ItemTemplate ? drop.ID : drop);
    }

    spellImplicitTarget(spell: Spell, effects: number, target: SpellImplicitTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SPELL_IMPLICIT_TARGET, effects, spell.ID, target);
    }

    gossipMenu(gossip: Gossip, target: GossipTargets, text?: NPCText): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.GOSSIP_MENU, gossip.ID, text === undefined ? gossip.TextID : text.ID, target);
    }

    gossipMenuOption(gossip: Gossip, option: GossipOption, target: GossipTargets = GossipTargets.PLAYER): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.GOSSIP_MENU_OPTION, gossip.ID, option.row.OptionID.get(), target);
    }

    creatureTemplateVehicle(creature: CreatureTemplate, target: CreatureTemplateVehicleTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.CREATURE_TEMPLATE_VEHICLE, 0, creature.ID, target);
    }

    spell(spell: Spell, target: SpellTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SPELL, 0, spell.ID, target);
    }

    spellClick(creature: CreatureTemplate, spell: Spell, target: SpellClickTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SPELL_CLICK_EVENT, creature.ID, spell.ID, target);
    }

    questAvailable(quest: Quest): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.QUEST_AVAILABLE, 0, quest.ID);
    }

    vehicleSpell(creature: CreatureTemplate, spell: Spell, target: VehicleSpellTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.VEHICLE_SPELL, creature.ID, spell.ID, target);
    }

    npcVendor(creature: CreatureTemplate, item: ItemTemplate): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.NPC_VENDOR, creature.Vendor.ID, item.ID);
    }

    spellProc(spell: Spell, target: SpellProcTargets): ConditionBuilder {
        return new ConditionBuilder(ConditionSources.SPELL_PROC, 0, spell.ID, target);
    }
}

export const ConditionRegistry = new ConditionRegistryClass();