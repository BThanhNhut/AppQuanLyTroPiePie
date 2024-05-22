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
import {styles} from './styles/AccountDetailStyle';

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
