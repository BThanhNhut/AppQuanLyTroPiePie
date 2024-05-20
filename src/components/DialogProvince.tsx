import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {DialogProvinceProps} from '../assets/types/PropTypes';

//Context
// import {SearchContext} from '../contexts/SearchContext';

const {height, width} = Dimensions.get('window');

function DialogProvince({onClose}: DialogProvinceProps) {
  //   const searchContext = useContext(SearchContext);

  const handleCityPress = (cityName: string) => {
    console.log(`Đã chọn thành phố: ${cityName}`);
    // searchContext?.setProvince(cityName);
    // onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txttitle}>Tỉnh/Thành Phố</Text>
      <View style={styles.search}>
        <Icon5 name="search1" size={24} style={{marginLeft: 5}}></Icon5>
        <TextInput
          style={styles.txtsearch}
          placeholder="Nhập tên tỉnh/thành phố"></TextInput>
      </View>
      <View style={styles.layout}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scroll}>
          <TouchableOpacity onPress={() => handleCityPress('TP Hồ Chí Minh')}>
            <Text style={styles.txtcontent}>Hồ Chí Minh</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCityPress('TP Đà Nẵng')}>
            <Text style={styles.txtcontent}>Đà Nẵng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCityPress('TP Hà Nội')}>
            <Text style={styles.txtcontent}>Hà Nội</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
export default DialogProvince;

const styles = StyleSheet.create({
  container: {
    height: height * 0.35,
    width: width * 0.6,
    borderRadius: 10,
    alignItems: 'center',
  },
  txttitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: Colors.silver2,
    height: '10%',
    width: '90%',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  txtsearch: {
    height: '100%',
    width: '100%',
    paddingLeft: 10,
  },
  layout: {
    marginTop: 10,
    width: '80%',
    height: '70%',
  },
  scroll: {},
  content: {
    width: '100%',
    height: '100%',
  },
  txtcontent: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderColor: Colors.silver2,
  },
});
