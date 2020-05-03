import {
  Component, OnInit, Input
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api-service';
import Player from '../shared/api-models/player';

@Component({
  selector: 'my-pregame',
  templateUrl: './pregame.component.html'
})
export class PregameComponent implements OnInit {
  private gameId: string;
  public players: Player[] = [];
  public decksRequired: number;
  public gameStarted: boolean = false;
  public pageLoaded: boolean = false;
  @Input() public addPlayerName: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.gameId = params['gameId'];
    });
  }

  public ngOnInit() {
    this.refreshPlayerList();
  }

  public addPlayer() {
    this.apiService.addPlayer(this.gameId, this.addPlayerName).subscribe(() => {
      this.addPlayerName = '';
      this.refreshPlayerList();
    });
  }

  public removePlayer(playerId: string): void {
    this.apiService.removePlayer(this.gameId, playerId).subscribe(() => {
      this.refreshPlayerList();
    });
  }

  public redirectToPlayer(playerId: string): void {
    this.router.navigate(['../game'], {
      queryParams: {playerId: playerId, gameId: this.gameId},
      relativeTo: this.route
    });
  }

  public startGame(): void {
    this.apiService.finishSetup(this.gameId).subscribe(() => {
      this.refreshPlayerList();
    });
  }

  public canAddPlayer(): boolean {
    return !this.gameStarted && this.addPlayerName.length > 0;
  }

  private refreshPlayerList(): void {
    this.apiService.getPregame(this.gameId).subscribe(results => {
      this.players = results.player_list;
      this.decksRequired = results.decks_required;
      this.gameStarted = results.game_started;
      this.pageLoaded = true;
    });
  }
}
