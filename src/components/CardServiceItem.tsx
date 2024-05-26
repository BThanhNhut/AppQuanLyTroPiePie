import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {CardServiceItemProps} from '../assets/types/PropTypes';
import {Colors} from '../assets/Colors';
const {width, height} = Dimensions.get('window');

function CardServiceItem({id, services}: CardServiceItemProps) {
  const formatCurrency = (amount: any) => {
    if (typeof amount === 'undefined' || amount === null) {
      return '';
    }
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}
export default CardServiceItem;

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
});
