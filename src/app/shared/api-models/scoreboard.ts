export default interface Scoreboard {

    scores: {[index: number]: {[player_id: string]: number}};
    totals: {[player_id: string]: number};
}
