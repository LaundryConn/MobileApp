import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { Div, Button, Icon, Modal, ThemeProvider } from "react-native-magnus";

export default function SelectTime() {
  const [visible, setVisible] = useState(false);

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
            <Icon color="black900" name="close" />
          </Button>
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
}
