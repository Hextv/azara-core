import { azaraSTD } from "shadows-of-azara.std";
import { GossipPair } from "shadows-of-azara.std/gossip";
import { std } from "wow/wotlk";

/** Create creature */
const CREATURE = std.CreatureTemplates.create("azara-core", "example-nested-gossip-creature")
    .Name.enGB.set("Nested Gossip Creature")
    .Level.set(20)
    .FactionTemplate.STORMWIND.set()
    .NPCFlags.QUEST_GIVER.set(true)
    .NPCFlags.GOSSIP.set(true)
    .Models.addDefaultBear()

/** Build gossip */
const GOSSIP: Array<GossipPair> = [
    {
        gossip: 'First followup gossip.',
        option: 'Okay.',
        emote: azaraSTD.Emotes.ONESHOT_TALK_DNR,
    },
    {
        gossip: 'Second followup gossip.',
        option: 'Alright.',
        emote: azaraSTD.Emotes.ONESHOT_TALK_DNR,
    },
    {
        gossip: 'Third followp gossip.',
        option: 'I understand.',
        emote: azaraSTD.Emotes.ONESHOT_TALK_DNR,
        optCallback: (gos, opt) => {
            CREATURE.Scripts.onGossipSelect(opt.row.MenuID.get(), opt.row.OptionID.get(), (script) => {
                script.Action.setAddItem(1529, 1).Target.setActionInvoker() // Add item Jade x1 to player
            });
        }
    },
    {
        gossip: 'I believe that wise, $N.',
        emote: azaraSTD.Emotes.ONESHOT_TALK_DNR,
    },
];

CREATURE.Gossip.modNew((gos) => {
    gos.Text.add({ enGB: 'Intro gossip text here.' });
    gos.Options.addMod((opt) => {
        opt.Text.setSimple({ enGB: 'First option text.' });
        opt.Action.GOSSIP.setLink(azaraSTD.Gossip.buildNestedGossip(GOSSIP))
    });
});