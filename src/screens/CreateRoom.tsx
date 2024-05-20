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
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  CreateAmenitiesDetails,
  CreateManyImage,
  ImageSelect,
  ImageSelect2,
  Roomadd,
  Types,
} from '../assets/types/PropTypes';
import CardServiceEdit from '../components/CardServiceEdit';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImagesToFirebase} from './Services/CreateRoomService';
import {
  showDialogBoxErrorText,
  showDialogSuccess,
} from './Services/DetailService';
import {HomeContext} from '../contexts/HomeContext';
import {AuthContext} from '../contexts/AuthContext';

const {width, height} = Dimensions.get('window');

function CreateRoom() {
  const homeContext = useContext(HomeContext);
  const authContext = useContext(AuthContext);

  const [selectedId, setSelectedId] = useState<string>('1');
  //id button
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]); // tiện ích
  const [selectedButtons2, setSelectedButtons2] = useState<number[]>([]);
  //Hình
  const [urlimage, seturlimage] = useState<ImageSelect[]>([]);
  const [lstfirebase, setLstfirebase] = useState<ImageSelect2[]>([]);
  //textinput
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

  useEffect(() => {}, []);

  console.log(selectedButtons);
  console.log(selectedButtons2);

  const handleSubmit = async () => {
    if (
      !name_room ||
      !address ||
      !room_price ||
      !deposit_price ||
      !note_gender ||
      !area_height ||
      !area_width ||
      !phone_number ||
      !floor ||
      !number_of_people ||
      !note ||
      !park ||
      !province ||
      !district ||
      !ward
    ) {
      showDialogBoxErrorText('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (
      specialCharactersRegex.test(name_room) ||
      specialCharactersRegex.test(address) ||
      specialCharactersRegex.test(note_gender) ||
      specialCharactersRegex.test(note) ||
      specialCharactersRegex.test(province) ||
      specialCharactersRegex.test(district) ||
      specialCharactersRegex.test(ward)
    ) {
      showDialogBoxErrorText('Vui lòng không sử dụng ký tự đặc biệt');
      return;
    }
    if (
      name_room.length > 50 ||
      address.length > 50 ||
      note_gender.length > 50 ||
      note.length > 50 ||
      phone_number.length > 15 ||
      province.length > 50 ||
      district.length > 50 ||
      ward.length > 50
    ) {
      showDialogBoxErrorText(
        'Vui lòng không nhập quá 50 ký tự và sdt ko quá 12 ký tự',
      );
      return;
    }
    if (urlimage.length <= 0) {
      showDialogBoxErrorText('Vui lòng ít nhất chọn 1 hình ảnh');
    }
    if (urlimage.length > 4) {
      showDialogBoxErrorText('Vui lòng không được quá 4 tầm hình');
    }
    let lst: {
      url: string;
      imageName: string;
    }[] = []; // Khởi tạo lst với một mảng rỗng
    lst = (await uploadImagesToFirebase(urlimage)) ?? [];
    setLstfirebase(lst);

    const room: Roomadd = {
      name_room: name_room,
      address: address,
      room_price: parseInt(room_price),
      deposit_price: parseInt(deposit_price),
      image: lst[0].url,
      area_width: parseInt(area_width),
      area_height: parseInt(area_height),
      phone_number: phone_number,
      floor: parseInt(area_height),
      number_of_people: parseInt(number_of_people),
      note: note,
      note_gender: note_gender,
      province: province,
      district: district,
      ward: ward,
      types: parseInt(selectedId) || 0,
      accounts: authContext?.account?.id || 0,
    };
    try {
      const response = await axios.post(
        'https://qlphong-tro-production.up.railway.app/rooms/add',
        room,
      );
      if (response && response.data) {
        showDialogSuccess(
          `Phòng ${name_room} đã được thêm vào danh sách phòng`,
        );
        console.log(response.data);
        const roomId = response.data.id;
        console.log('id la', roomId);

        const createamenitiesdetails: CreateAmenitiesDetails = {
          numbers: selectedButtons,
          id_room: roomId,
        };
        const createfurnituredetails: CreateAmenitiesDetails = {
          numbers: selectedButtons2,
          id_room: roomId,
        };

        const createimage: CreateManyImage = {
          urls: lstfirebase,
          id_rooms: roomId,
        };

        const response2 = await Promise.all([
          axios.post(
            `https://qlphong-tro-production.up.railway.app/amenitiesdetails/add`,
            createamenitiesdetails,
          ),
          axios.post(
            `https://qlphong-tro-production.up.railway.app/furnituredetails/add`,
            createfurnituredetails,
          ),
          axios.post(
            `https://qlphong-tro-production.up.railway.app/images/add`,
            createimage,
          ),
        ]);
        console.log('Hình upload', response2[2].data);
      }
    } catch (error) {
      console.log('fetch error ', error);
    }
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
      // Nếu nút chưa được chọn trước đó, thêm vào mảng selectedButtons
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

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      maxFiles: 4,
    })
      .then(async images => {
        const selectedImages = images.map(image => ({
          uri: image.path,
          width: image.width,
          height: image.height,
        }));
        seturlimage(selectedImages);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Thông tin phòng */}
        <View style={styles.card}>
          <Text style={styles.title}>Thông tin phòng</Text>

          <View style={styles.box}>
            <Text style={styles.label}> Số/Tên phòng</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/tenphong.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập số/ tên phòng"
                onChangeText={text => setName_room(text)}></TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Địa chỉ</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/diachi.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ"
                onChangeText={text => setAddress(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setRoom_price(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setDeposit_price(text)}></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width,
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Thông tin dịch vụ</Text>
            <TouchableOpacity>
              <Icon color={Colors.primary} size={24} name="add"></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            {homeContext?.services.map((item, index) => (
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
            <TouchableOpacity
              style={styles.camera}
              activeOpacity={0.7}
              onPress={handleImagePicker}>
              <Icon5 name="camerao" size={25} color={Colors.primary}></Icon5>
            </TouchableOpacity>
            <View style={{padding: 10, marginTop: height * 0.04}}>
              {urlimage.length > 0 ? (
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {urlimage.map((item, index) => (
                      <Image
                        key={index}
                        source={{uri: item.uri}}
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
              <TextInput
                style={styles.input}
                placeholder="Nhập giới tính"
                onChangeText={text => setNote_gender(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setArea_height(text)}></TextInput>
            </View>
          </View>

          <View style={[styles.box, {marginTop: 20}]}>
            <Text style={[styles.label]}> Chiều rộng (m) </Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/dientich.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Nhập chiều rộng"
                keyboardType="numeric"
                onChangeText={text => setArea_width(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setPhone_number(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setFloor(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setNumber_of_people(text)}></TextInput>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}> Mô tả</Text>
            <View style={styles.row}>
              <Image
                source={require('../assets/images/icon/mota.png')}
                style={styles.icon}
                resizeMode="contain"></Image>
              <TextInput
                style={styles.input}
                placeholder="Mô tả"
                onChangeText={text => setNote(text)}></TextInput>
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
                keyboardType="numeric"
                onChangeText={text => setPark(text)}></TextInput>
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
                onChangeText={text => setProvince(text)}></TextInput>
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
                onChangeText={text => setDistrict(text)}></TextInput>
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
                onChangeText={text => setWard(text)}></TextInput>
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
            {homeContext?.amenities.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedButtons.includes(item.id) && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress(item.id)}>
                <Image
                  source={{uri: item.icon}}
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
            {homeContext?.furnitures.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedButtons2.includes(item.id) && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress2(item.id)}>
                <Image
                  source={{uri: item.icon}}
                  style={{width: 24, height: 24}}></Image>
                <Text>{item.furniture_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.cardbottom}>
          <TouchableOpacity style={styles.buttonsave} onPress={handleSubmit}>
            <Text style={styles.txt}>Tao phòng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default CreateRoom;

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
    marginBottom: 10,
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
