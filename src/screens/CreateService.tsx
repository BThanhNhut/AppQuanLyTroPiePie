import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ServiceContext} from '../contexts/ServiceContext';
import {ServiceItem, ServiceItem2} from '../assets/types/PropTypes';
import {showDialogSuccess} from './Services/DetailService';

const {width, height} = Dimensions.get('window');

export default function CreateService() {
  const serviceContext = useContext(ServiceContext);
  const [service_name, setservice_name] = useState<string>('');
  const [cost, setcost] = useState<number>(0);
  const [note, setnote] = useState<string>('');

  const handleService = () => {
    const service: ServiceItem2 = {
      service_name: service_name,
      cost: cost,
      note: note,
      icon: 'https://firebasestorage.googleapis.com/v0/b/quanlyphongtropie.appspot.com/o/dieuhoa.png?alt=media&token=22ca2aaa-a761-4d12-a632-bf0e9e61825a',
      status: true,
    };
    console.log(serviceContext?.addService(service));
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title2}>Tên dịch vụ</Text>
        <TouchableOpacity style={styles.rowonly}>
          <Icon2
            name="file-contract"
            color={Colors.primary}
            size={24}
            style={styles.icon}></Icon2>
          <TextInput
            style={styles.txtinput}
            placeholder="Tên dịch vụ"
            onChangeText={text => setservice_name(text)}>
            {service_name}
          </TextInput>
        </TouchableOpacity>
        <Text style={styles.title2}>Phí dịch vụ</Text>
        <TouchableOpacity style={styles.rowonly}>
          <Icon
            name="money"
            color={Colors.primary}
            size={24}
            style={styles.icon}></Icon>
          <TextInput
            style={styles.txtinput}
            placeholder="Phí dịch vụ"
            keyboardType="numeric"
            onChangeText={text => setcost(parseInt(text))}>
            {cost}
          </TextInput>
        </TouchableOpacity>
        <Text style={styles.title2}>Ghi chú đơn vị</Text>
        <TouchableOpacity style={styles.rowonly}>
          <Icon2
            name="sticky-note"
            color={Colors.primary}
            size={24}
            style={styles.icon}></Icon2>
          <TextInput
            style={styles.txtinput}
            placeholder="Ghi chú"
            onChangeText={text => setnote(text)}></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleService}>
          <Text style={styles.txt}>Tạo dịch vụ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 10,
    flex: 1,
    backgroundColor: Colors.white,
    //
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  title2: {
    margin: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.back,
  },
  rowonly: {
    alignItems: 'center',
    width: width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.silver,
    marginHorizontal: 10,
  },
  rowcodeid: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: width,
  },
  icon: {
    margin: 10,
  },
  txtinput: {
    // borderWidth: 1,
    width: width,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: width * 0.3,
    borderRadius: 20,
    width: width * 0.6,
    height: height * 0.06,
    backgroundColor: Colors.primary,
  },
  txt: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
