import {
  Component, OnInit, Input
} from '@angular/core';
import { ApiService } from './shared/api-service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  private apiService: ApiService;
  public games: {name: string, id: string}[];
  @Input() public gameName: string = '';

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public ngOnInit() {
    this.getGames();
  }

  public initGame() {
    this.apiService.initializeGame(this.gameName).subscribe((value: any) => {
      this.getGames();
    });
  }

  private getGames() {
    this.apiService.getCurrentGames().subscribe((value: any) => {
      this.games = value.games;
    });
  }
}
