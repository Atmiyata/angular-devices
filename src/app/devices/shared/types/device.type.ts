export type DeviceType = 'Camera' | 'Sensor' | 'Device';

export type DeviceStatusType = 'Available' | 'Offline';

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  status: DeviceStatusType;
  related_devices?: Array<Device>;
}
