import React, {useState, useEffect, useContext} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../contexts/AuthContext';
import {Color} from 'react-native-alert-notification/lib/typescript/service';

type DetailsScreenProps = {
  route: any; // Adjust the type as per your route prop type
  navigation: any; // Adjust the type as per your navigation prop type
};

function ChatScreen({route, navigation}: DetailsScreenProps) {
  const authContext = useContext(AuthContext);
  const {roomId} = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('conversations')
      .doc(roomId)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        if (data) {
          const formattedMessages = data.messages.map((msg: any) => {
            const createdAt = msg.createdAt.toDate
              ? msg.createdAt.toDate()
              : new Date(msg.createdAt);
            return {
              _id: msg._id,
              text: msg.text,
              createdAt,
              user: {
                _id: msg.user._id,
                name: msg.user.name,
                avatar: msg.user.avatar,
              },
            };
          });
          // Sort messages by createdAt in descending order
          formattedMessages.sort(
            (a: IMessage, b: IMessage) =>
              (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime(),
          );
          setMessages(formattedMessages);
        }
      });

    return () => unsubscribe();
  }, [roomId]);

  const onSend = async (newMessages: IMessage[]) => {
    const formattedNewMessages = newMessages.map(msg => ({
      _id: msg._id,
      text: msg.text,
      createdAt: firestore.Timestamp.fromDate(new Date(msg.createdAt)),
      user: {
        _id: msg.user._id,
        name: msg.user.name,
        avatar: msg.user.avatar,
      },
    }));

    // Update Firestore with the new messages
    await firestore()
      .collection('conversations')
      .doc(roomId)
      .update({
        messages: firestore.FieldValue.arrayUnion(...formattedNewMessages),
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: authContext?.account?.id || '',
          name: authContext?.account?.customer_name,
          avatar: authContext?.account?.avatar,
        }}
      />
    </View>
  );
}

export default ChatScreen;
