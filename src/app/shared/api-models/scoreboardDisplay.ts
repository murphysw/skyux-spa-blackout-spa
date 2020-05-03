import Player from './player';

export default interface ScoreboardDisplay {
    scores: {
        [round_index: number]: {
            [player_id: string]: number
        }
    };
    totals: {
        [player_id: string]: number
    };
    // In correct order
    players: Player[];
    current_bids: {
        round: number,
        bids: {
            [player_id: string]: number
        }
    };
}
