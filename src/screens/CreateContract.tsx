import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-crop-picker';
import DropdownComponent from '../components/DropdownComponent ';
import {HomeContext} from '../contexts/HomeContext';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
import {
  Createcontracts,
  ImageSelect,
  ImageSelect2,
  roomsid_name,
} from '../assets/types/PropTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropdownComponent2 from '../components/DropdownComponent2';
import {Image} from 'react-native';
import {uploadImagesToFirebase} from './Services/CreateRoomService';
import {showDialogSuccess} from './Services/DetailService';
const {width, height} = Dimensions.get('window');

export default function CreateContract(): React.JSX.Element {
  const homeContext = useContext(HomeContext);
  const authContext = useContext(AuthContext);
  const [rooms, setrooms] = useState<roomsid_name[]>([]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startpay_money, setStartpay_money] = useState<Date>(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showstartpay_money, setShowstartpay_money] = useState(false);

  //
  const [tenant_name, settenant_name] = useState<string>('');
  const [phone, setphone] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [idcode, setidcode] = useState<string>('');
  const [card_front, setcard_front] = useState<ImageSelect>();
  const [back_of_card, setback_of_card] = useState<ImageSelect>();
  const [room_price, setroom_price] = useState<number>(0);
  const [deposit_price, setdeposit_price] = useState<number>(0);

  const [payment_period, setpayment_period] = useState<number>(0);
  const [note, setnote] = useState<string>('');
  const [idRoom, setidRoom] = useState<number>(0);

  const [contracts, setContracts] = useState<Createcontracts[]>([]);

  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            `https://qlphong-tro-production.up.railway.app/contracts/accounts/${authContext?.account?.id}`,
          ),
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/account/${authContext?.account?.id}`,
          ),
        ]);
        setContracts(responses[0].data);
        setrooms(responses[1].data);
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

  const handleCreateContract = async () => {
    let lst: {
      url: string;
      imageName: string;
    }[] = []; // Khởi tạo lst với một mảng rỗng
    const urlimage: ImageSelect[] = [
      {
        uri: card_front?.uri || '',
        width: card_front?.width || 0,
        height: card_front?.height || 0,
      },
      {
        uri: back_of_card?.uri || '',
        width: back_of_card?.width || 0,
        height: back_of_card?.height || 0,
      },
    ];
    lst = (await uploadImagesToFirebase(urlimage)) ?? [];
    const newContract: Createcontracts = {
      tenant_name: tenant_name,
      phone,
      email,
      idcode,
      card_front: lst[0].url || '',
      back_of_card: lst[1].url || '',
      start_date: startDate,
      end_date: endDate,
      startpay_money: startpay_money,
      payment_period,
      room_price,
      deposit_price,
      note,
      status: true,
      rooms: idRoom,
      accounts: authContext?.account?.id || 0,
    };
    try {
      const response = await axios.post(
        `https://qlphong-tro-production.up.railway.app/contracts/create`,
        newContract,
      );
      if (response) {
        showDialogSuccess('Tạo hóa đơn thành công');
      }
    } catch (error) {
      console.error('fetch api error');
    }
    console.log(newContract);
  };

  const handleImagePickerfont = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(image => {
        const selectedImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
        };
        setcard_front(selectedImage);
        console.log();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleImagePickerback = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(image => {
        const selectedImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
        };
        setback_of_card(selectedImage);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleIdSelected = (id: string) => {
    setidRoom(parseInt(id));
    const room = homeContext?.rooms.find(item => item.id === parseInt(id));
    setroom_price(room?.room_price || 0);
    setdeposit_price(room?.deposit_price || 0);
  };
  const handleIdSelected2 = (id: string) => {
    setpayment_period(parseInt(id));
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
              placeholder="Nhập tên người thuê"
              onChangeText={text => settenant_name(text)}></TextInput>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowonly}>
            <Icon1
              name="phone"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon1>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập điện thoại người thuê"
              keyboardType="numeric"
              onChangeText={text => setphone(text)}></TextInput>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowonly}>
            <Icon2
              name="email"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon2>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập Email"
              onChangeText={text => setemail(text)}></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Số CMND/CCCD</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon1
              name="idcard"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon1>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập CMND/CCCD"
              onChangeText={text => setidcode(text)}></TextInput>
          </TouchableOpacity>

          <View style={styles.rowcodeid}>
            <View>
              <Text>Mặt trước</Text>
              <TouchableOpacity
                style={styles.cmnd}
                onPress={handleImagePickerfont}>
                {card_front ? (
                  <View style={{width: '100%', height: '100%'}}>
                    <Image
                      style={{width: '100%', height: '100%', borderRadius: 15}}
                      source={{uri: card_front.uri}}></Image>
                  </View>
                ) : (
                  <Icon name="camera" color={Colors.primary} size={24}></Icon>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text>Mặt sau</Text>
              <TouchableOpacity
                style={styles.cmnd}
                onPress={handleImagePickerback}>
                {back_of_card ? (
                  <View
                    style={{width: '100%', height: '100%', borderRadius: 15}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={{uri: back_of_card.uri}}></Image>
                  </View>
                ) : (
                  <Icon name="camera" color={Colors.primary} size={24}></Icon>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Thông tin thuê</Text>
          <Text style={styles.title2}>Thông tin tòa nhà</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon3
              name="house"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon3>
            <View
              style={{
                width: '85%',
                height: '100%',
              }}>
              <DropdownComponent
                data={rooms}
                onIdSelected={handleIdSelected}></DropdownComponent>
            </View>
          </TouchableOpacity>
          <Text style={styles.title2}>Ngày bắt đầu</Text>
          <TouchableOpacity
            style={styles.rowonly}
            onPress={() => setShowStartDatePicker(true)}>
            <Icon
              name="calculator"
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
              name="calculator"
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
              name="money"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tiền phòng"
              keyboardType="numeric"
              onChangeText={text => setroom_price(parseInt(text))}>
              {room_price}
            </TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Tiền cọc</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="money"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tiền cọc"
              keyboardType="numeric"
              onChangeText={text => setdeposit_price(parseInt(text))}>
              {deposit_price}
            </TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Ngày bắt đầu thanh toán</Text>
          <TouchableOpacity
            style={styles.rowonly}
            onPress={() => setShowstartpay_money(true)}>
            <Icon
              name="calculator"
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
            <Icon3
              name="house"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon3>
            <View
              style={{
                width: '85%',
                height: '100%',
              }}>
              <DropdownComponent2
                onIdSelected={handleIdSelected2}></DropdownComponent2>
            </View>
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
              placeholder="Nhập ghi chú"
              onChangeText={text => setnote(text)}></TextInput>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleCreateContract}>
          <Text style={styles.txtbutton}> Tạo hợp đồng</Text>
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
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: Colors.white,
  },
  button: {
    height: '60%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  txtbutton: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
