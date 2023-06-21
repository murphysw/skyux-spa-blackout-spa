import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAppAssetsService
} from '@skyux/assets';

import {
  ErrorModalComponent
} from './game/errorModal.component';

import {
  GameComponent
} from './game/game.component';

import {
  ScoreboardComponent
} from './game/scoreboard.component';

import {
  HomeComponent
} from './home.component';

import {
  PregameComponent
} from './pregame/pregame.component';

import {
  AppNavComponent
} from './shared/app-nav/app-nav.component';

import {
  GameRouteIndexComponent
} from './game/index.component';

import {
  PregameRouteIndexComponent
} from './pregame/index.component';

import {
  RootRouteIndexComponent
} from './index.component';

import {
  NotFoundComponent
} from './not-found.component';

import {
  AppExtrasModule
} from './app-extras.module';

/**
 * @deprecated This module was migrated from SKY UX Builder v.4.
 * It is highly recommended that this module be factored-out into separate, lazy-loaded feature modules.
 */
@NgModule({
  imports: [
    AppExtrasModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyAppLinkModule,
    SkyI18nModule
  ],
  declarations: [
    AppNavComponent,
    ErrorModalComponent,
    GameComponent,
    GameRouteIndexComponent,
    HomeComponent,
    NotFoundComponent,
    PregameComponent,
    PregameRouteIndexComponent,
    RootRouteIndexComponent,
    ScoreboardComponent
  ],
  exports: [
    AppExtrasModule,
    AppNavComponent,
    ErrorModalComponent,
    GameComponent,
    HomeComponent,
    NotFoundComponent,
    PregameComponent,
    RootRouteIndexComponent,
    ScoreboardComponent
  ],
  providers: [
    // This provider is to support the legacy SKY UX asset and i18n
    // functionality. You should refactor your application to use Angular's
    // built-in asset handling and i18n processes instead.
    // https://angular.io/guide/file-structure#application-project-files
    // https://angular.io/guide/i18n-overview
    {
      provide: SkyAppAssetsService,
      useValue: {
        getUrl(path: string) {
          return '/assets/' + path;
        },
        getAllUrls() {
          return undefined;
        }
      }
    }
  ]
})
export class SkyPagesModule { }
