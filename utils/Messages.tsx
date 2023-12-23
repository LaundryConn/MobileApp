import { useState } from "react";
import { supabase } from "../supabase";
import { ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { Input, Button, Div, Overlay, Icon, Text } from "react-native-magnus";
import { Keyboard } from "react-native";
import * as Device from "expo-device";

export default function Messages({selectedMachine, myUUID}: {selectedMachine: any, myUUID: string}) {

  console.log("selectedMachine", selectedMachine)
  console.log("myuuid", myUUID)

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (input) => {
    setMessage(input);
  };

  const handleSubmit = async () => {
    // setOverlayVisible(false);
    try {
      const { data, error } = await supabase.from("messages").insert({
        message: message,
        machine_uuid: selectedMachine.uuid,
        user_uuid: myUUID,
      });
      if (error) {
        throw error;
      } else {
        setOverlayVisible(false);
        setMessage(message);
        // Keyboard.dismiss();
      }
    } catch (error) {
      console.error("Error inserting message:", error);
    }
  };

  return (
    <Div w={180} m={5}>
      <TouchableOpacity onPress={() => setOverlayVisible(true)}>
        <TextInput
          style={{
            height: 80,
            width: 180,
            borderColor: "gray",
            borderWidth: 1,
            fontSize: 10,
            padding: 10,
          }}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter a message like 'The machine drys well in 60 mins or please put the clothes in the blue basket when done"
          clearTextOnFocus={true}
          pointerEvents="none"
          placeholderTextColor="gray"
          value={message}
        />
      </TouchableOpacity>
      <Overlay visible={overlayVisible} p="xl">
        <Button onPress={() => setOverlayVisible(false)}>X</Button>

        {/* <ActivityIndicator /> */}
        <Text mt="md">Send a message to the next person</Text>
        <TextInput
          style={{
            height: 80,
            width: 250,
            borderColor: "gray",
            padding: 10,
            borderWidth: 1,
          }}
          multiline={true}
          numberOfLines={4}
          clearTextOnFocus={true}
          // onFocus={() => setOverlayVisible(true)}
          onChangeText={handleInputChange}
          value={message}
        />
        <Button w={25} h={25} mt={-30} ml={5} onPress={handleSubmit}>
          <Icon
            name="send"
            fontFamily="Feather"
            fontSize={10}
            color="white"
            bg="blue500"
            h={60}
            w={60}
            rounded="md"
          />
        </Button>
      </Overlay>
    </Div>
  );
}
