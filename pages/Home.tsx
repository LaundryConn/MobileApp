import {
  Text,
  Div,
  Button,
  Header,
  Icon,
  Select,
  Overlay,
} from "react-native-magnus";
import Piechart from "../utils/Pie_chart";
// import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";
import { useNavigate } from "react-router-native";
import SelectTime from "../utils/SelectTime";
import ReportBroken from "../utils/ReportBroken";
import Messages from "../utils/Messages";
import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";
import * as Device from "expo-device";
import { TextInput } from "react-native";

interface SupbaseLog {
  id: number;
  created_at: string;
  payload: string;
  machine_uuid: string;
}

interface SupbaseMessage {
  id: number;
  created_at: string;
  message: string;
  user_uuid: string;
  machine_uuid: string;
}

interface SupbaseMachine {
  id: number;
  created_at: string;
  machine_uuid: string;
  type: string;
  hall_id: string;
}

interface DisplayMachines {
  id: number;
  uuid: string;
  name: string;
  time: number;
  status: string;
  confidence: number;
}

interface Hall {
  hall_uuid: string;
  hall_name: string;
}

export default function HomePage() {
  // List of Halls (only populates if chaning halls)
  const [hallSelection, setHallSelection] = useState<Hall[]>([
    { hall_uuid: "aadbd2f3-016a-4c32-b3ae-0a964acaa797", hall_name: "Snow" },
  ]);

  // Selected Hall
  const [hallId, setHallId] = useState<string>();
  const [hallName, setHallName] = useState(null);

  // List of log data of Machines for Selected Hall
  const [logData, setLogData] = useState<SupbaseLog[]>([]);
  const [messageData, setMessageData] = useState<SupbaseMessage[]>([]);

  const [machineRefinedData, setMachineRefinedData] = useState<
    DisplayMachines[]
  >([
    {
      id: 1,
      uuid: "960791f8-622c-4c76-8eae-d59cd400e815",
      name: "",
      time: 0,
      status: "",
      confidence: 0,
    },
  ]);
  // Selected Machine
  const [machineSelected, setMachineSelected] = useState<DisplayMachines>({
    id: 0,
    uuid: "960791f8-622c-4c76-8eae-d59cd400e815",
    name: "",
    time: 0,
    status: "",
    confidence: 0,
  });

  // information regarding person using the app
  const deviceId = Device.osInternalBuildId;
  const [myUUID, setMyUUID] = useState("");
  const [myName, setMyName] = useState("");

  const fetchHallsDataFromSupabase = async () => {
    try {
      // Fetch data from the 'halls' table
      const { data, error } = await supabase
        .from("halls")
        .select("hall_uuid,hall_name")
        .eq("customer", "uconn");

      if (error) {
        throw error;
      }

      if (data) {
        // console.log(data);
        setHallSelection(data as Hall[]);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchHallsDataFromSupabase();
    fetchAsyncData();
  }, []);

  async function fetchAsyncData() {
    const storedHallId = await AsyncStorage.getItem("hall_id");
    const storedHallName = await AsyncStorage.getItem("hall_name");
    const storedUUID = await AsyncStorage.getItem("uuid");
    const myName = await AsyncStorage.getItem("name");

    if (storedHallId && storedHallName) {
      // Data is present in async storage, use it
      setHallId(storedHallId);
      setHallName(storedHallName);

      // Fetch data from supabase about logs and messages
      consolidateData(storedHallId);
    }

    if (storedUUID && myName) {
      // stuff for messages
      setMyUUID(storedUUID);
      setMyName(myName);

    } else {
      // ask for a name
      checkMyName();
    }
  }

  async function checkMyName() {
    // console.log(Device.osInternalBuildId)
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("device_id", Device.osInternalBuildId);

    if (data != null && data.length > 0) {
      setMyName(data[0].name);
      AsyncStorage.setItem("name", data[0].name);
    } else {
      setOverlayVisible(true);
    }

    setMyUUID(data[0].uuid);
    setMyName(data[0].name);

    if (data[0].status == 1) {
      console.log("banned");
    }

    if (error || data?.length == 0) {
      // Data is not present in supabase
      setOverlayVisible(true);
    }
  }

  async function fetchLogs(hallId: string | null) {
    const { data, error } = await supabase.rpc("get_logs_by_hall_id", {
      p_hall_uuid: hallId,
    });

    console.log(data);

    if (data) {
      setLogData(data);
    }
    if (error) {
      throw error;
    }
  }

  async function fetchMessages(hallId: string | null) {
    console.log(hallId);
    const { data, error } = await supabase.rpc("get_messages_by_hall_id", {
      p_hall_uuid: hallId,
    });

    console.log(data);

    if (data) {
      setMessageData(data);
    }
    if (error) {
      throw error;
    }
  }

  function consolidateData(hallId: string | null) {
    var logs = fetchLogs(hallId);
    var messages = fetchMessages(hallId);
    // Create a new array of machines
    const machines: DisplayMachines[] = [
      {
        id: 1,
        uuid: "960791f8-622c-4c76-8eae-d59cd400e815",
        name: "",
        time: 0,
        status: "",
        confidence: 0,
      },
    ];

    // Loop through the log data
    for (const log of logData) {
      // Check if the machine is already in the machines array
      console.log(log);
    }

    // Return the machines array
    setMachineRefinedData(machines);
  }

  const onSelectOption = (value: any) => {
    // Save the hall_id and hall_name to async storage
    AsyncStorage.setItem("hall_id", value.split(" ")[1]);
    AsyncStorage.setItem("hall_name", value.split(" ")[0]);

    setHallId(value.split(" ")[1]);
    setHallName(value.split(" ")[0]);
    consolidateData(value.split(" ")[1]);
  };
  const selectRef = useRef(null);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleInputChange = (input) => {
    setNameInput(input);
  };

  const handleSubmit = async () => {
    // setOverlayVisible(false);
    console.log(Device.osInternalBuildId)
    try {
      const { data, error } = await supabase.from("users").insert({
        device_id: Device.osInternalBuildId,
        name: nameInput,
      }).select();
      if (error) {
        throw error;
      } else {
        setOverlayVisible(false);
        setNameInput(nameInput);
        AsyncStorage.setItem("name", nameInput);
        setMyUUID(data[0].uuid);
        AsyncStorage.setItem("uuid", data[0].uuid);
        // Keyboard.dismiss();
      }
    } catch (error) {
      console.error("Error inserting message:", error);
    }
  };

  return (
    <Div w={"100%"} h={"100%"} bg="gray900">
      <Div m={10} mt={"10%"} flexDir="row">
        <Button
          flex={1}
          block
          borderWidth={1}
          mx="xl"
          bg="white"
          color="gray900"
          borderColor="gray300"
          onPress={() => {
            if (selectRef.current) {
              selectRef.current.open();
            }
          }}
        >
          {hallName?.length ? hallName.toString() : "Select Your Hall"}
        </Button>

        <Select
          onSelect={onSelectOption}
          ref={selectRef}
          value={hallId}
          title="Only the following dorms have the system set up:"
          message="email reslife at livingoncampus@uconn.edu if you enjoy laundryconn or if you want it in your dorm!"
          roundedTop="xl"
          m={3}
          data={hallSelection.map(
            (hall) => hall.hall_name + " " + hall.hall_uuid
          )}
          renderItem={(item, index) => (
            <Select.Option value={item} py="md" px="xl">
              <Text>{item.split(" ")[0]}</Text>
            </Select.Option>
          )}
        />
      </Div>
      <Div
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {machineRefinedData.map((machine) => {
          return (
            <Button
              shadow="2xl"
              flexDir="column"
              bg="white"
              h={100}
              w={70}
              m={11}
              p={3}
              key={machine.id}
              rounded="md"
              justifyContent="center"
              alignItems="center"
              onPress={() => {
                setMachineSelected(machine);
              }}
            >
              <Text color="black" fontSize="xl" fontWeight="bold" ml={3}>
                {machine.name}
              </Text>
              <Piechart loadtime={machine.time} size={20} />
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
            {machineSelected && (
              <Div pt={16} justifyContent="center" alignItems="center">
                <Text color="black" fontSize="3xl" fontWeight="bold">
                  {machineSelected.name}
                </Text>
                <Piechart loadtime={machineSelected.time} size={35} />
              </Div>
            )}
          </Div>
        }
      >
        <Overlay visible={overlayVisible} p="xl">
          {/* <ActivityIndicator /> */}
          <Text mt="md">What is your name</Text>
          <TextInput
            style={{
              height: 80,
              width: 250,
              borderColor: "gray",
              borderWidth: 1,
              padding: 10,
            }}
            multiline={true}
            numberOfLines={1}
            clearTextOnFocus={true}
            // onFocus={() => setOverlayVisible(true)}
            onChangeText={handleInputChange}
            value={nameInput}
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

        <Div m={5} flexDir="row">
          <Div>
            <SelectTime />
            <ReportBroken selectedMachine={machineSelected} myUUID={myName} />
          </Div>
          <Messages selectedMachine={machineSelected} myUUID={myName} />
        </Div>
      </Header>
    </Div>
  );
}
