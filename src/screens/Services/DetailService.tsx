import axios from 'axios';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const API_BASE_URL = 'https://qlphong-tro-production.up.railway.app/favorites'; // Thay đổi thành URL API của bạn

// Hàm thêm yêu thích
const addFavorite = async (accountId: number, postId: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add/${accountId}/${postId}`,
    );
    return response.data; // Trả về dữ liệu của yêu thích được thêm mới
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error; // Ném lỗi để bắt ở nơi gọi hàm này
  }
};

// Hàm xóa yêu thích
const removeFavorite = async (accountId: number, postId: number) => {
  try {
    console.log('vào');
    await axios.post(`${API_BASE_URL}/remove/${accountId}/${postId}`);
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error; // Ném lỗi để bắt ở nơi gọi hàm này
  }
};

const showToastaddfavorites = () => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Thông báo',
    textBody: 'Thêm thành công vào yêu thích',
  });
};
const showToastremovefavorites = () => {
  Toast.show({
    type: ALERT_TYPE.INFO,
    title: 'Thông báo',
    textBody: 'Đã xóa ra khỏi danh sách yêu thích',
  });
};

const showDialogSuccess = (success: string) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Thông báo',
    textBody: success,
    button: 'close',
  });
};

const showDialogBoxErrorText = (error: string) => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Thông báo',
    textBody: error,
    button: 'close',
  });
};

const showDialogBoxWarringText = (error: string) => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Thông báo',
    textBody: error,
    button: 'close',
  });
};

const showDialogErrorLogin = (error: string) => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: 'Thông báo',
    textBody: error,
    button: 'close',
  });
};

// ko dung thu vien

const showDialogLogOut = (
  error: string,
  onYes: () => void,
  onNo: () => void,
) => {
  Alert.alert(
    'Thông báo',
    'Bạn có muốn đăng xuất tài khoản',
    [
      {
        text: 'No',
        onPress: onNo,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: onYes,
      },
    ],
    {cancelable: false},
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export {
  addFavorite,
  removeFavorite,
  showToastaddfavorites,
  showToastremovefavorites,
  showDialogBoxErrorText,
  showDialogSuccess,
  showDialogErrorLogin,
  showDialogBoxWarringText,
  showDialogLogOut,
};
