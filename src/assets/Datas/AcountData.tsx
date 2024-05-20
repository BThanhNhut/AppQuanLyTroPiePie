import {ItemMenu} from '../types/PropTypes';

export const listItem: ItemMenu[] = [
  {
    nameIcon: require('../../assets/images/icon/post.png'),
    text: 'Quản lý bài đăng',
    screen: 'ManagementPost',
  },
  {
    nameIcon: require('../../assets/images/icon/tim.png'),
    text: 'Yêu thích',
    screen: 'FavoriteScreen',
  },
  {
    nameIcon: require('../../assets/images/icon/managercustomer.png'),
    text: 'Quản lý phòng',
    screen: 'RoomManagement',
  },
  {
    nameIcon: require('../../assets/images/icon/contract.png'),
    text: 'Quản lý hợp đồng',
    screen: 'ContractManagement',
  },
  {
    nameIcon: require('../../assets/images/icon/bill.png'),
    text: 'Quản lý hóa đơn',
    screen: 'BillManagement',
  },
  {
    nameIcon: require('../../assets/images/icon/analytics.png'),
    text: 'Báo cáo thống kê',
    screen: 'ManagementPost',
  },
  {
    nameIcon: require('../../assets/images/icon/armchair.png'),
    text: 'Giữ chỗ',
    screen: 'ManagementPost',
  },
  {
    nameIcon: require('../../assets/images/icon/report.png'),
    text: 'Báo cáo sữ cố',
    screen: 'ManagementPost',
  },
  {
    nameIcon: require('../../assets/images/icon/auction.png'),
    text: 'Điều khoảng chính sách',
    screen: 'ManagementPost',
  },
];
