import React, {useContext} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';

import {SearchContext} from '../contexts/SearchContext';
import {Colors} from '../assets/Colors';
import Icon5 from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
};

const CustomModalProvine: React.FC<CustomModalProps> = ({visible, onClose}) => {
  const searchContext = useContext(SearchContext);

  const handleCityPress = (cityName: string) => {
    console.log(`Đã chọn thành phố: ${cityName}`);
    searchContext?.setProvince(cityName);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={{flex: 1}}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => searchContext?.setModalVisible(false)}
        activeOpacity={1}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <Text style={styles.txttitle}>Tỉnh/Thành Phố</Text>
            <View style={styles.search}>
              <Icon5 name="search1" size={24} style={{marginLeft: 5}}></Icon5>
              <TextInput
                style={styles.txtsearch}
                placeholder="Nhập tên tỉnh/thành phố"></TextInput>
            </View>
            <View style={styles.layout}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                style={styles.scroll}>
                <TouchableOpacity
                  onPress={() => handleCityPress('TP Hồ Chí Minh')}>
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
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  //
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

export default CustomModalProvine;
