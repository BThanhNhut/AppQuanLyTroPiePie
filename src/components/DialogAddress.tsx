import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
//Component
// import Dropdowncomponent from '../components/dropdown';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {DialogProvinceProps} from '../assets/types/PropTypes';
// import {Dropdown} from 'react-native-element-dropdown';
//Context
import {SearchContext, useData} from '../contexts/SearchContext';

const {height, width} = Dimensions.get('window');

function DialogProvince() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const searchContext = useContext(SearchContext);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const handleCityPress = (cityName: string) => {
    searchContext?.setProvince(cityName);
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
        {/* <Dropdowncomponent name="tỉnh/ thành phố"></Dropdowncomponent>
        <Dropdowncomponent name="quận"></Dropdowncomponent>
        <Dropdowncomponent name="phường/xã"></Dropdowncomponent> */}
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
    width: '100%',
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
