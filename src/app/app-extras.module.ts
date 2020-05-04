import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { ApiService } from './shared/api-service';
import { ScoreboardComponent } from './game/scoreboard.component';
import { RouterModule } from '@angular/router';
import { ErrorModalComponent } from './game/errorModal.component';

@NgModule({
  imports: [
    RouterModule.forRoot([], { useHash: true })
  ],
  entryComponents: [
    ScoreboardComponent,
    ErrorModalComponent
  ],
  providers: [
    ApiService
  ],
  exports: [
    AppSkyModule
  ]
})
export class AppExtrasModule { }
