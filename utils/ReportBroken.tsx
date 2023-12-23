import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList, TextInput } from "react-native";
import {
  Div,
  Text,
  Button,
  Icon,
  Modal,
  ThemeProvider,
  Input,
} from "react-native-magnus";
import { supabase } from "../supabase";

export default function ReportBroken({selectedMachine, myUUID}) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (input) => {
    setMessage(input);
  };

  const handleSubmit = async () => {
    setVisible(false);

    try {
      const { data, error } = await supabase.from("messages").insert({
        message: "reported_broken:~" + message,
        machine_uuid: selectedMachine.uuid,
        user_uuid: myUUID,
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
          bg="transparent"
          w={40}
          h={40}
          m={2}
          block
          onPress={() => setVisible(true)}
        >
          <Icon
            name="flag"
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
            top={35}
            right={35}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon color="black" name="close" />
          </Button>

          <Div m={50}>
            <Text fontWeight="bold" fontSize="4xl">
              {selectedMachine.machine}
            </Text>
            <Text mt={10} fontSize="lg" color="black">
              Is this machine broken?
            </Text>
            <TextInput
              style={{
                height: 250,
                width: 250,
                borderColor: "gray",
                borderWidth: 1,
                marginTop: 10,
              }}
              multiline={true}
              numberOfLines={4}
              clearTextOnFocus={true}
              // onFocus={() => setOverlayVisible(true)}
              onChangeText={handleInputChange}
              value={message}
            />
            <Button
              w={100}
              h={50}
              mt={10}
              bg="blue500"
              onPress={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Div>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}
