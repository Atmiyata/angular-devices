import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Input, Component, DebugElement } from '@angular/core';

import { DeviceService } from '../services/device.service';
import { DeviceListComponent } from './device-list.component';

@Component({
  selector: 'fa-icon',
  template: '<span> dummy Icon</span>',
})
class MockFaIconComponent {
  @Input() icon: any;
}
class MockDeviceService {
  devices = [
    {
      id: 1,
      name: 'Device 1',
      type: 'Sensor',
      status: 'Available',
      temperature: ' 12 Celsius',
      related_devices: [
        {
          id: 3,
          name: 'Device 3',
          type: 'Device',
          status: 'Offline',
        },
        {
          id: 4,
          name: 'Device 4',
          type: 'Sensor',
          status: 'Available',
        },
        {
          id: 5,
          name: 'Device 5',
          type: 'Device',
          status: 'Offline',
        },
      ],
    },
    {
      id: 2,
      name: 'Device 2',
      type: 'Camera',
      fps: '20 FPS',
      status: 'Available',
      related_devices: [
        {
          id: 6,
          name: 'Device 6',
          type: 'Camera',
          status: 'Available',
        },
      ],
    },
  ];
  getDevices() {
    return of(this.devices);
  }
}

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DeviceListComponent, MockFaIconComponent],
      providers: [
        { provide: DeviceService, useClass: MockDeviceService },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ name: '' }) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rendered all devices', async () => {
    fixture.detectChanges();

    await fixture.whenStable();
    const iconEls: DebugElement[] = element.queryAll(
      By.directive(MockFaIconComponent)
    );
    const labelEls: DebugElement[] = element.queryAll(
      By.css('.card .card-detail .card-label')
    );
    const subLableEls: DebugElement[] = element.queryAll(
      By.css('.card .card-detail .card-sub-label')
    );
    expect(iconEls.length).toBe(4);
    expect(labelEls.length).toBe(2);
    expect(subLableEls.length).toBe(2);
    expect((labelEls[0].nativeElement as HTMLElement).textContent).toBe(
      'Device 1'
    );
    expect((labelEls[1].nativeElement as HTMLElement).textContent).toBe(
      'Device 2'
    );
    expect((subLableEls[0].nativeElement as HTMLElement).textContent).toBe(
      'Status: Available'
    );
    expect((subLableEls[1].nativeElement as HTMLElement).textContent).toBe(
      'Status: Available'
    );
  });
});
