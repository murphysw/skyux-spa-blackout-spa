import {
  Component, Inject
} from '@angular/core';
import ScoreboardDisplay from '../shared/api-models/scoreboardDisplay';

@Component({
  selector: 'my-scoreboard',
  templateUrl: './scoreboard.component.html'
})
export class ScoreboardComponent {
  public data: any[] = [];

  constructor(
    @Inject('ScoreDisplay') public scoreboard: ScoreboardDisplay) {
    let round: any = {};
    for (let index = 10; index > 0; index--) {
      round['roundNumber'] = index;
      for (let p of this.scoreboard.players) {
        round[p.id] = '-';
      }
      if (this.scoreboard.current_bids.round === index) {
        for (let [key, value] of Object.entries(this.scoreboard.current_bids.bids)) {
          round[key] = value;
        }
      } else {
        if (this.scoreboard.scores[index]) {
          for (let [key, value] of Object.entries(this.scoreboard.scores[index])) {
            if (value === 0) {
              value = -1;
            }
            round[key] = value;
          }
        }
      }
      this.data.push(Object.assign({}, round));
    }
    round['roundNumber'] = 'Total';
    for (let [key, value] of Object.entries(this.scoreboard.totals)) {
      round[key] = value;
    }
    this.data.push(Object.assign({}, round));
  }
}
