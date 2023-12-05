import { Text, Div, Button, Header, Icon, Input } from 'react-native-magnus';
import Piechart from '../utils/Pie_chart';
import { Dimensions } from 'react-native/Libraries/Utilities/Dimensions';
import { useNavigate } from 'react-router-native';
import SelectTime from '../utils/SelectTime';
import { useState } from 'react';
import ReportBroken from '../utils/ReportBroken';

export default function HomePage() {
const washer_example = [['W1' , 0.5], ['W2' , 0.75], ['W3' , 0.25], ['W4' , 1]];
const navigate = useNavigate();
const [selectMachine, setSelectedMachine] = useState()

  return (
    <Div w={'100%'} h={'100%'} bg="gray900">
      <Div
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={'15%'}
      >
        {washer_example.map((washer) => {
          return (
            <Button
              shadow="2xl"
              flexDir='column'
              bg="white"
              h={100}
              w={70}
              m={11}
              p={3}
              rounded="md"
              justifyContent="center"
              alignItems="center"
              onPress={() => {setSelectedMachine(washer)}}
            >
              <Text color="black" fontSize="xl" fontWeight="bold" ml={3}>
                {washer[0]}
              </Text>
              <Piechart loadtime={washer[1]} />
            </Button>
          );
        })}
      </Div>
      <Header
        position="absolute"
        bottom={0}
        w={'100%'}
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
          >
          {selectMachine && (
            <Div
            bg="white"
            h={100}
            w={70}
            m={11}
            p={3}
            rounded="md"
            justifyContent="center"
            alignItems="center"
          >
            
            <Piechart loadtime={selectMachine[1]} />
          </Div>
          )}
          </Div>
        }
        suffix={
          <Button
            bg="transparent"
            onPress={() => {
              navigate('/settings');
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
            {selectMachine && selectMachine[0]}
          </Text>
          <Div flexDir="row">
            <SelectTime />
            <ReportBroken selectedMachine={selectMachine}/>
            {/* <Icon
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
  );
}
