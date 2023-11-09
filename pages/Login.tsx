import { Button, Text, Div, Image } from "react-native-magnus";
import { useNavigate } from "react-router-native";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Div
      bg={"#1f2428"}
      w={"100%"}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image source={require("../assets/logo_padding.png")} h={300} w={300} />
      <Button
        onPress={() => {
          navigate("/dashboard");
        }}
        bg="gray700"
        alignSelf="center"
        w={300}
        p={5}
      >
        <Image source={require("../assets/husky.jpeg")} h={40} w={40} />
        <Text color="white" ml={3} fontSize={20} fontWeight="bold">
          Sign in with NetId
        </Text>
      </Button>
      <Text
        color="white"
        m={10}
        onPress={() => {
          navigate("/dashboard");
        }}
      >
        continue without login
      </Text>
    </Div>
  );
}
