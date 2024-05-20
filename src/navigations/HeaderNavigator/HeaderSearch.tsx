import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

function HeaderSearch({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon5
          name="left"
          size={32}
          color={Colors.white}
          style={styles.icon}
          onPress={() => navigation.goBack()}></Icon5>
        <View style={styles.search}>
          <Icon5
            name="search1"
            size={22}
            color={Colors.primary}
            style={styles.iconsearch}></Icon5>
          <TextInput
            placeholder="Tìm kiếm tin đăng"
            style={styles.txtinput}></TextInput>
          <Icon2 name="place" size={22} color={Colors.primary}></Icon2>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon5 name="filter" size={32} color={Colors.white}></Icon5>
          <Text style={styles.txt}>Bộ lọc</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    marginTop: 30,
    flexDirection: 'row',
    width: width,
    height: '70%',
    alignItems: 'center',
  },
  icon: {},
  search: {
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
    width: width * 0.6,
    height: height * 0.05,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  txt: {
    color: Colors.white,
  },
  txtinput: {
    width: width * 0.35,
    marginLeft: 20,
    marginRight: 20,
  },
  iconsearch: {
    marginLeft: 10,
  },
});
