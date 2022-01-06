import { OnInit, Component } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { of, map, switchMap, Observable, debounceTime } from 'rxjs';

import { Device } from '../shared/types/device.type';
import { DeviceService } from '../services/device.service';
import { ICON_TYPE, ICON_BY_DEVICE_TYPE } from '../shared/constants/icon';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  icon = ICON_TYPE;
  devices$: Observable<Array<any>> = of([]);

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.devices$ = this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      switchMap((param: Params) =>
        this.deviceService.getDevices(
          param ? { search: param['name'] } : undefined
        )
      ),
      map((devices: Device[]) =>
        devices.map((device: Device) => ({
          ...device,
          icon: ICON_BY_DEVICE_TYPE[device.type],
        }))
      )
    );
  }

  viewDevice(id: number) {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  trackByDevice(index: number, device: Device) {
    return device.id || index;
  }
}
