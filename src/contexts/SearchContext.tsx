import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type searchContext = {
  Province: string | undefined;
  setProvince: React.Dispatch<React.SetStateAction<string | undefined>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = createContext<searchContext | undefined>(
  undefined,
);

export function SearchProvider({children}: {children: ReactNode}) {
  useEffect(() => {
    console.log('chay len la chay');
  }, []);
  const [Province, setProvince] = useState<string | undefined>(
    'TP Hồ Chí Minh',
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{Province, setProvince, modalVisible, setModalVisible}}>
      {children}
    </SearchContext.Provider>
  );
}

// export const useData = () => {
//   return useContext(SearchContext);
// };
