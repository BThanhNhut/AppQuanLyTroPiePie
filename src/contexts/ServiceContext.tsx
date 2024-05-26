import {ReactNode, createContext, useEffect, useState} from 'react';
import {ServiceItem} from '../assets/types/PropTypes';
import {serviceItems} from '../assets/Datas/CreateRoomData';

type ServiceContextType = {
  services: ServiceItem[] | [];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: number) => void;
  updateService: (updatedService: ServiceItem) => void;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(
  undefined,
);

export function ServicesProvider({children}: {children: ReactNode}) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  useEffect(() => {
    setServices(serviceItems);
    const maxId = Math.max(...serviceItems.map(service => service.id), 0);
    setNextId(maxId + 1);
  }, []);

  const addService = (service: Omit<ServiceItem, 'id'>) => {
    setServices(prevServices => {
      const newService = {...service, id: nextId};
      setNextId(prevId => prevId + 1);
      return [...prevServices, newService];
    });
  };

  const deleteService = (id: number) => {
    setServices(prevServices =>
      prevServices.filter(service => service.id !== id),
    );
  };

  const updateService = (updatedService: ServiceItem) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === updatedService.id ? updatedService : service,
      ),
    );
  };

  return (
    <ServiceContext.Provider
      value={{services, setServices, addService, deleteService, updateService}}>
      {children}
    </ServiceContext.Provider>
  );
}
