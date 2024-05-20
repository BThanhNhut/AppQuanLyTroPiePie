import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownComponent from '../components/DropdownComponent ';
import {HomeContext} from '../contexts/HomeContext';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
import {Room, roomsid_name} from '../assets/types/PropTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
const {width, height} = Dimensions.get('window');

export default function CreateContract(): React.JSX.Element {
  const homeContext = useContext(HomeContext);
  const authCoontext = useContext(AuthContext);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startpay_money, setStartpay_money] = useState<Date>(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showstartpay_money, setShowstartpay_money] = useState(false);

  const [room, setRoom] = useState<roomsid_name[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/account/${authCoontext?.account?.id}`,
          ),
        ]);
        setRoom(responses[0].data);
      } catch (error) {
        console.log('Fetch api error', error);
      }
    };
    fetchData();
  }, []);

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const onStartpay_moneyChange = (
    event: any,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || endDate;
    setShowstartpay_money(false);
    setStartpay_money(currentDate);
  };

  const handleIdSelected = (id: string) => {
    console.log('id dc chọn là' + id);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.card}>
          <Text style={styles.title}>Bên thuê</Text>
          <Text style={styles.title2}>Đại diện bên thuê</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập tên người thuê"></TextInput>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập điện thoại người thuê"
              keyboardType="numeric"></TextInput>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập Email"></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Số CMND/CCCD</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập CMND/CCCD"></TextInput>
          </TouchableOpacity>

          <View style={styles.rowcodeid}>
            <View>
              <Text>Mặt trước</Text>
              <TouchableOpacity style={styles.cmnd}>
                <Icon name="camera" color={Colors.primary} size={24}></Icon>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Mặt sau</Text>
              <TouchableOpacity style={styles.cmnd}>
                <Icon name="camera" color={Colors.primary} size={24}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Thông tin thuê</Text>
          <Text style={styles.title2}>Thông tin tòa nhà</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <View
              style={{
                width: '85%',
                height: '100%',
              }}>
              <DropdownComponent
                data={room}
                onIdSelected={handleIdSelected}></DropdownComponent>
            </View>
          </TouchableOpacity>
          <Text style={styles.title2}>Ngày bắt đầu</Text>
          <TouchableOpacity
            style={styles.rowonly}
            onPress={() => setShowStartDatePicker(true)}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Từ ngày"
              value={startDate.toISOString().split('T')[0]}
              editable={false}></TextInput>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.title2}>Ngày kết thúc</Text>
          <TouchableOpacity
            style={styles.rowonly}
            onPress={() => setShowEndDatePicker(true)}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="đến ngày"
              value={endDate.toISOString().split('T')[0]}
              editable={false}></TextInput>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.title2}>Tiền phòng</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tiền phòng"
              keyboardType="numeric"></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Tiền cọc</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tiền cọc"
              keyboardType="numeric"></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Ngày bắt đầu thanh toán</Text>
          <TouchableOpacity
            style={styles.rowonly}
            onPress={() => setShowstartpay_money(true)}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="đến ngày"
              value={startpay_money.toISOString().split('T')[0]}
              editable={false}></TextInput>
            {showstartpay_money && (
              <DateTimePicker
                value={startpay_money}
                mode="date"
                display="default"
                onChange={onStartpay_moneyChange}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.title2}>Kì thanh toán</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Chọn kì thanh toán"
              keyboardType="numeric"></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Ghi chú</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="user"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập ghi chú"></TextInput>
          </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
  },
  cmnd: {
    width: width * 0.3,
    height: height * 0.15,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  },
  txtinput: {
    // borderWidth: 1,
    width: width,
  },
});
