import React, { useState, useRef } from "react";
import { Button, Select, Div, Text } from "react-native-magnus";
import { useNavigate } from "react-router-native";
import { useFetchUser } from "../utils/Utilities";

export default function SettingsPage() {
  const [selectValue, setSelectedValue] = useState<string>("Select your hall");
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const onSelectOption = (value: any) => {
    setSelectedValue(value);
  };

  const onSave = () => {
    // Save the selected hall to the database or perform any other necessary actions
    navigate("/dashboard");
  };

  return (
    <Div
      bg={"#1f2428"}
      w={"100%"}
      h={"100%"}
      p={50}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Button
        block
        borderWidth={1}
        bg="white"
        color="gray900"
        borderColor="gray300"
        onPress={() => {
          if (selectRef.current) {
            selectRef.current.open();
          }
        }}
      >
        {selectValue?.length ? selectValue.toString() : "Select Your Hall"}
      </Button>

      <Select
        onSelect={onSelectOption}
        ref={selectRef}
        value={selectValue}
        title="Only the following dorms have the system set up:"
        message="email reslife at livingoncampus@uconn.edu if you enjoy laundryconn or if you want it in your dorm!"
        roundedTop="xl"
        data={["Snow"]}
        renderItem={(item, index) => (
          <Select.Option value={item} py="md" px="xl">
            <Text>{item}</Text>
          </Select.Option>
        )}
      />

      <Button block bg="blue500" mt="lg" onPress={onSave}>
        <Text color="white">Save</Text>
      </Button>
    </Div>
  );
}
