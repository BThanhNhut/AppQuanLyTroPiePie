import React, {useContext} from 'react';
import {View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {HomeContext, HomeContextType} from '../../contexts/HomeContext';

const createChat = async (
  id_user1: string,
  id_user2: string,
  homeContext: HomeContextType,
  navigation: any,
) => {
  try {
    const currentUser = auth().currentUser;
    // Kiểm tra xem người dùng đã đăng nhập chưa
    // if (!currentUser) {
    //   console.log('User is not logged in.');
    //   return;

    const existingConversationId = await checkIfConversationExists(
      id_user1,
      id_user2,
    );
    if (existingConversationId) {
      console.log('Conversation already exists:', existingConversationId);
      // Điều hướng đến cuộc trò chuyện hiện có
      const TargetUser = homeContext?.accounts.find(
        account => account.id === parseInt(id_user2),
      );
      navigation.navigate('ChatScreen', {
        roomId: existingConversationId,
        avatar: TargetUser?.avatar,
        customer_name: TargetUser?.customer_name,
      });
      return;
    }

    // ID của người dùng hiện tại
    const currentUserId = id_user1; //currentUser.uid;
    // ID của người dùng mục tiêu (để tạo cuộc trò chuyện)
    const targetUserId = id_user2; // Thay TARGET_USER_ID bằng ID của người dùng mà bạn muốn bắt đầu cuộc trò chuyện với
    // Tạo một cuộc trò chuyện mới giữa hai người dùng

    const TargetUser = homeContext?.accounts.find(
      account => account.id === parseInt(id_user2),
    );
    const conversationRef = firestore().collection('conversations').doc();
    const conversationId = conversationRef.id;
    await conversationRef.set({
      members: [
        currentUserId,
        targetUserId,
        // {userId: currentUserId, userName: 'nhut', userImage: 'Hinh1'},
        // {userId: targetUserId, userName: 'PAnh', userImage: 'HInh2'},
      ],
      messages: [],
    });
    navigation.navigate('ChatScreen', {
      roomId: conversationId,
      avatar: TargetUser?.avatar,
      customer_name: TargetUser?.customer_name,
    });
    console.log('Conversation created successfully:', conversationId);
  } catch (error) {
    console.error('Error creating conversation:', error);
  }
};

const checkIfConversationExists = async (
  id_user1: string,
  id_user2: string,
) => {
  try {
    const conversationSnapshot = await firestore()
      .collection('conversations')
      .where('members', 'array-contains-any', [id_user1, id_user2])
      .get();

    // Kiểm tra xem có cuộc trò chuyện nào chứa cả hai người dùng không
    for (const doc of conversationSnapshot.docs) {
      const members = doc.data().members;
      if (members.includes(id_user1) && members.includes(id_user2)) {
        return doc.id;
      }
    }
    return null;
  } catch (error) {
    console.error('Error checking conversation existence:', error);
    return null;
  }
};

export {createChat};
