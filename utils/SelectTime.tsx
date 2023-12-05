import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, FlatList, Platform } from "react-native";
import { Div, Button, Icon, Modal, ThemeProvider } from "react-native-magnus";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'https://omzpuglcywbksxszffun.supabase.co' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Title Test",
      body: 'Body Test',
    },
    trigger: { seconds: 5 },
  });
}

export default function SelectTime() {
  const [visible, setVisible] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Button w={40} h={40} bg="transparent" m={2} block onPress={() => setVisible(true)}>
          <Icon
            name="bell"
            fontFamily="Feather"
            fontSize={20}
            color="blue500"
            bg="blue200"
            borderColor="blue500"
            borderWidth={1}
            h={40}
            w={40}
            rounded="md"
          />
        </Button>

        <Modal isVisible={visible}>
          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            top={50}
            right={15}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon color="#a9a7ab" name="close" />
          </Button>

          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            top={50}
            right={75}
            rounded="circle"
            onPress={async () => {
              await schedulePushNotification();
            }}
          >
            <Icon color="#a9a7ab" name="close" />
          </Button>

        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}