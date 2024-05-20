import {ReactNode, createContext, useEffect, useState} from 'react';
import {Account} from '../assets/types/PropTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type AccountContextType = {
  account: Account | undefined;
  setAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
};

export const AuthContext = createContext<AccountContextType | undefined>(
  undefined,
);

export function AuthProvider({children}: {children: ReactNode}) {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  useEffect(() => {
    const loadAccount = async () => {
      const id = await AsyncStorage.getItem('id');
      try {
        const responese = await axios.get(
          `https://qlphong-tro-production.up.railway.app/accounts/${id}`,
        );
        setAccount(responese.data);
        console.log('tai khoang la', responese.data);
      } catch (error) {
        console.error('fetch api thất bại');
      }
      console.log('id la ', id);
    };
    loadAccount();
  }, []);
  return (
    <AuthContext.Provider value={{account, setAccount}}>
      {children}
    </AuthContext.Provider>
  );
}
