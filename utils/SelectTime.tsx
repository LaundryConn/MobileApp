import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, FlatList, Platform, Alert } from "react-native";
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

async function schedulePushNotificationTest() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Title Test",
      body: 'Body Test',
    },
    trigger: { seconds: 2 },
  });
}

async function MachineReserve() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Title Test 2",
      body: 'Placeholder for Reserving',
    },
    trigger: { seconds: 2 },
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
        <Button w={40} h={40} m={0} block onPress={() => setVisible(true)}>
          <Icon
            name="bell"
            fontFamily="Feather"
            fontSize={20}
            color="red500"
            bg="red200"
            borderColor="red500"
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
            bg="blue400"
            h={35}
            w={35}
            position="absolute"
            top={50}
            right={75}
            rounded="circle"
            onPress={async () => {
              await schedulePushNotificationTest();
            }}
          >
            <Icon color="#a9a7ab" name="notification" />
          </Button>

          <Button
            bg="gray400"
            h={50}
            w={225}
            position="absolute"
            top={450}
            right={95}
            onPress={async () => {
              setVisible(false);
              await MachineReserve();
            }}
          >
            <Icon color="#a9a7ab" name="clockcircle" />
          </Button>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}