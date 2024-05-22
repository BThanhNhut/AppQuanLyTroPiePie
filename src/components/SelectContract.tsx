import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors} from '../assets/Colors';
import axios from 'axios';
import {Contracts} from '../assets/types/PropTypes';
import {AuthContext} from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

export default function SelectContract({route, navigation}: any) {
  const {selectContract} = route.params;
  const authContext = useContext(AuthContext);
  const [contracts, setcontracts] = useState<Contracts[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://qlphong-tro-production.up.railway.app/contracts/accounts/${authContext?.account?.id}`,
        );
        setcontracts(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    fetchData();
  }, []);
  const handleIdSelected2 = (id: string) => {
    console.log('Ket qua la', id);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.layout}>
          {contracts.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                selectContract(
                  item.id,
                  item.rooms.name_room,
                  item.room_price,
                  navigation,
                )
              }>
              <View style={styles.card2}>
                <View style={styles.rowonly}>
                  <View style={styles.row}>
                    <Icon1
                      name="phone"
                      color={Colors.primary}
                      size={16}
                      style={styles.icon}></Icon1>
                    <Text style={styles.title}>Số điện thoại</Text>
                  </View>
                  <Text>{item.rooms.phone_number}</Text>
                </View>
                <View style={styles.rowonly}>
                  <View style={styles.row}>
                    <Icon
                      name="money"
                      color={Colors.primary}
                      size={16}
                      style={styles.icon}></Icon>
                    <Text style={styles.title}>Tiền cọc</Text>
                  </View>
                  <Text>{item.rooms.deposit_price}</Text>
                </View>
                <View style={styles.rowonly}>
                  <View style={styles.row}>
                    <Icon
                      name="home"
                      color={Colors.primary}
                      size={16}
                      style={styles.icon}></Icon>
                    <Text style={styles.title}>Số/ tên phòng</Text>
                  </View>
                  <Text>{item.rooms.name_room}</Text>
                </View>
                <View style={styles.rowonly}>
                  <View style={styles.row}>
                    <Icon1
                      name="phone"
                      color={Colors.primary}
                      size={16}
                      style={styles.icon}></Icon1>
                    <Text style={styles.title}>Số điện thoại chủ trọ</Text>
                  </View>
                  <Text>{item.accounts.phone_number}</Text>
                </View>
              </View>
              <View style={styles.rowborder}>
                <Text style={styles.txt}>Người đại diện thuê</Text>
                <Text style={styles.txt}>{item.tenant_name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderRadius: 20,
    width: width * 0.8,
    height: height * 0.25,
    backgroundColor: Colors.primary,
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
  card2: {
    borderRadius: 20,
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: Colors.white,
  },
  layout: {
    flex: 1,
    alignItems: 'center',
  },
  rowborder: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  rowonly: {
    margin: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {},
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});
