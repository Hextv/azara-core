import { std } from "wow/wotlk";
import { azaraSTD } from "shadows-of-azara.std";

/** Create creature */
const CREATURE = std.CreatureTemplates.create("azara-core", "example-quest-gossip-creature")
    .Name.enGB.set("Quest Gossip Creature")
    .Level.set(20)
    .FactionTemplate.STORMWIND.set()
    .NPCFlags.QUEST_GIVER.set(true)
    .NPCFlags.GOSSIP.set(true)
    .Models.addDefaultBear()

CREATURE.Gossip.modNew((gossip) => {
    gossip.Text.add({ enGB: "Intro gossip text here." }, undefined, 1);

    /** Add quest gossip */
    gossip.Options.addMod((option) => {
        let text = "This option text only shows if the conditions are true.";

        option
            .Action.GOSSIP.setNew((gossip) => {
                gossip.Text.add({ enGB: "Reply text after you clicked on the option." });
            })
            .Text.setSimple({ enGB: text }, { enGB: text })
            .Icon.CHAT.set()
        /** Add quest checks */
        azaraSTD.Conditions.gossipMenuOption(gossip, option).addQuestState(176, ['IN_PROGRESS']); // Wanted: "Hogger" must be in progress
    });
})

/** What to do after gossip is clicked */
CREATURE.Scripts.onGossipSelect(CREATURE.Gossip.get(), 0, (script) => {
    script
        .Action.setAddItem(1529, 1) // Add item Jade x1 to player
        .Target.setActionInvoker()
});