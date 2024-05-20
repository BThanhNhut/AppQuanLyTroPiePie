import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Colors} from '../assets/Colors';
import CardService from '../components/CardService';

const {width, height} = Dimensions.get('window');

function ServiceScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <CardService
              name="Vận chuyển"
              image={require('../assets/images/icon/delivery.png')}></CardService>
            <CardService
              name="Tư vấn thiết kế phòng"
              image={require('../assets/images/icon/design.png')}></CardService>
          </View>
          <View style={styles.row}>
            <CardService
              name="Sửa điện nước"
              image={require('../assets/images/icon/repair-tools.png')}></CardService>
            <CardService
              name="Giặt là"
              image={require('../assets/images/icon/washing-machine.png')}></CardService>
          </View>
          <View style={styles.row}>
            <CardService
              name="Đổi nước"
              image={require('../assets/images/icon/gallon.png')}></CardService>
            <CardService
              name="Đổi bình ga"
              image={require('../assets/images/icon/gas.png')}></CardService>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    width: width,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
