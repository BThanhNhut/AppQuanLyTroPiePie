import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Notification} from '../assets/types/PropTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../assets/Colors';

export default function NotifacationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications !== null) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (e) {
        console.error('Failed to fetch notifications.', e);
      }
    };
    fetchNotifications();
  }, []);

  const renderItem: ListRenderItem<Notification> = ({item}) => (
    <TouchableOpacity style={styles.notificationContainer}>
      <Icon
        name="exclamation"
        size={24}
        color={Colors.primary}
        style={{marginRight: 10}}></Icon>
      <View>
        <Text style={styles.title}>{item.notification?.title}</Text>
        <Text style={styles.message}>{item.notification?.body}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  img: {
    width: 100,
    height: 100,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});
