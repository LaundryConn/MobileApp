import { Text, Div, Button, Header, Icon, Input } from "react-native-magnus";
import Piechart from "../utils/Pie_chart";
import { useNavigate } from "react-router-native";
import SelectTime from "../utils/SelectTime";
import ReportBroken from "../utils/ReportBroken";
import { useFetchUser, useWashersStatus } from "../utils/Utilities";
// import { SafeAreaView } from "react-native";

export default function HomePage() {
  const washer_example = [0.5, 0.75, 0.25, 1];
  const navigate = useNavigate();

  const myid = "4520eb4f-a623-4ae2-882b-8e01863e6477";
  const halldata = useFetchUser(myid);

  // const washerdata = useWashersStatus(halldata.hall_uuid)
  // const dryerdata = useDryerStatus(halldata.hall_uuid)

  return (
    // <SafeAreaView>
    <Div w={"100%"} h={"100%"} bg="gray900">
      <Div
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={"10%"}
      >
        {washer_example.map((washer) => {
          return (
            <Div
              shadow="2xl"
              bg="white"
              h={100}
              w={70}
              m={11}
              p={3}
              rounded="md"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="black" fontSize="xl" fontWeight="bold" ml={3}>
                W1
              </Text>
              <Piechart loadtime={washer} />
            </Div>
          );
        })}
      </Div>
      <Header
        position="absolute"
        bottom={0}
        w={"100%"}
        h={125}
        p="lg"
        alignment="left"
        prefix={
          <Div
            shadow="2xl"
            bg="white"
            h={130}
            w={87}
            mx={5}
            mt={-75}
            rounded="md"
          ></Div>
        }
        suffix={
          <Button
            bg="transparent"
            onPress={() => {
              navigate("/settings");
            }}
          >
            <Icon
              name="settings"
              fontFamily="Feather"
              color="black"
              bg="white"
              borderColor="black"
              borderWidth={1}
              h={50}
              w={50}
              fontSize={30}
              m={2}
            />
          </Button>
        }
      >
        <Div m={5} ml={10}>
          <Input mt={-65} mb={10} w={240}></Input>
          <Text color="black" fontSize="3xl" fontWeight="bold">
            Washer 1
          </Text>
          <Div flexDir="row">
            <SelectTime />
            <ReportBroken />
            {/* <Icon
                name="check-circle"
                fontFamily="Feather"
                fontSize={20}
                color="white"
                bg="blue500"
                h={40}
                w={40}
                m={3}
                rounded="md"
              />
              <Icon
                name="edit"
                fontFamily="Feather"
                fontSize={20}
                color="white"
                bg="gray700"
                h={40}
                w={40}
                m={3}
                rounded="md"
              /> */}
          </Div>
        </Div>
      </Header>
      <Div m={10}>
        <Text>Dashboard</Text>
      </Div>
    </Div>
    // </SafeAreaView>
  );
}
