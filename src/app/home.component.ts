import {
  Component, OnInit, Input
} from '@angular/core';
import { ApiService } from './shared/api-service';
import { SkyConfirmInstance, SkyConfirmType, SkyConfirmService, SkyModalService } from '@skyux/modals';
import { ErrorModalComponent } from './game/errorModal.component';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  public games: {name: string, id: string}[];
  @Input() public gameName: string = '';

  constructor(
    private apiService: ApiService,
    private confirmService: SkyConfirmService,
    private modal: SkyModalService) { }

  public ngOnInit() {
    this.getGames();
  }

  public initGame() {
    this.apiService.initializeGame(this.gameName).subscribe((value: any) => {
      this.getGames();
      this.gameName = '';
    });
  }

  public removeGame(gameId: string, gameName: string) {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Are you sure you want to delete ' + gameName,
      type: SkyConfirmType.YesCancel
    });

    dialog.closed.subscribe((result: any) => {
      if (result.action === 'yes') {
        this.apiService.removeGame(gameId).subscribe(() => {
          this.getGames();
        }, () => {
          this.modal.open(ErrorModalComponent,
            [{ provide: 'Text', useValue: 'Game cannot be deleted if it has been started.' }]);
        });
      }
    });
  }

  public formatDate(date: number): string {
    let d: Date = new Date(date);
    return d.toLocaleString();
  }
  private getGames() {
    this.apiService.getCurrentGames().subscribe((value: any) => {
      this.games = value.games;
    });
  }
}
