
import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'my-error-modal',
  templateUrl: './errorModal.component.html'
})
export class ErrorModalComponent {

  constructor(
    public instance: SkyModalInstance
  ) { }
}
