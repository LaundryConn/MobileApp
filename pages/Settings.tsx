import { Div, Text, Input, Select } from "react-native-magnus";
import React, { useState } from "react";

export default function SettingsPage(){
  const [hall, setHall] = useState<string>("");

  const onSelectHall = (value: string) => {
    setHall(value);
  };

  return (
    <Div>
      <Text>Name:</Text>
      <Input placeholder="Enter your name" />

      <Text>Hall:</Text>
      <Select
        value={hall}
        onSelect={onSelectHall}
        data={[
          { label: "Hall 1", value: "hall1" },
          { label: "Hall 2", value: "hall2" },
          { label: "Hall 3", value: "hall3" },
        ]}
        renderItem={({ item }) => (
          <Select.Option value={item.value}>{item.label}</Select.Option>
        )}
      />
    </Div>
  );
};
