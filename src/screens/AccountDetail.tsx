import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {AuthContext} from '../contexts/AuthContext';
import {Colors} from '../assets/Colors';
const {width, height} = Dimensions.get('window');

export default function AccountDetail(): React.JSX.Element {
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: authContext?.account?.avatar}}></Image>
      <View style={styles.card}>
        <View style={styles.rowonly}>
          <Text style={styles.title}>Tên đăng nhập</Text>
        </View>
        <TextInput style={styles.txt} editable={false}>
          {authContext?.account?.username}
        </TextInput>

        <View style={styles.rowonly}>
          <Text style={styles.title}>Mật khẩu</Text>
        </View>
        <TextInput style={styles.txt} secureTextEntry={true}>
          {authContext?.account?.password}
        </TextInput>

        <View style={styles.rowonly}>
          <Text style={styles.title}>Tên người dùng</Text>
        </View>
        <TextInput style={styles.txt}>
          {authContext?.account?.customer_name}
        </TextInput>

        <View style={styles.rowonly}>
          <Text style={styles.title}>Số điện thoại</Text>
        </View>
        <TextInput style={styles.txt}>
          {authContext?.account?.phone_number}
        </TextInput>

        <View style={styles.rowonly}>
          <Text style={styles.title}>Địa chỉ</Text>
        </View>
        <TextInput style={styles.txt}>
          {authContext?.account?.address}
        </TextInput>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.txtbutton}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    borderRadius: 5,
    alignItems: 'center',
    height: height * 0.9,
    width: width * 0.9,
    backgroundColor: 'white',
    //Viền
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  rowonly: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    borderWidth: 2,
    borderColor: Colors.primary,
    margin: 10,
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  txt: {
    margin: 5,
    borderWidth: 1,
    width: '90%',
    borderColor: Colors.silver,
    borderRadius: 15,
  },
  button: {
    borderRadius: 10,
    margin: height * 0.04,
    height: height * 0.05,
    width: '80%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtbutton: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.white,
  },
});
