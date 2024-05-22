import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {listItem} from '../assets/Datas/AcountData';
import {AuthContext} from '../contexts/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showDialogErrorLogin, showDialogLogOut} from './Services/DetailService';
import {styles} from './styles/AccountStyles';

function AccountScreen({navigation}: any): React.JSX.Element {
  const authContext = useContext(AuthContext);
  const [numberroom, setNumberroom] = useState<number>(0);
  const [numberpost, setNumberpost] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get(
          `https://qlphong-tro-production.up.railway.app/rooms/count/${authContext?.account?.id}`,
        ),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/posts/count/${authContext?.account?.id}`,
        ),
      ]);
      setNumberroom(responses[0].data);
      setNumberpost(responses[1].data);
    } catch (error) {
      console.log('fetch data error', error);
    }
  };

  const goToScreen = (name: string) => {
    navigation.navigate(name);
  };

  const goTo = (name: string) => {
    navigation.navigate(name);
  };

  const handleLogout = async () => {
    // showDialogLogOut('haha', fetchData, fetchData);
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={require('../assets/images/icon/backgroundaccount.png')}
          style={styles.background}
          resizeMode="cover">
          {/* Card thông tin */}
          <TouchableOpacity
            style={[styles.row, styles.custom1]}
            activeOpacity={0.8}>
            <Text style={styles.txt}>Chuyển đổi tài khoản</Text>
            <Icon2
              name="swap-calls"
              style={styles.icon}
              size={20}
              color={Colors.primary}></Icon2>
          </TouchableOpacity>

          <View style={[styles.rowavatar]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountDetail')}>
              <Image
                source={{uri: authContext?.account?.avatar}}
                resizeMode="cover"
                style={styles.img}></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.txttitleava}>Xin chào</Text>
              <Text style={styles.txtname}>
                {authContext?.account?.customer_name}
              </Text>
            </View>
            <View style={styles.border2}>
              <Icon name="headphones" size={32} color={Colors.white}></Icon>
              <Text style={{color: Colors.white}}>Trợ giúp</Text>
            </View>
          </View>

          {/* Card thông số */}
          <View style={styles.borderinfo}>
            <View>
              <View style={styles.colborderinfo}>
                <Text style={styles.title}>Số phòng</Text>
                <Text style={styles.num}>{numberroom}</Text>
              </View>
              <View style={styles.colborderinfo}>
                <Text style={styles.title}>Số phòng đang cho thuê</Text>
                <Text style={styles.num}>0</Text>
              </View>
            </View>

            <View>
              <View style={styles.colborderinfo}>
                <Text style={styles.title}>Số bài đăng</Text>
                <Text style={styles.num}>{numberpost}</Text>
              </View>
              <View style={styles.colborderinfo}>
                <Text style={styles.title}>Số phòng trống</Text>
                <Text style={styles.num}>0</Text>
              </View>
            </View>
          </View>

          {/* Card chức năng */}
          <View style={styles.borderinfo2}>
            <View style={styles.rowcreate}>
              <TouchableOpacity
                style={styles.colborderinfo}
                activeOpacity={0.8}
                onPress={() => goToScreen('CreateRoom')}>
                <Image
                  source={require('../assets/images/icon/taophong.png')}
                  resizeMode="contain"
                  style={styles.iconfunction}></Image>
                <Text>Tạo phòng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.colborderinfo}
                activeOpacity={0.8}
                onPress={() => goToScreen('CreatePost')}>
                <Image
                  source={require('../assets/images/icon/addpost.png')}
                  resizeMode="contain"
                  style={styles.iconfunction}></Image>
                <Text>Tạo bài đăng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.colborderinfo}
                activeOpacity={0.8}
                onPress={() => goToScreen('CreateContract')}>
                <Image
                  source={require('../assets/images/icon/contract.png')}
                  resizeMode="contain"
                  style={styles.iconfunction}></Image>
                <Text>Tạo hợp đồng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.colborderinfo}
                activeOpacity={0.8}
                onPress={() => goToScreen('CreateInvoice')}>
                <Image
                  source={require('../assets/images/icon/bill.png')}
                  resizeMode="contain"
                  style={styles.iconfunction}></Image>
                <Text>Tạo hóa đơn</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*  */}
          <View style={styles.borderinfo3}>
            {listItem.map((item, index) => (
              <TouchableOpacity
                style={styles.row2}
                key={index}
                activeOpacity={0.8}
                onPress={() => goTo(item.screen)}>
                <Image
                  source={item.nameIcon}
                  resizeMode="contain"
                  style={styles.iconmenu}></Image>
                <Text style={styles.txtmenu}> {item.text}</Text>
                <Icon5 name="right" size={22}></Icon5>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.row2}
              key={9}
              activeOpacity={0.8}
              onPress={handleLogout}>
              <Image
                source={require('../assets/images/icon/exit.png')}
                resizeMode="contain"
                style={styles.iconmenu}></Image>
              <Text style={styles.txtmenu}>Đăng xuất</Text>
              <Icon5 name="right" size={22}></Icon5>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
export default AccountScreen;
