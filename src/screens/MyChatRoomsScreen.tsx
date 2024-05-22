import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {HomeContext} from '../contexts/HomeContext';
import {AuthContext} from '../contexts/AuthContext';
import {styles} from './styles/MyChatRoomsScreenStyle';
// interface User {
//   userId: string;
//   userName: string;
//   userImage: string;
// }

interface ChatRoom {
  id: string;
  members: string[];
  messages: any[];
  customer_name: string;
  avatar: string;
}

const MyChatRoomsScreen = ({navigation}: {navigation: any}) => {
  const authContext = useContext(AuthContext);
  const homeContext = useContext(HomeContext);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true); // Biến cờ cho trạng thái đang tải dữ liệu

  useEffect(() => {
    const currentUser = authContext?.account; //auth().currentUser;
    if (currentUser) {
      const userId = authContext.account?.id.toString(); //currentUser.uid;
      const unsubscribe = firestore()
        .collection('conversations')
        .where('members', 'array-contains', userId)
        .onSnapshot(
          querySnapshot => {
            const rooms: ChatRoom[] = [];
            querySnapshot.forEach(async doc => {
              const data = doc.data();
              const members: string[] = data.members;
              const targetMember =
                members.find(member => member !== userId) || '0';
              const TargetUser = homeContext?.accounts.find(
                account => account.id === parseInt(targetMember),
              );
              rooms.push({
                id: doc.id,
                members,
                messages: data.messages,
                customer_name: TargetUser?.customer_name || '',
                avatar: TargetUser?.avatar || '',
              });
            });
            setChatRooms(rooms);
            setLoading(false);
          },
          err => {
            console.error('Error loading chat rooms:', err);
          },
        );

      return () => unsubscribe();
    }
  }, []);

  const navigateToChatRoom = (
    roomId: string,
    avatar: string,
    customer_name: string,
  ) => {
    navigation.navigate('ChatScreen', {
      roomId: roomId,
      avatar: avatar,
      customer_name: customer_name,
    });
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={chatRooms}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigateToChatRoom(item.id, item.avatar, item.customer_name)
            }>
            <Image
              style={{width: 50, height: 50, borderRadius: 50}}
              source={{uri: item.avatar}}></Image>
            <View style={{padding: 10, borderColor: '#ccc'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {item.customer_name}
              </Text>
              <Text>Chat ID: {item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MyChatRoomsScreen;
