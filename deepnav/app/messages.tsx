import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useRouter } from 'expo-router';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
};

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  // Initialize Notifee and set up event listeners
  useEffect(() => {
    async function setupNotifee() {
      await notifee.requestPermission();
      
      // Listen for foreground notifications
      return notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS) {
          // Notification was pressed, you could navigate to a specific screen
          console.log('Notification pressed', detail.notification);
        }
      });
    }

    setupNotifee();

    // Clean up
    return () => {
      notifee.cancelAllNotifications();
    };
  }, []);

  // Simulate receiving a message from another user (in a real app, this would come from your backend)
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to receive a message
      if (Math.random() < 0.2) {
        receiveMessageFromOtherUser();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const receiveMessageFromOtherUser = async () => {
    const otherUserMessages = [
      "Hey there!",
      "How are you doing?",
      "Did you see the latest news?",
      "Let's meet up soon!",
      "What are your plans for today?"
    ];
    
    const randomMessage = otherUserMessages[Math.floor(Math.random() * otherUserMessages.length)];
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: randomMessage,
      sender: 'other',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    
    // Display notification
    await displayNotification(randomMessage);
  };

  const displayNotification = async (message: string) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'messages',
      name: 'Messages Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'New Message',
      body: message,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          onSubmitEditing={handleSendMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});