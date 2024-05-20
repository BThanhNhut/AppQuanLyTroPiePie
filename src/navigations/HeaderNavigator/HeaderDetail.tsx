import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {Colors} from '../../assets/Colors';
import Icon5 from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

function HeaderDetail({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon5
          name="left"
          size={22}
          color={Colors.white}
          onPress={() => navigation.goBack()}></Icon5>
        <View style={styles.rowpnly}>
          <Text style={styles.title}> Thông tin chi tiết</Text>
        </View>
        <Icon5 name="search1" size={22} color={Colors.white}></Icon5>
      </View>
    </View>
  );
}
export default HeaderDetail;

const styles = StyleSheet.create({
  container: {
    height: height * 0.1,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    marginTop: 17,
    width: width,
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rowpnly: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
