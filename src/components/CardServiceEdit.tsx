import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {CardServiceItemProps, ServiceItem} from '../assets/types/PropTypes';
import {Colors} from '../assets/Colors';
import {ServiceContext} from '../contexts/ServiceContext';

const {width, height} = Dimensions.get('window');

type serviceProps = {
  services: ServiceItem;
};

function CardServiceEdit({services}: serviceProps) {
  const serviceContext = useContext(ServiceContext);
  function formatCurrency(amount: any) {
    if (typeof amount === 'undefined' || amount === null) {
      return '';
    }
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }

  const hanldeDelete = () => {
    serviceContext?.deleteService(services.id);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <TouchableOpacity style={styles.cardedit} onPress={hanldeDelete}>
        <Image
          style={styles.iconedit}
          source={require('../assets/images/icon/edit.png')}></Image>
      </TouchableOpacity>
      <Image
        source={{
          uri: services.icon,
        }}
        style={styles.icon}
        resizeMode="contain"></Image>
      <Text style={styles.name}>{services.service_name}</Text>
      <Text style={styles.txt}>
        {formatCurrency(services.cost)}/{services.note}
      </Text>
    </TouchableOpacity>
  );
}
export default CardServiceEdit;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.3,
    height: height * 0.15,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  name: {
    fontSize: 15,
    margin: 10,
  },
  icon1: {
    width: 22,
    height: 22,
  },
  icon: {
    width: 24,
    height: 24,
  },
  box: {
    paddingRight: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
  txt: {
    fontSize: 10,
  },
  iconedit: {
    width: 13,
    height: 13,
  },
  cardedit: {
    flexDirection: 'row-reverse',
    marginRight: 10,
    width: '100%',
  },
});
