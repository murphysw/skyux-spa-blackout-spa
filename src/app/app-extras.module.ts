import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { ApiService } from './shared/api-service';
import { RouterModule } from '@angular/router';

/**
 * @deprecated Provided services, imported modules, etc. should be moved to
 * their respective feature modules, and this module should be removed.
 */
@NgModule({
  imports: [
    RouterModule.forRoot([], { useHash: true })
  ],
  providers: [
    ApiService
  ],
  exports: [
    AppSkyModule
  ]
})
export class AppExtrasModule { }
