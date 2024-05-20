import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/Colors';
// import CardServiceItem from '../components/cardserviceitem';
import Icon5 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {
  Amenities,
  Furniture,
  ImageSelect,
  Room,
  ServiceItem,
  roomsid_name,
  CreatePosts,
} from '../assets/types/PropTypes';
import CardServiceEdit from '../components/CardServiceEdit';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import DropdownComponent from '../components/DropdownComponent ';
import {HomeContext} from '../contexts/HomeContext';
import {AuthContext} from '../contexts/AuthContext';
import {
  showDialogBoxErrorText,
  showDialogSuccess,
} from './Services/DetailService';

const {width, height} = Dimensions.get('window');

function CreatePost(): React.JSX.Element {
  const homeContext = useContext(HomeContext);
  const authContext = useContext(AuthContext);
  const [rooms, setrooms] = useState<roomsid_name[]>([]);
  const [roomsselected, setRoomsselected] = useState<Room>();
  const [selectedId, setSelectedId] = useState<string | undefined>('1');
  const [selectRoom, setSelectRoom] = useState<number>(0);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [amenities, setAmenities] = useState<Amenities[]>([]);
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  //id button
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [selectedButtons2, setSelectedButtons2] = useState<number[]>([]);
  const [urlimage, seturlimage] = useState<ImageSelect[]>([]);
  const [urlimage2, seturlimage2] = useState<string[]>([]);
  //textinput
  const [titlepost, setTitlepost] = useState<string>();
  const [name_room, setName_room] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [room_price, setRoom_price] = useState<string>('');
  const [deposit_price, setDeposit_price] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [area_width, setArea_width] = useState<string>('');
  const [area_height, setArea_height] = useState<string>('');
  const [phone_number, setPhone_number] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [number_of_people, setNumber_of_people] = useState<string>('');

  const [note, setNote] = useState<string>('');
  const [note_gender, setNote_gender] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [ward, setWard] = useState<string>('');
  const [park, setPark] = useState<string>('');
  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://qlphong-tro-production.up.railway.app/rooms/account/${authContext?.account?.id}`,
        );
        setrooms(response.data);
      } catch (error) {
        console.log('fetch error');
      }
    };
    fetchData();
  }, [urlimage]);

  const handleIdSelected = async (id: string) => {
    setSelectRoom(parseInt(id));
    try {
      const response = await Promise.all([
        axios.get(`https://qlphong-tro-production.up.railway.app/rooms/${id}`),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/services/${id}`,
        ),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/amenities/${id}`,
        ),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/furniture/${id}`,
        ),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/rooms/${id}/images`,
        ),
      ]);
      setServices(response[1].data);
      setAmenities(response[2].data);
      setFurnitures(response[3].data);
      seturlimage2(response[4].data);
      setRoomsselected(response[0].data);
    } catch (error) {
      console.log('fetch error');
    }
    console.log('id dc chọn là' + id);
  };

  const handleButtonPress = (buttonValue: number) => {
    if (selectedButtons.includes(buttonValue)) {
      setSelectedButtons(selectedButtons.filter(item => item !== buttonValue));
    } else {
      setSelectedButtons([...selectedButtons, buttonValue]);
    }
  };

  const handleButtonPress2 = (buttonValue: number) => {
    if (selectedButtons2.includes(buttonValue)) {
      setSelectedButtons2(
        selectedButtons2.filter(item => item !== buttonValue),
      );
    } else {
      setSelectedButtons2([...selectedButtons2, buttonValue]);
    }
  };

  const radioButtons: RadioButtonProps[] = useMemo(() => {
    if (homeContext?.types) {
      return homeContext.types.map((item, index) => ({
        id: item.id.toString(),
        label: item.type_name,
        value: item.id.toString(),
        size: 16,
        color: Colors.primary,
      }));
    } else {
      return [];
    }
  }, [homeContext?.types]);

  const handleSubmit = async () => {
    if (selectRoom <= 0) {
      showDialogBoxErrorText('Vui lòng chọn phòng');
      return;
    }
    if (!titlepost) {
      showDialogBoxErrorText('Vui lòng tiêu đề');
      return;
    }

    const post: CreatePosts = {
      title: titlepost,
      create_at: new Date(),
      status: true,
      posttype: 1,
      rooms: selectRoom,
      accounts: authContext?.account?.id || 0,
    };

    try {
      const response = await axios.post(
        `https://qlphong-tro-production.up.railway.app/posts/create`,
        post,
      );
      if (!response) {
        showDialogSuccess('Thêm post thành công');
      }
    } catch (error) {
      console.log('fetch data error');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Thông tin phòng */}

        <View style={styles.card}>
          <Text style={styles.title}>Thông tin bài đăng</Text>
          <View style={styles.box}>
            <Text style={styles.label}> Chọn tòa nhà/ Phòng</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/tenphong.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <View
                style={{
                  width: '85%',
                  height: '100%',
                }}>
                <DropdownComponent
                  data={rooms || []}
                  onIdSelected={handleIdSelected}></DropdownComponent>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Tiêu đề bài đăng</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/tieude.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập tiêu đề"
                onChangeText={text => setTitlepost(text)}></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.box}>
            <Text style={styles.label}> Địa chỉ</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/diachi.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput style={styles.input} placeholder="Nhập địa chỉ">
                {roomsselected?.address}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Giá phòng</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/giaphong.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="nhập giá phòng"
                keyboardType="numeric">
                {roomsselected?.room_price}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Tiền cọc</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/giaphong.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập tiền cọc"
                keyboardType="numeric">
                {roomsselected?.deposit_price}
              </TextInput>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Thông tin dịch vụ</Text>

          <View style={styles.container2}>
            {services.map((item, index) => (
              <CardServiceEdit key={index} services={item} />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Thông tin bài đăng</Text>
          <Text
            style={{color: Colors.silver1, marginLeft: 10, marginBottom: 10}}>
            Loại phòng
          </Text>
          <View style={styles.container2}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
            />
          </View>
          <View style={styles.rowonly}>
            <TouchableOpacity style={styles.camera} activeOpacity={0.7}>
              <Icon5 name="camerao" size={25} color={Colors.primary}></Icon5>
            </TouchableOpacity>
            <View style={{padding: 10, marginTop: height * 0.06}}>
              {urlimage2.length > 0 ? (
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {urlimage2.map((item, index) => (
                      <Image
                        key={index}
                        source={{uri: item}}
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 10,
                          borderRadius: 10,
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View>
                  <Text>Chọn dưới 10 tấm</Text>
                </View>
              )}
            </View>
          </View>

          <View style={[styles.box, {marginTop: 20}]}>
            <Text style={[styles.label]}> Giới tính </Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/gioitinh.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput style={styles.input} placeholder="Nhập giới tính">
                {roomsselected?.note_gender}
              </TextInput>
            </View>
          </View>

          <View style={[styles.box, {marginTop: 20}]}>
            <Text style={[styles.label]}> Chiều dài (m) </Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/dientich.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập chiều dài"
                keyboardType="numeric">
                {roomsselected?.area_height}
              </TextInput>
            </View>
          </View>

          <View style={[styles.box, {marginTop: 20}]}>
            <Text style={[styles.label]}> Chiều rộng (m) </Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/dientich.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput style={styles.input} placeholder="Nhập chiều động">
                {roomsselected?.area_width}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Số điện thoại</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/sodienthoai.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thử"
                keyboardType="numeric">
                {roomsselected?.phone_number}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Tầng</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/tang.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập tầng"
                keyboardType="numeric">
                {roomsselected?.floor}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Sức chứa </Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/suchua.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập sức chứa"
                keyboardType="numeric">
                {roomsselected?.number_of_people}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Mô tả</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/mota.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput style={styles.input} placeholder="Mô tả"></TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Số chỗ để xe</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/bike.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập số chỗ để xe"
                keyboardType="numeric"></TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Tỉnh/thành</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/province.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập tỉnh thành"
                onChangeText={text => setProvince(text)}>
                {roomsselected?.province}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Quận/huyện</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/district.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập quận huyện"
                onChangeText={text => setDistrict(text)}>
                {roomsselected?.district}
              </TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>Phường</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/ward.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập phường"
                onChangeText={text => setWard(text)}>
                {roomsselected?.ward}
              </TextInput>
            </View>
          </View>

          <View style={[styles.rowonly, {marginTop: 15}]}>
            <Image
              source={require('../assets/images/icon/auction.png')}
              style={[styles.icon, {width: 24, height: 24}]}
              resizeMode="contain"></Image>
            <Text style={{fontWeight: 'bold'}}> Tiện nghi</Text>
          </View>

          <View style={styles.container3}>
            {amenities.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedButtons.includes(item.id) && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress(item.id)}>
                <Image
                  source={require('../assets/images/icon/Add.png')}
                  style={{width: 24, height: 24}}></Image>
                <Text>{item.amenity_name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.rowonly, {marginTop: 15}]}>
            <Image
              source={require('../assets/images/icon/furniture.png')}
              style={[styles.icon, {width: 24, height: 24}]}
              resizeMode="contain"></Image>
            <Text style={{fontWeight: 'bold'}}> Nội thất</Text>
          </View>

          <View style={styles.container3}>
            {furnitures.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedButtons2.includes(item.id) && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress2(item.id)}>
                <Image
                  source={require('../assets/images/icon/Add.png')}
                  style={{width: 24, height: 24}}></Image>
                <Text>{item.furniture_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.cardbottom}>
          <TouchableOpacity style={styles.buttonsave} onPress={handleSubmit}>
            <Text style={styles.txt}>Đăng bài</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver2,
  },
  box: {
    width: '100%',
    marginBottom: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 17,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowonly: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    height: height * 0.06,
    borderBottomWidth: 0.2,
    width: '80%',
  },
  scroll: {},
  card: {
    width: width,
    marginBottom: 5,
    backgroundColor: Colors.white,
  },
  item: {
    width: '33%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  container2: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container3: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeroom: {
    borderWidth: 1,
    width: '30%',
    height: 30,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    marginTop: height * 0.05,
    width: width * 0.3,
    height: height * 0.15,
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  convenientcard: {
    width: '40%',
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: Colors.silver2,
  },
  // thiet lap
  button: {
    marginLeft: 10,
    width: width * 0.45,
    height: height * 0.05,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.silver,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedButton: {
    // Màu của nút khi được chọn
    borderColor: Colors.primary,
  },
  cardbottom: {
    width: width,
    height: height * 0.1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsave: {
    width: width * 0.8,
    height: '50%',
    borderRadius: 10,
    backgroundColor: Colors.red2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
