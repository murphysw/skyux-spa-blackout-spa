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
  @Input() public toggleDescending: number = 1;
  private suitOrder: string[] = ['c', 'd', 's', 'h'];

  constructor(
    private route: ActivatedRoute,
    private flyoutService: SkyFlyoutService,
    private apiService: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.gameId = params['gameId'];
      this.playerId = params['playerId'];
    });
  }

  public ngOnInit() {
    this.refreshGameData();
    interval(1000).subscribe(() => {
      if (!this.isCurrentPlayer()) {
        this.refreshGameData();
      }
    });
  }

  public getCurrentPlayer(): string {
    return this.findPlayerById(this.gameboard.current_player_id).name;
  }

  public openScoreboardFlyout(): void {
    const config: SkyFlyoutConfig = {
      providers: [{provide: 'ScoreDisplay', useValue: this.scoreboard}]
    };
    this.flyout = this.flyoutService.open(ScoreboardComponent, config);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public placeBid(): void {
    this.apiService.placeBid(this.gameId, this.playerId, this.bid).subscribe(() => {
      this.refreshGameData();
      this.bid = undefined;
    });
  }

  public playCard(): void {
    this.apiService.playCard(this.gameId, this.playerId, this.playingCard.suit, this.playingCard.value).subscribe(() => {
      this.refreshGameData();
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

  public getOverUnder(): number {
    let total = this.scoreboard.current_bids.round;
    for (let num of Object.values(this.scoreboard.current_bids.bids)) {
      total -= num;
    }
    return total;
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
