import {ServiceItem} from '../types/PropTypes';

export const serviceItems: ServiceItem[] = [
  {
    id: 1,
    service_name: 'Điện',
    cost: 3500,
    note: 'Kwh',
    icon: 'https://firebasestorage.googleapis.com/v0/b/quanlyphongtropie.appspot.com/o/energy-30.png?alt=media&token=54e20554-9e95-459b-8441-5c4487f6da59',
    status: true,
  },
  {
    id: 2,
    service_name: 'Nước',
    cost: 8500,
    note: 'Khối',
    icon: 'https://firebasestorage.googleapis.com/v0/b/quanlyphongtropie.appspot.com/o/icons8-wet-30.png?alt=media&token=aeb94337-6378-4c60-b4da-7fcee44bd277',
    status: true,
  },
  {
    id: 3,
    service_name: 'Rác',
    cost: 50000,
    note: 'Người',
    icon: 'https://firebasestorage.googleapis.com/v0/b/quanlyphongtropie.appspot.com/o/rac.png?alt=media&token=73114082-686e-4450-92f1-3c23721ea6d5',
    status: true,
  },
];
