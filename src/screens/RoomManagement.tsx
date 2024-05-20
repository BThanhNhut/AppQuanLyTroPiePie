import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import axios from 'axios';
import {Posts, Room, Roomadd} from '../assets/types/PropTypes'; // Kiểu dữ liệu của posts
import {Colors} from '../assets/Colors';
import CardRoom from '../components/CardRoom';

const RoomManagement = ({navigation}: any): React.JSX.Element => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [rooms, setRooms] = useState<Roomadd[]>([]);
  const id_account = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get(
          `https://qlphong-tro-production.up.railway.app/rooms/account/${id_account}`,
        ),
      ]);
      setRooms(responses[0].data);
      console.log(rooms);
    } catch (error) {
      console.log('fetch data error', error);
    }
  };

  const renderScene = SceneMap({
    first: () => <FirstRoute data={rooms} />,
    second: () => <SecondRoute data={rooms} />,
    third: () => <SecondRoute data={rooms} />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.white}}
      style={{backgroundColor: Colors.primary}}
      activeColor={Colors.white}
      inactiveColor={Colors.white}
    />
  );

  const gotoCreateRoom = () => {
    console.log('Lọc theo điều kiện');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.search}>
          <Image
            source={require('../assets/images/icon/search.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <TextInput style={styles.txt} placeholder="Tìm kiếm" />
        </View>
        <TouchableOpacity
          style={{width: 32, height: 32, marginRight: 10}}
          activeOpacity={0.8}
          onPress={gotoCreateRoom}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/images/icon/calender.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TabView
          navigationState={{
            index,
            routes: [
              {key: 'first', title: `Chưa cho thuê`},
              {key: 'second', title: `Đang cho thuê`},
              {key: 'third', title: `Bản nháp`},
            ],
          }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const FirstRoute = ({data}: {data: Roomadd[]}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      {data &&
        data.map((post, index) => (
          <CardRoom key={index} item={post}></CardRoom>
        ))}
    </ScrollView>
  </View>
);

const SecondRoute = ({data}: {data: Roomadd[]}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      {data &&
        data.map((post, index) => (
          <CardRoom key={index} item={post}></CardRoom>
        ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  search: {
    margin: 20,
    width: '80%',
    height: '45%',
    backgroundColor: Colors.silver2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  img: {
    marginLeft: 10,
    marginRight: 10,
    width: 24,
    height: 24,
  },
  txt: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
});

export default RoomManagement;
