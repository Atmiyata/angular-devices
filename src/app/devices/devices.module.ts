import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DeviceService } from './services/device.service';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@NgModule({
  declarations: [DevicesComponent, DeviceListComponent, DeviceDetailComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule, DevicesRoutingModule],
  providers: [DeviceService],
})
export class DevicesModule {}
