import { Button, Text, Div, Image } from "react-native-magnus";
import { useNavigate } from "react-router-native";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Div
      style={{
        backgroundColor: "#1f2428",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/logo_padding.png")} h={300} w={300} />
      <Button
        onPress={() => {
          navigate("/dashboard");
        }}
        bg="gray700"
        alignSelf="center"
        fontSize={20}
        fontWeight="bold"
        w={300}
        p={10}
      >
        {/* <Image source={}></Image> */}
        Sign in with NetId
      </Button>
      <Text color="white" m={10}>
        or
      </Text>
      <Button
        onPress={() => {
          // handle sign in with Google logic
        }}
        bg="black"
        alignSelf="center"
        fontSize={20}
        fontWeight="bold"
        w={300}
      >
        Sign in with Google
      </Button>
      <Text color="white" style={{ transform: "translate(90px,-5px)" }}>
        Coming soon
      </Text>
    </Div>
  );
}
