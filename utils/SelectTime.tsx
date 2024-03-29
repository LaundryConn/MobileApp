import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, FlatList, Platform } from "react-native";
import {
  Div,
  Button,
  Icon,
  Modal,
  ThemeProvider,
  Input,
} from "react-native-magnus";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { supabase } from "../supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "https://omzpuglcywbksxszffun.supabase.co",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

async function schedulePushNotification(minutes: string, machineName: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Timer Update",
      body: "Your timer set for " + machineName + " is up!",
    },
    trigger: { seconds: Number(minutes) * 60 },
  });
}

export default function SelectTime({selectedMachine, myUUID}: {selectedMachine: any, myUUID: string}) {
  const [visible, setVisible] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [iconcolor, setIconcolor] = useState({1: "gray500", 2: "gray200"})
  const [trigger, setTrigger] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();

  // Change the color of the Icon on homepage
  // Will also allow report option to be triggered if selectedMachine is True 
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (selectedMachine.name !== ""){
      setIconcolor({1: "blue500", 2: "blue200"})
      setTrigger(true)
    }
    else{
      setIconcolor({1: "gray500", 2: "gray200"})
      setTrigger(false)
    }
  }, [selectedMachine])

  const [reminderMinutes, setReminderMinutes] = useState("");

  const handleSubmit = async () => {
    // setOverlayVisible(false);
    try {
      const { data, error } = await supabase.from("messages").insert({
        message: "reserving:~ " + reminderMinutes,
        machine_uuid: selectedMachine.uuid,
        user_uuid: myUUID,
        reservation: 1,
        created_at: new Date().toLocaleString(),
      });
      if (error) {
        throw error;
      } else {
        // Keyboard.dismiss();
      }
    } catch (error) {
      console.error("Error inserting message:", error);
    }
  };

  

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Button
          w={40}
          h={40}
          bg="transparent"
          m={2}
          block
          onPress={() => setVisible(trigger)}
        >
          <Icon
            name="bell"
            fontFamily="Feather"
            fontSize={20}
            color={iconcolor[1]}
            bg={iconcolor[2]}
            borderColor={iconcolor[1]}
            borderWidth={1}
            h={40}
            w={40}
            rounded="md"
          />
        </Button>

        <Modal isVisible={visible}>
          <Div m={30}>
            <Button
              bg="gray400"
              h={35}
              w={35}
              position="absolute"
              top={0}
              right={0}
              rounded="circle"
              onPress={() => {
                setVisible(false);
              }}
            >
              <Icon color="#a9a7ab" name="close" />
            </Button>

            <Input
              mt={50}
              keyboardType="numeric"
              placeholder="Enter reminder minutes"
              value={reminderMinutes}
              onChangeText={(text) => setReminderMinutes(text)}
              inputMode="numeric"
            />

            <Button
              bg="green400"
              mt={10}
              onPress={async () => {
                await schedulePushNotification(reminderMinutes, selectedMachine.name);
                await handleSubmit();
                setVisible(false);
              }}
            >
              Set a reminder notification
            </Button>
          </Div>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}
