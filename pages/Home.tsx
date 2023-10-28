import { Text, Div, Button, Header, Icon } from "react-native-magnus";

export default function HomePage() {
  return (
    <Div w={"100%"}>
      <Header
        p="lg"
        alignment="left"
        prefix={
          <Button bg="transparent">
            <Icon name="arrow-left" fontFamily="Feather" fontSize="2xl" />
          </Button>
        }
        suffix={
          <Button bg="transparent">
            <Icon name="more-vertical" fontFamily="Feather" />
          </Button>
        }
      >
        Dashboard
      </Header>
      <Div m={10}>
        <Text>Dashboard</Text>
      </Div>
    </Div>
  );
}
