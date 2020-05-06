import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyFluidGridModule, SkyDefinitionListModule
} from '@skyux/layout';

import {
  SkyNavbarModule
} from '@skyux/navbar';

import {
  SkyRepeaterModule
} from '@skyux/lists';

import {
  SkyFlyoutModule
} from '@skyux/flyout';

import {
  SkyListViewGridModule
} from '@skyux/list-builder-view-grids';

import {
  SkyListModule
} from '@skyux/list-builder';
import { SkyRadioModule } from '@skyux/forms';
import { SkyModalModule, SkyConfirmModule } from '@skyux/modals';

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyDefinitionListModule,
    SkyNavbarModule,
    SkyFlyoutModule,
    SkyIconModule,
    SkyModalModule,
    SkyConfirmModule,
    SkyRadioModule,
    SkyListViewGridModule,
    SkyListModule,
    SkyRepeaterModule
  ]
})
export class AppSkyModule { }
