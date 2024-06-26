import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {Account, RegisterAccount} from '../../assets/types/PropTypes';
import {showDialogBoxWarringText, showDialogSuccess} from './DetailService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
  }
};

const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  customer_name: string,
  avatar: string,
) => {
  try {
    const register: RegisterAccount = {
      username: email,
      password: password,
      customer_name: customer_name,
      phone_number: '',
      address: '',
      avatar: avatar,
      roleId: 1,
    };
    const responese = await axios.post(
      'https://qlphong-tro-production.up.railway.app/accounts/register',
      register,
    );
    await AsyncStorage.setItem('id', responese.data.account.id.toString());
    const responese2 = await axios.get(
      `https://qlphong-tro-production.up.railway.app/accounts/${responese.data.account.id}`,
    );
    if (responese2) {
      const acc: Account = {
        id: responese2.data.id,
        username: responese2.data.username,
        password: responese2.data.password,
        customer_name: responese2.data.customer_name,
        phone_number: '',
        address: '',
        avatar: responese2.data.avatar,
      };
      return acc;
    }
  } catch (error) {
    console.log('error');
  }
};

const checkIfUserExists = async (email: string) => {
  try {
    const response = await axios.post(
      `https://qlphong-tro-production.up.railway.app/accounts/check/${email}`,
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra tài khoản:', error);
    return false;
  }
};

// Login google
async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play Services
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    // Get user information
    const {displayName, email, photoURL} = userCredential.user;
    return {displayName, email, photoURL, idToken};
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
}

async function signOut() {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out: ', error);
  }
}

// validation
const validateInput = (input: string) => {
  if (!input.trim()) {
    return false;
  }
  const specialChars = /[!#$%^&*(),?":{}|<>]/;
  if (specialChars.test(input)) {
    return false;
  }
  return true;
};
const validateEmail = (input: string) => {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedInput)) {
    return false;
  }
  return true;
};

export {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  validateInput,
  validateEmail,
  onGoogleButtonPress,
  signOut,
};
