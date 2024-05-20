import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets/Colors';
import {Roomadd, cardPostProps} from '../assets/types/PropTypes';
const {width, height} = Dimensions.get('window');

export function formatCurrency(amount: any) {
  return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

export type cardRoom = {
  item: Roomadd;
};

function CardRoom({item}: cardRoom) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={7.0}>
      <View style={styles.borderimage}>
        <Image
          style={styles.image}
          source={{uri: item.image}}
          resizeMode="cover"></Image>
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>{item.name_room}</Text>
        <View style={styles.row}>
          <Icon
            name="transgender"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon>
          <Text>{item.note_gender}</Text>
          <Icon
            name="users"
            size={15}
            color="#ff7911"
            style={styles.icon}></Icon>
          <Text>{item.number_of_people}</Text>
          <Icon
            name="square-o"
            size={15}
            color="#ff7911"
            style={styles.icon}></Icon>
          <Text>
            {item.area_width} x {item.area_height}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="money"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon>
          <Text>{formatCurrency(item.room_price)} / Tháng</Text>
        </View>
        <View style={styles.row}>
          <Icon2
            name="place"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon2>
          <Text numberOfLines={1} style={styles.txtnote}>
            {item.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{color: '#ff7911'}}> Ghi chú: </Text>
          <Text style={styles.txtnote} numberOfLines={1}>
            {item.note}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default CardRoom;

const styles = StyleSheet.create({
  container: {
    height: 0.25 * height,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
  },
  borderimage: {
    height: 0.25 * height,
    width: width * 0.39,
    justifyContent: 'center',
  },
  image: {
    height: 0.23 * height,
    width: width * 0.39,
    borderRadius: 20,
  },
  information: {
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
  txtnote: {
    marginLeft: 2,
    flexWrap: 'wrap',
    width: width * 0.4,
  },
  time: {
    fontWeight: 'bold',
    color: Colors.red2,
  },
});
