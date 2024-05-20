import React, {useState} from 'react';
import {styles} from './styles/RegisterStyle';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {signUpWithEmailAndPassword} from './Services/LoginService';

export default function RegisterScreen({navigation}: any): React.JSX.Element {
  const [customername, setcustomername] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [retypepassword, setretypepassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const goToLogin = () => {
    navigation.goBack();
  };
  const registerfirebase = () => {
    signUpWithEmailAndPassword(
      username.toLocaleLowerCase(),
      password.toLocaleLowerCase(),
      customername.toLocaleLowerCase(),
      'https://icon2.cleanpng.com/20180418/sde/kisspng-computer-icons-professional-clipart-5ad7f6c375e0b9.3659493615241028514828.jpg',
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/register.png')}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.background1}>
          <TextInput
            style={styles.txtusername}
            placeholder="Tên người dùng"
            onChangeText={text => setcustomername(text)}></TextInput>
          <TextInput
            style={styles.txtpassword}
            placeholder="Nhập địa chỉ email"
            onChangeText={text => setusername(text)}></TextInput>
          <TextInput
            style={styles.txtpassword}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            onChangeText={text => setpassword(text)}></TextInput>
          <TextInput
            style={styles.txtpassword}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={true}
            onChangeText={text => setretypepassword(text)}></TextInput>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={registerfirebase}>
              <Text style={styles.text3}>Đăng ký</Text>
            </TouchableOpacity>
            <Text style={styles.text2} onPress={goToLogin}>
              Quay về
            </Text>
          </View>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}
