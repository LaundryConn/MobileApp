import React, { useEffect, useState } from "react";
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
  const [iconcolor, setIconcolor] = useState({1: "gray500", 2: "gray200"})
  const [trigger, setTrigger] = useState(false)

  // Change the color of the Icon on homepage
  // Will also allow report option to be triggered if selectedMachine is True 
  useEffect(() => {
    if (selectedMachine.name !== ""){
      setIconcolor({1: "red500", 2: "red200"})
      setTrigger(true)
    }
    else{
      setIconcolor({1: "gray500", 2: "gray200"})
      setTrigger(false)
    }
  }, [selectedMachine])

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
          onPress={() => setVisible(trigger)}
        >
          <Icon
            name="flag"
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
