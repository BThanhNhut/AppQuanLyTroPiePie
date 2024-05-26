import {RouteProp, NavigationProp} from '@react-navigation/native';

export type ItemMenu = {
  nameIcon: any;
  text: string;
  screen: string;
};

export type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type DialogProvinceProps = {
  onClose: () => void;
};

export type DropdownComponentProps = {
  name: string;
};

export type DataItem = {
  label: string;
  value: string;
};

export type CardServiceProps = {
  name: string;
  image: any;
};

// addroom
export type ServiceItem = {
  id: number;
  service_name: string;
  cost: number;
  note: string;
  icon: string;
  status: boolean;
};

export type ServiceItem2 = {
  service_name: string;
  cost: number;
  note: string;
  icon: string;
  status: boolean;
};

export type CardServiceItemProps = {
  id: number;
  services: ServiceItem;
};

export type District = {
  id: number;
  name: string;
  link: any;
};

export type District1 = {
  id: number;
  name: string;
  link: any;
  onPress: (name: string) => void;
};

//Home
export type Room = {
  id: number;
  name_room: string;
  address: string;
  room_price: number;
  deposit_price: number;
  image: string;
  area_width: number;
  area_height: number;
  phone_number: string;
  floor: number;
  number_of_people: number;
  note: string;
  note_gender: string;
  province: string;
  district: string;
  ward: string;
  types: Types;
};

// type Account = {
//   id: number;
//   customer_name: string;
//   avatar: string;
// };

export type Posts = {
  id: number;
  accounts: Account;
  rooms: Room;
  title: string;
  create_at: Date;
  status: boolean;
};

export type cardPostProps = {
  item: Posts;
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
};
//  onPress: (event: GestureResponderEvent) => void;

// Detail

export type Amenities = {
  id: number;
  amenity_name: string;
  icon: string;
  status: boolean;
};

export type AmenitiesItem = {
  id: number;
  amenities: Amenities;
};

export type Furniture = {
  id: number;
  furniture_name: string;
  icon: string;
  status: boolean;
};

export type FurnitureItem = {
  id: number;
  furniture: Furniture;
};

//create room

export type Types = {
  id: number;
  type_name: string;
  status: boolean;
};

export type ImageSelect = {
  height: number;
  uri: string;
  width: number;
};

export type ImageSelect2 = {
  url: string;
  imageName: string;
};

//CreatePost
export type roomsid_name = {
  id: string;
  name_room: string;
};

//favorite
export type favoriteItem = {
  id: number;
  posts: Posts;
};

//Login
export type Account = {
  id: number;
  username: string;
  password: string;
  customer_name: string;
  phone_number: string;
  address: string;
  avatar: string;
};

export type AccountLogin = {
  access_token: string;
  account: Account;
  msg: string;
};

//
export type Roomadd = {
  name_room: string;
  address: string;
  room_price: number;
  deposit_price: number;
  image: string;
  area_width: number;
  area_height: number;
  phone_number: string;
  floor: number;
  number_of_people: number;
  note: string;
  note_gender: string;
  province: string;
  district: string;
  ward: string;
  types: number;
  accounts: number;
  [key: string]: string | number;
};

//

export type CreateAmenitiesDetails = {
  numbers: number[];
  id_room: number;
};

export type CreateManyImage = {
  urls: ImageSelect2[];
  id_rooms: number;
};

export type CreatePosts = {
  title: string;
  create_at: Date;
  status: boolean;
  posttype: number;
  rooms: number;
  accounts: number;
};

export type Notification = {
  messageId?: string;
  data?: object;
  notification?: {
    title?: string;
    body?: string;
    imageUrl?: string;
  };
};

//Login
export type RegisterAccount = {
  username: string;
  password: string;
  customer_name: string;
  phone_number: string;
  address: string;
  avatar: string;
  roleId: number;
};

export type userInfo = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  idToken: string | null;
};

//Contracts
export type Createcontracts = {
  tenant_name: string;
  phone: string;
  email: string;
  idcode: string;
  card_front: string;
  back_of_card: string;
  start_date: Date;
  end_date: Date;
  room_price: number;
  deposit_price: number;
  startpay_money: Date;
  payment_period: number;
  note: string;
  status: boolean;
  rooms: number;
  accounts: number;
};

export type Contracts = {
  id: number | null;
  tenant_name: string;
  phone: string;
  email: string;
  idcode: string;
  card_front: string;
  back_of_card: string;
  start_date: Date;
  end_date: Date;
  room_price: number;
  deposit_price: number;
  startpay_money: Date;
  payment_period: number;
  note: string;
  status: boolean;
  rooms: Room;
  accounts: Account;
};

// slection
type RootStackParamList = {
  Home: undefined;
  SelectContract: {selectContract: () => void};
};

export type InvoicesCreate = {
  monthly_bill: number;
  service_charge: number;
  service_note: string;
  discount: number;
  discount_note: string;
  note: string;
  status: boolean;
  contracts: number;
  accounts: number;
};
