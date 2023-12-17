import { useState } from "react";
import { supabase } from "../supabase";
import { ActivityIndicator, TextInput } from "react-native";
import { Input, Button, Div, Overlay, Icon, Text } from "react-native-magnus";
import { Keyboard } from "react-native";

export default function Messages(selectedMachine) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (input) => {
    setMessage(input);
  };

  const handleSubmit = async () => {
    // setOverlayVisible(false);
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          message: message,
          machine_uuid: selectedMachine.uuid,
          user_uuid: "4520eb4f-a623-4ae2-882b-8e01863e6477",
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
      <TextInput
        style={{ height: 80, width: 180, borderColor: "gray", borderWidth: 1 }}
        multiline={true}
        numberOfLines={4}
        placeholder="Enter a message like 'The machine drys slowly or please put the clothes in the blue basket when done"
        clearTextOnFocus={true}
        // onChangeText={() => setOverlayVisible(true)}
        onChange={() => setOverlayVisible(true)}
        value={message}
      />
      <Overlay visible={overlayVisible} p="xl">
        {/* <ActivityIndicator /> */}
        <Text mt="md">Send a message to the next person</Text>
        <TextInput
          style={{
            height: 80,
            width: 250,
            borderColor: "gray",
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
