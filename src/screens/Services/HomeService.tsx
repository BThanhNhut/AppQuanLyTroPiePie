import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Notification} from '../../assets/types/PropTypes';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const getToken = async () => {
  const token = await messaging().getToken();
  console.log('token là', token);
};

const saveNotification = async (notification: Notification): Promise<void> => {
  try {
    const currentNotifications = await AsyncStorage.getItem('notifications');
    let notifications: Notification[] = [];
    if (currentNotifications !== null) {
      notifications = JSON.parse(currentNotifications);
    }
    notifications.push(notification);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notification.', e);
  }
};

// Xử lý khi token bị làm mới
const handleTokenRefresh = async (): Promise<void> => {
  messaging().onTokenRefresh(async newToken => {
    console.log('Token FCM được làm mới:', newToken);
    await AsyncStorage.setItem('fcmToken', newToken);
  });
};

const initializeFCM = async (): Promise<void> => {
  await requestUserPermission();
  handleTokenRefresh();

  // Xử lý thông báo trong foreground
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    await saveNotification(remoteMessage as Notification);
  });

  // Xử lý thông báo khi ứng dụng đang chạy nền hoặc bị đóng
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    await saveNotification(remoteMessage as Notification);
  });
};

export {requestUserPermission, getToken, initializeFCM, saveNotification};
