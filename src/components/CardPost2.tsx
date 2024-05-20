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
import {Posts} from '../assets/types/PropTypes';
const {width, height} = Dimensions.get('window');

type cardPostProps = {
  item: Posts;
  onPress: (id: number) => void;
};

function CardPost2({item, onPress}: cardPostProps) {
  function formatCurrency(amount: any) {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => onPress(item.id)}>
      <Image
        style={styles.image}
        source={{uri: item.rooms.image}}
        resizeMode="cover"></Image>
      <View style={styles.information}>
        <Text style={[styles.title, {width: 0.48 * width}]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.row}>
          <Icon
            name="transgender"
            size={15}
            color={Colors.primary}
            style={{marginRight: 5}}></Icon>
          <Text>{item.rooms.note_gender}</Text>
          <Icon
            name="users"
            size={15}
            color={Colors.primary}
            style={styles.icon}></Icon>
          <Text>{item.rooms.number_of_people}</Text>
          <Icon
            name="square-o"
            size={15}
            color={Colors.primary}
            style={styles.icon}></Icon>
          <Text>
            {item.rooms.area_width}x{item.rooms.area_height}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="money"
            size={15}
            color={Colors.primary}
            style={{marginRight: 5}}></Icon>
          <Text>{formatCurrency(item.rooms.room_price)} / Tháng</Text>
        </View>
        <View style={styles.row}>
          <Icon2
            name="place"
            size={15}
            color={Colors.primary}
            style={{marginRight: 5}}></Icon2>
          <Text numberOfLines={1} style={{width: width * 0.4}}>
            {item.rooms.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{color: '#ff7911'}}> Ghi chú: </Text>
          <Text style={styles.txtnote} numberOfLines={1}>
            {item.rooms.note}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default CardPost2;

const styles = StyleSheet.create({
  container: {
    height: 0.42 * height,
    width: 0.48 * width,
    borderRadius: 10,
    margin: 3,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    height: 0.2 * height,
    width: width * 0.46,
    borderRadius: 10,
  },
  information: {
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
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
    width: width * 0.3,
  },
});
