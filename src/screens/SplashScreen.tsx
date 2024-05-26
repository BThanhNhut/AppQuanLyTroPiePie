import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles/SplashStyle';

function Splash({navigation}: any): React.JSX.Element {
  const checkLogin = async () => {
    try {
      const status = await AsyncStorage.getItem('username');
      if (status) {
        navigation.replace('TabsNavigator');
      } else {
        navigation.replace('LoginScreen');
      }
    } catch (error) {
      console.log('Lỗi là :' + error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.backgroundimage}
        resizeMode="stretch"></ImageBackground>
    </View>
  );
}
export default Splash;
