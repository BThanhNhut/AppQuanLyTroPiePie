import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  ColorValue,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/AntDesign';
// Component
import Cardaccount from '../components/CardAccount';
import BottomDetail from '../components/BottomDetail';
import {
  AmenitiesItem,
  CardServiceItemProps,
  FurnitureItem,
  Posts,
  ServiceItem,
} from '../assets/types/PropTypes';
import CardServiceItem from '../components/CardServiceItem';
import axios from 'axios';
import {
  addFavorite,
  removeFavorite,
  showToastaddfavorites,
  showToastremovefavorites,
} from './Services/DetailService';
import {styles} from './styles/DetailStyles';
import {AuthContext} from '../contexts/AuthContext';
const {width} = Dimensions.get('window');

let orange = '#FF7613';

type DetailsScreenProps = {
  route: any;
  navigation: any;
};

function formatCurrency(amount: any) {
  if (typeof amount === 'undefined' || amount === null) {
    return '';
  }
  return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

function DetailScreen({
  route,
  navigation,
}: DetailsScreenProps): React.JSX.Element {
  const [iconColor, setIconColor] = useState<ColorValue>('#888888');
  const [dataRoom, setdataRoom] = useState<Posts>();
  const [mainImage, setmainImage] = useState<string>();
  const [serviceItem, setserviceItem] = useState<ServiceItem[]>([]);
  const [amenitiesItem, setamenitiesItem] = useState<AmenitiesItem[]>([]);
  const [furnituresItem, setfurnituresItem] = useState<FurnitureItem[]>([]);
  const [listImage, setlistImage] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const {id_post} = route.params;
  let id_account = authContext?.account?.id;

  const handleIconPress = () => {
    const newColor = iconColor === '#888888' ? '#FF0000' : '#888888';
    if (iconColor === '#888888') {
      addFavorite(1, id_post);
      showToastaddfavorites();
      setIconColor(newColor);
    } else {
      showToastremovefavorites();
      removeFavorite(1, id_post);
      setIconColor(newColor);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            `https://qlphong-tro-production.up.railway.app/posts/${id_post}`,
          ),
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/${id_post}/images`,
          ),
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/${id_post}/amenities`,
          ),
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/${id_post}/furniture`,
          ),
          axios.get(
            `https://qlphong-tro-production.up.railway.app/rooms/${id_account}/${id_post}/favorites`,
          ),
        ]);
        // Lưu trữ dữ liệu từ các API vào state
        setdataRoom(responses[0].data);
        setmainImage(dataRoom?.rooms.image || '');
        setlistImage(responses[1].data);
        setamenitiesItem(responses[2].data);
        setfurnituresItem(responses[3].data);
        const apiResponse = responses[4].data;
        const newIconColor = apiResponse ? '#FF0000' : '#888888';
        try {
          const responses1 = await axios.get(
            `https://qlphong-tro-production.up.railway.app/services/${dataRoom?.rooms.id}`,
          );
          setserviceItem(responses1.data);
        } catch (error) {
          console.log('error');
        }
        setIconColor(newIconColor);
        // Đánh dấu đã kết thúc load dữ liệu
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id_post, isLoading]);

  const handleChangeImage = useCallback((image: string) => {
    setmainImage(image);
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#FF7613" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: mainImage
                    ? mainImage
                    : 'https://static.thenounproject.com/png/4653780-200.png',
                }}
                style={styles.imgmain}
                resizeMode="cover"></Image>
              <View style={styles.borderscroll}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={styles.borderimg}
                    onPress={() =>
                      handleChangeImage(dataRoom?.rooms.image || '')
                    }>
                    <Image
                      source={{
                        uri:
                          dataRoom?.rooms.image ||
                          'https://static.thenounproject.com/png/4653780-200.png',
                      }}
                      style={styles.imgsuport}></Image>
                  </TouchableOpacity>
                  {listImage.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.borderimg}
                      onPress={() => handleChangeImage(item)}>
                      <Image
                        source={{
                          uri:
                            item ||
                            'https://static.thenounproject.com/png/4653780-200.png',
                        }}
                        style={styles.imgsuport}
                        resizeMode="cover"></Image>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {/* Phần thông tin */}
              <View style={styles.infotitle}>
                <View style={styles.row}>
                  <Text style={{color: '#808080', fontSize: 12}}>
                    {dataRoom?.rooms.types.type_name}
                  </Text>
                  <Icon
                    name="transgender"
                    style={{marginLeft: 5}}
                    size={15}></Icon>
                  <Text style={{marginLeft: 2}}>
                    {dataRoom?.rooms.note_gender}
                  </Text>
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  {dataRoom?.title}
                </Text>
                <View style={styles.row}>
                  <Text style={{color: '#FF7613', fontWeight: 'bold'}}>
                    {formatCurrency(dataRoom?.rooms.room_price)}/Tháng
                  </Text>
                  <Icon4
                    name="heart-circle"
                    style={{marginLeft: width * 0.45}}
                    size={32}
                    color={iconColor}
                    onPress={handleIconPress}></Icon4>
                </View>
              </View>
              {/* Phần địa chỉ */}
              <View style={styles.infoaddress}>
                <View style={styles.row}>
                  <Icon2 name="place" size={20} color={orange}></Icon2>
                  <Text style={styles.txt}>{dataRoom?.rooms.address}</Text>
                </View>
                <View style={styles.row}>
                  <Icon2 name="place" size={20} color={orange}></Icon2>
                  <Text style={styles.txt}>{dataRoom?.rooms.ward}</Text>
                </View>
                <View style={styles.row}>
                  <Icon2 name="place" size={20} color={orange}></Icon2>
                  <Text style={styles.txt}>
                    {dataRoom?.rooms.district} - {dataRoom?.rooms.province}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Icon2 name="phone-android" size={20} color={orange}></Icon2>
                  <Text style={styles.txt}>{dataRoom?.rooms.phone_number}</Text>
                </View>
              </View>
              {/* Phần thông tin */}
              <View style={styles.inforoom}>
                <View style={styles.column}>
                  <Text style={styles.infotxt}>Tầng</Text>
                  <Text style={styles.info2}>{dataRoom?.rooms.floor}</Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.infotxt}>Diện tích</Text>
                  <Text style={styles.info2}>
                    {dataRoom?.rooms.area_width} x {dataRoom?.rooms.area_height}
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.infotxt}>Đặt cọc</Text>
                  <Text style={styles.info2}>
                    {formatCurrency(dataRoom?.rooms.deposit_price)}
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.infotxt}>Số người</Text>
                  <Text style={styles.info2}>
                    {dataRoom?.rooms.number_of_people}
                  </Text>
                </View>
              </View>
              {/* Phần dịch vụ */}
              <View style={styles.service}>
                <View style={styles.row}>
                  <Icon5
                    name="customerservice"
                    size={25}
                    color={orange}></Icon5>
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    PHÍ DỊCH VỤ
                  </Text>
                </View>
                <View style={styles.servicedetail}>
                  {serviceItem.map(item => (
                    <CardServiceItem
                      key={item.id}
                      id={item.id}
                      services={item}
                    />
                  ))}
                </View>
              </View>
              {/* Phần chi tiết */}
              <View style={styles.detail}>
                <View style={styles.row}>
                  <Icon name="newspaper-o" size={25} color={orange}></Icon>
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    CHI TIẾT
                  </Text>
                </View>
                <Text style={{marginLeft: 5}}>{dataRoom?.rooms.note}</Text>
              </View>
              {/* Phần tiện nghi */}
              <Cardaccount
                name={dataRoom?.accounts.customer_name || ''}
                avatar={
                  dataRoom?.accounts.avatar ||
                  'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                }
                navigation={navigation}></Cardaccount>
              {/* Phần tiện nghi */}
              <View style={styles.amenitie}>
                <View style={styles.row}>
                  <Icon2
                    name="electrical-services"
                    size={25}
                    color={orange}></Icon2>
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    TIỆN NGHI
                  </Text>
                </View>
                <View style={styles.servicedetail}>
                  {amenitiesItem.map((item, index) => (
                    <View style={styles.cardamenities} key={index}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          style={{width: 24, height: 24}}
                          resizeMode="contain"
                          source={{uri: item.amenities.icon}}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}>
                          {item.amenities.amenity_name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              {/* Phần nội thất */}
              <View style={styles.furniture}>
                <View style={styles.row}>
                  <Icon2
                    name="home-repair-service"
                    size={25}
                    color={orange}></Icon2>
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    NỘI THÁT
                  </Text>
                </View>
                <View style={styles.servicedetail}>
                  {furnituresItem.map((item, index) => (
                    <View style={styles.cardamenities} key={index}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          style={{width: 24, height: 24}}
                          resizeMode="contain"
                          source={{uri: item.furniture.icon}}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}>
                          {item.furniture.furniture_name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View>
            <BottomDetail
              id_account_post={dataRoom?.accounts.id || 0}
              id_account={authContext?.account?.id || 0}
              navigation={navigation}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default DetailScreen;
