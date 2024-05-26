import {ReactNode, createContext, useEffect, useState} from 'react';
import {ServiceItem} from '../assets/types/PropTypes';
import {serviceItems} from '../assets/Datas/CreateRoomData';

type ServiceContextType = {
  services: ServiceItem[] | [];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  addService: (service: ServiceItem) => void;
  deleteService: (id: number) => void;
  updateService: (updatedService: ServiceItem) => void;
};
export const ServiceContext = createContext<ServiceContextType | undefined>(
  undefined,
);

export function ServicesProvider({children}: {children: ReactNode}) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  useEffect(() => {
    setServices(serviceItems);
  }, []);

  const addService = (service: ServiceItem) => {
    setServices(prevServices => [...prevServices, service]);
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
