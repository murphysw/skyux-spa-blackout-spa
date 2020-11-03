import {
  Component, OnInit, Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api-service';
import Player from '../shared/api-models/player';
import { forkJoin, interval } from 'rxjs';
import GameboardDisplay from '../shared/api-models/gameboard';
import PlayerDetailsDisplay from '../shared/api-models/playerDetails';
import ScoreboardDisplay from '../shared/api-models/scoreboardDisplay';
import { SkyFlyoutInstance, SkyFlyoutService, SkyFlyoutConfig } from '@skyux/flyout';
import { ScoreboardComponent } from './scoreboard.component';
import Card from '../shared/api-models/card';
import { SkyModalService } from '@skyux/modals';
import { ErrorModalComponent } from './errorModal.component';

@Component({
  selector: 'my-game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  private gameId: string;
  public playerId: string;
  public player: Player;
  public hand: Card[] = [];
  public gameboard: GameboardDisplay;
  public playerDetails: PlayerDetailsDisplay;
  public scoreboard: ScoreboardDisplay;
  public pageLoaded: boolean = false;
  public flyout: SkyFlyoutInstance<any>;
  public data: any[];
  @Input() public bid: number;
  @Input() public playingCard: Card;
  public toggleDescending: number = 1;
  private suitOrder: string[] = ['c', 'd', 's', 'h'];

  constructor(
    private route: ActivatedRoute,
    private flyoutService: SkyFlyoutService,
    private modal: SkyModalService,
    private apiService: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.gameId = params['gameId'];
      this.playerId = params['playerId'];
    });
  }

  public ngOnInit() {
    this.refreshGameData();
    interval(1000).subscribe(() => {
      if ((!this.isCurrentPlayer() || this.gameboard.round_finished) && !this.gameboard.game_finished) {
        this.refreshGameData();
      }
    });
  }

  public getCurrentPlayer(): string {
    return this.findPlayerById(this.gameboard.current_player_id).name;
  }

  public openScoreboardFlyout(): void {
    const config: SkyFlyoutConfig = {
      providers: [{provide: 'ScoreDisplay', useValue: this.scoreboard}],
      defaultWidth: window.innerWidth
    };

    this.flyout = this.flyoutService.open(ScoreboardComponent, config);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public placeBid(): void {
    if (!Number.isInteger(this.bid) || this.bid < 0 || this.bid > this.gameboard.current_round) {
      this.modal.open(ErrorModalComponent,
        [{ provide: 'Text', useValue: 'Bid must be a number between 0 and ' + this.gameboard.current_round }]);
    } else {
      this.apiService.placeBid(this.gameId, this.playerId, this.bid).subscribe(() => {
        this.refreshGameData();
        this.bid = undefined;
      });
    }
  }

  public playCard(): void {
    this.apiService.playCard(this.gameId, this.playerId, this.playingCard.suit, this.playingCard.value).subscribe(() => {
      this.refreshGameData();
    }, () => {
      this.modal.open(ErrorModalComponent,
        [{ provide: 'Text', useValue: 'This card cannot be played, you must follow suit' }]);
    });
  }

  public clearTable(): void {
    this.apiService.clearTable(this.gameId).subscribe(() => {
      this.refreshGameData();
    });
  }

  public beginNextRound(): void {
    this.apiService.beginNextRound(this.gameId).subscribe(() => {
      this.refreshGameData();
    });
  }

  public getImageName(card: Card): string {
    return card.value + card.suit.toUpperCase();
  }

  public isHandFinished(): boolean {
    return this.gameboard.current_hand.length === this.gameboard.players.length;
  }

  public isCurrentPlayer(): boolean {
    if (!this.gameboard) { return false; }
    return this.playerId === this.gameboard.current_player_id;
  }

  public getPlayerNameById(playerId: string) {
    return this.findPlayerById(playerId).name;
  }

  public getOverUnder(): string {
    let total = this.scoreboard.current_bids.round;
    for (let num of Object.values(this.scoreboard.current_bids.bids)) {
      total -= num;
    }
    let text: string = '';
    if (total === 0) {
      text = 'Even';
    } else if (total > 0) {
      text = total + ' under';
    } else {
      text = Math.abs(total) + ' over';
    }
    return text;
  }

  public changeToggle(): void {
    if (this.isCurrentPlayer()) {
      this.refreshGameData();
    }
  }

  private findPlayerById(playerId: string): Player {
    return this.gameboard.players.find(x => x.id === playerId);
  }

  private refreshGameData(): void {
    forkJoin([
      this.apiService.getGameboard(this.gameId),
      this.apiService.getScoreboard(this.gameId)])
      .subscribe(([gameboard, scoreboard]) => {
        this.gameboard = gameboard;
        this.scoreboard = scoreboard;
        this.player = this.findPlayerById(this.playerId);
        this.hand = this.player.hand.sort((a: Card, b: Card) => {
          if (a.suit === b.suit) {
            return (a.value - b.value) * this.toggleDescending;
          } else {
            let diff: boolean =  this.suitOrder.indexOf(a.suit) < this.suitOrder.indexOf(b.suit);
            return diff ? -1 : 1;
          }
        });

        this.pageLoaded = true;
      });
  }
}
