import {
  faCamera,
  faSearch,
  faDesktop,
  faMobileAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

enum DeviceType {
  CAMERA = 'Camera',
  DEVICE = 'Device',
  SENSOR = 'Sensor',
}

export const ICON_TYPE = {
  INFO: faInfoCircle,
  SEARCH: faSearch,
};

export const ICON_BY_DEVICE_TYPE = {
  [DeviceType.CAMERA]: faCamera,
  [DeviceType.SENSOR]: faDesktop,
  [DeviceType.DEVICE]: faMobileAlt,
};
