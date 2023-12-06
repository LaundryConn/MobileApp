import { Text, Div, Button, Header, Icon, Input } from "react-native-magnus";
import Piechart from "../utils/Pie_chart";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";
import { useNavigate } from "react-router-native";
import SelectTime from "../utils/SelectTime";
import { useState } from "react";
import ReportBroken from "../utils/ReportBroken";
import Messages from "../utils/Messages"

interface SupbaseLog {
  id: number;
  machine: string;
  time: number;
  status: string;
}

export default function HomePage() {
  const washer_data: SupbaseLog[] = [
    { id: 1, machine: "W1", time: 1, status: "active" },
    { id: 2, machine: "W2", time: 0.3, status: "active" },
    { id: 3, machine: "W3", time: 0.9, status: "active" },
    { id: 4, machine: "W4", time: 1, status: "active" },
  ];

  const navigate = useNavigate();
  const [selectMachine, setSelectedMachine] = useState<SupbaseLog>(
    washer_data[0]
  );

  return (
    <Div w={"100%"} h={"100%"} bg="gray900">
      <Div ml={10} mt={"15%"} flexDir="row">
        <Text color="white" fontSize={36} fontWeight="800">
          {" "}
          Snow Hall{" "}
        </Text>
        <Button
          bg="blue200"
          onPress={() => {
            navigate("/settings");
          }}
          borderColor="black"
          borderWidth={1}
          m={2}
          p={0}
          w={40}
          h={40}
        >
          <Icon
            name="settings"
            fontFamily="Feather"
            color="black"
            h={40}
            w={40}
            m={2}
            fontSize={20}
          />
        </Button>
      </Div>
      <Div
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {washer_data.map((washer) => {
          return (
            <Button
              shadow="2xl"
              flexDir="column"
              bg="white"
              h={100}
              w={70}
              m={11}
              p={3}
              key={washer.id}
              rounded="md"
              justifyContent="center"
              alignItems="center"
              onPress={() => {
                setSelectedMachine(washer);
              }}
            >
              <Text color="black" fontSize="xl" fontWeight="bold" ml={3}>
                {washer.machine}
              </Text>
              <Piechart loadtime={washer.time} size={20} />
            </Button>
          );
        })}
      </Div>
      <Header
        position="absolute"
        bottom={0}
        pb={30}
        w={"100%"}
        p="lg"
        alignment="left"
        prefix={
          <Div
            shadow="2xl"
            bg="white"
            h={170}
            w={110}
            mx={5}
            mt={-75}
            rounded="md"
          >
            {selectMachine && (
              <Div
                // bg="white"
                // h={200}
                // w={100}
                // m={16}
                // p={3}
                pt={16}
                // rounded="md"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="black" fontSize="3xl" fontWeight="bold">
                  {selectMachine.machine}
                </Text>
                <Piechart loadtime={selectMachine.time} size={35} />
              </Div>
            )}
          </Div>
        }
      >
        <Div m={5} flexDir="row">
          <Div>
            <SelectTime />
            <ReportBroken selectedMachine={selectMachine} />
          </Div>
          <Messages /> 
        </Div>
      </Header>
      <Div m={10}>
        <Text>Dashboard</Text>
      </Div>
    </Div>
  );
}
