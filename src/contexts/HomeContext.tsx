import {ReactNode, createContext, useEffect, useState} from 'react';
import {
  Account,
  Amenities,
  Furniture,
  Posts,
  Room,
  Roomadd,
  ServiceItem,
  Types,
} from '../assets/types/PropTypes';
import axios from 'axios';
import {serviceItems} from '../assets/Datas/CreateRoomData';
import {
  getToken,
  initializeFCM,
  requestUserPermission,
} from '../screens/Services/HomeService';

export type HomeContextType = {
  services: ServiceItem[];
  setService: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  amenities: Amenities[];
  setAmenities: React.Dispatch<React.SetStateAction<Amenities[]>>;
  furnitures: Furniture[];
  setFurnitures: React.Dispatch<React.SetStateAction<Furniture[]>>;
  posts: Posts[];
  setPosts: React.Dispatch<React.SetStateAction<Posts[]>>;
  types: Types[];
  setTypes: React.Dispatch<React.SetStateAction<Types[]>>;
  accounts: Account[];
  setAccount: React.Dispatch<React.SetStateAction<Account[]>>;
  rooms: Room[];
  setRoom: React.Dispatch<React.SetStateAction<Room[]>>;
};

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined,
);

export function HomeProvider({children}: {children: ReactNode}) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [amenities, setAmenities] = useState<Amenities[]>([]);
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [accounts, setAccount] = useState<Account[]>([]);
  const [rooms, setRoom] = useState<Room[]>([]);

  const contextValue: HomeContextType = {
    services,
    setService: setServices,
    amenities,
    setAmenities,
    furnitures,
    setFurnitures,
    posts,
    setPosts,
    types,
    setTypes,
    accounts,
    setAccount,
    rooms,
    setRoom,
  };

  useEffect(() => {
    requestUserPermission();
    getToken(), fetchData();
    initializeFCM();
  }, []);

  const fetchData = async () => {
    setServices(serviceItems);
    try {
      const responses = await Promise.all([
        axios.get('https://qlphong-tro-production.up.railway.app/services'),
        axios.get('https://qlphong-tro-production.up.railway.app/amenities'),
        axios.get('https://qlphong-tro-production.up.railway.app/furniture'),
        axios.get('https://qlphong-tro-production.up.railway.app/posts'),
        axios.get('https://qlphong-tro-production.up.railway.app/types'),
        axios.get(`https://qlphong-tro-production.up.railway.app/accounts`),
        axios.get(`https://qlphong-tro-production.up.railway.app/rooms/all`),
      ]);
      setAmenities(responses[1].data);
      setFurnitures(responses[2].data);
      setPosts(responses[3].data);
      setTypes(responses[4].data);
      setAccount(responses[5].data);
      setRoom(responses[6].data);
    } catch (error) {
      console.error('fetch api error', error);
    }
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
}
