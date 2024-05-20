import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../screens/styles/LoginStyle';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {AccountLogin, userInfo} from '../assets/types/PropTypes';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showDialogErrorLogin} from './Services/DetailService';
import {
  onGoogleButtonPress,
  signInWithEmailAndPassword,
  signOut,
  signUpWithEmailAndPassword,
  validateInput,
} from './Services/LoginService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {HomeContext} from '../contexts/HomeContext';

GoogleSignin.configure({
  webClientId:
    '126549853967-29k9f062t8k32gthikd4ndeairpt5mhj.apps.googleusercontent.com',
});

export default function LoginScreen({navigation}: any): React.JSX.Element {
  const authContext = useContext(AuthContext);
  const homeContext = useContext(HomeContext);
  const [username, setusername] = useState<string>(
    authContext?.account?.username || '',
  );
  const [password, setpassword] = useState<string>(
    authContext?.account?.password || '',
  );

  useEffect(() => {
    const load = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      setusername(username || '');
      setpassword(password || '');
    };
    load();
  }, []);

  const handleLogin = async () => {
    const isValidUsername = validateInput(username);
    const isEmail = validateInput(username);
    const isValidPassword = validateInput(password);
    // if (!isEmail) {
    //   showDialogErrorLogin('Định đạng không đúng (Phải là email)');
    //   return;
    // }
    if (!isValidUsername || !isValidPassword) {
      showDialogErrorLogin('Không được để trống và chứa kí tự đặc biệt');
      return;
    }

    const account_login = await signInWithEmailAndPassword(username, password);
    try {
      if (account_login) {
        const response = await axios.post(
          `https://qlphong-tro-production.up.railway.app/accounts/login`,
          {
            username: username.toLocaleLowerCase(),
            password: password.toLocaleLowerCase(),
          },
        );
        await AsyncStorage.setItem('id', response.data.account.id.toString());
        await AsyncStorage.setItem(
          'customer_name',
          response.data.account.customer_name,
        );
        await AsyncStorage.setItem('username', response.data.account.username);
        await AsyncStorage.setItem('password', response.data.account.password);

        authContext?.setAccount(response.data.account);
        navigation.replace('TabsNavigator');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen');
    // signOut();
  };

  const handleGoogleSignIn = async () => {
    try {
      const userLoginGoogle = await onGoogleButtonPress();
      const user = homeContext?.accounts.find(
        account => account.username === userLoginGoogle.email,
      );
      if (user) {
        await AsyncStorage.setItem('id', user.id.toString());
        await AsyncStorage.setItem('customer_name', user.customer_name);
        await AsyncStorage.setItem('username', user.username);
        await AsyncStorage.setItem('password', user.password);
        authContext?.setAccount(user);
        navigation.replace('TabsNavigator');
      } else {
        await signUpWithEmailAndPassword(
          userLoginGoogle.email || '',
          '123456',
          userLoginGoogle.displayName || '',
          userLoginGoogle.photoURL || '',
        );
        navigation.replace('TabsNavigator');
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login.png')}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.background1}>
          <TextInput
            style={styles.txtusername}
            placeholder="Tài khoản"
            onChangeText={text => setusername(text)}>
            {username}
          </TextInput>
          <TextInput
            style={styles.txtpassword}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            onChangeText={text => setpassword(text)}>
            {password}
          </TextInput>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              handleLogin();
            }}>
            <Text style={styles.text3}>Đăng Nhập</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text1}>Bạn muốn đăng ký tài khoản ?</Text>
            <Text style={styles.text2} onPress={goToRegister}>
              Đăng ký
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.button2}
              activeOpacity={0.8}
              onPress={goToRegister}>
              <Image
                source={require('../assets/images/facebook.png')}
                resizeMode="contain"
                style={{width: '60%', height: '60%'}}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              activeOpacity={0.8}
              onPress={handleGoogleSignIn}>
              <Image
                source={require('../assets/images/google.png')}
                resizeMode="contain"
                style={{width: '60%', height: '60%'}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
