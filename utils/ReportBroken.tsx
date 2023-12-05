import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import {
  Div,
  Text,
  Button,
  Icon,
  Modal,
  ThemeProvider,
  Input,
} from "react-native-magnus";

export default function ReportBroken({ selectedMachine }) {
  const [visible, setVisible] = useState(false);

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Button bg="transparent" w={40} h={40} m={2} block onPress={() => setVisible(true)}>
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
            top={50}
            right={15}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon color="black900" name="close" />
          </Button>
          
          <Div m={50}>
            <Text fontWeight="bold" fontSize="4xl">
              {selectedMachine.machine}
            </Text>
            <Text mt={10} fontSize="lg" color="black">
              Is this machine broken?
            </Text>
            <Input mt={10} mb={10} w={240} pb={300}></Input>
            <Button w={240} h={50} bg="blue500" 
            >Submit</Button>
          </Div>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}
