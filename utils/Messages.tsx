import { useState } from "react";
import { supabase } from "../supabase";
import { TextInput } from "react-native"
import { Input, Button, Div, Icon } from "react-native-magnus";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (input) => {
    setMessage(input);
  }

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ message }]);
      if (error) {
        throw error;
        }
        console.log("Message inserted successfully:", data);
      } catch (error) {
        console.error("Error inserting message:", error);
      }
    };

    return (
      <Div w={190} m={5}>
        <TextInput
          style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
          multiline={true}
          numberOfLines={4}
          onChangeText={handleInputChange}
          value={message}
        />
      <Button w={25} h={25} mt={-30} ml={5} onClick={handleSubmit}>
        <Icon name='send' fontFamily='Feather' fontSize={10} color='white' bg='blue500' h={60} w={60} rounded='md' />
      </Button>
    </Div>
  );
};

export default Messages;
