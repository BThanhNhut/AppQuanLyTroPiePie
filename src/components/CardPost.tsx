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
import {cardPostProps} from '../assets/types/PropTypes';
const {width, height} = Dimensions.get('window');

export function formatCurrency(amount: any) {
  return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

function CardPost({item, onPress}: cardPostProps) {
  const currentDate = new Date().getTime() as number; // Lấy thời gian hiện tại tính bằng mili giây
  const postDate = new Date(item.create_at).getTime() as number; // Lấy thời gian tạo bài viết tính bằng mili giây
  const timeDifference = currentDate - postDate; // Khoảng thời gian tính bằng mili giây

  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(timeDifference / millisecondsInADay);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item.id)}
      activeOpacity={7.0}>
      <View style={styles.borderimage}>
        <Image
          style={styles.image}
          source={{uri: item.rooms.image}}
          resizeMode="cover"></Image>
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{daysDifference}d</Text>
        <View style={styles.row}>
          <Icon
            name="transgender"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon>
          <Text>{item.rooms.note_gender}</Text>
          <Icon
            name="users"
            size={15}
            color="#ff7911"
            style={styles.icon}></Icon>
          <Text>{item.rooms.number_of_people}</Text>
          <Icon
            name="square-o"
            size={15}
            color="#ff7911"
            style={styles.icon}></Icon>
          <Text>
            {item.rooms.area_width} x {item.rooms.area_height}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="money"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon>
          <Text>{formatCurrency(item.rooms.room_price)} / Tháng</Text>
        </View>
        <View style={styles.row}>
          <Icon2
            name="place"
            size={15}
            color="#ff7911"
            style={{marginRight: 5}}></Icon2>
          <Text numberOfLines={1} style={styles.txtnote}>
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
export default CardPost;

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
