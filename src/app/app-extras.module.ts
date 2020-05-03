import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { ApiService } from './shared/api-service';
import { ScoreboardComponent } from './game/scoreboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([], { useHash: true })
  ],
  entryComponents: [
    ScoreboardComponent
  ],
  providers: [
    ApiService
  ],
  exports: [
    AppSkyModule
  ]
})
export class AppExtrasModule { }
