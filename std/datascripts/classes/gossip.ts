import { std } from "wow/wotlk";
import { Gossip } from "wow/wotlk/std/Gossip/Gossip";
import { GossipOption } from "wow/wotlk/std/Gossip/GossipOption";
import { Position } from "wow/wotlk/std/Misc/Position";

export interface GossipPair {
    gossip: string;
    option?: string;
    emote?: number;
    lang?: number;
    gosCallback?: (gos: Gossip) => void;
    optCallback?: (gos: Gossip, opt: GossipOption) => void;
}

export class Gossips {
    /**
     * Given an array of GossipPairs builds out a nested gossip menu.
     * @param definitions 
     */
    buildNestedGossip(definitions: Array<GossipPair>): number {
        let parent: number = 0;
        let next: number = 0;

        const pairs = definitions.reverse();

        pairs.forEach((value, index, array) => {
            let gossip = std.Gossip.create();
            gossip.Text.add({ enGB: value.gossip }, value.lang, value.emote);

            if (value.gosCallback) {
                value.gosCallback(gossip);
            }

            if (value.option != undefined) {
                let opt = gossip.Options.addGet();
                opt.Icon.CHAT.set();
                opt.Text.setSimple({ enGB: value.option });
                opt.Action.GOSSIP.setLink(next);

                if (value.optCallback) {
                    value.optCallback(gossip, opt);
                }
            }

            next = gossip.row.MenuID.get();

            if (parent == 0 && (index + 1) == array.length) {
                parent = gossip.row.MenuID.get();
            }
        });

        return parent;
    }

    /**
     * Create a Point of Interest.
     * @param name The text displayed on hover.
     * @param position The physical world position.
     * @returns POI ID.
     */
    createPOI(name: string, position: Position): number {
        const id = std.IDs.points_of_interest.dynamicId();

        std.SQL.points_of_interest.add(id, {
            PositionX: position.x,
            PositionY: position.y,
            Icon: 7,
            Flags: 99,
            Importance: 0,
            Name: name,
        });

        return id;
    }
}

export const GossipRegistry = new Gossips();