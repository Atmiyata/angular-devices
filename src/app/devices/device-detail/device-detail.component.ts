import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { DeviceService } from '../services/device.service';
import { Device } from '../shared/types/device.type';
import { ICON_BY_DEVICE_TYPE } from '../shared/constants/icon';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent implements OnInit {
  device$: Observable<any> = of();

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.device$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.deviceService.getDeviceById(id)),
      map((device: Device) => ({
        ...device,
        related_devices: device.related_devices?.map((dev: Device) => ({
          ...dev,
          icon: ICON_BY_DEVICE_TYPE[dev.type],
        })),
      }))
    );
  }

  goBack() {
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  trackByDevice(index: number, device: Device) {
    return device.id || index;
  }
}
