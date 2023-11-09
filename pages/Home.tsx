import { Text, Div, Button, Header, Icon, Input } from "react-native-magnus";
import Piechart from "../utils/Pie_chart";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";

export default function HomePage() {
  return (
    <Div w={"100%"} h={"100%"} bg="gray900">
      <Div
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={"15%"}
      >
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
          <Piechart />
        </Div>
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
        <Div shadow="2xl" bg="white" h={100} w={70} m={11} rounded="md" />
      </Div>
      <Header
        position="absolute"
        bottom={0}
        w={"100%"}
        h={85}
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
          />
        }
        suffix={
          <Button bg="transparent">
            <Icon
              name="settings"
              fontFamily="Feather"
              color="black"
              bg="white"
              h={50}
              w={50}
              fontSize={40}
              m={3}
            />
          </Button>
        }
      >
        <Div m={5} ml={10}>
          <Input mt={-60} mb={10} w={250}>
            yes
          </Input>
          <Text color="black" fontSize="3xl" fontWeight="bold">
            Washer 1
          </Text>
          <Div flexDir="row">
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
              m={3}
              rounded="md"
            />
            <Icon
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
            />
          </Div>
        </Div>
      </Header>
      <Div m={10}>
        <Text>Dashboard</Text>
      </Div>
    </Div>
  );
}
