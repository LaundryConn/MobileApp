import { Button, Text, Div, Image } from "react-native-magnus";
import { Link } from "react-router-native";

export default function Login() {
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
      <Link to="dashboard"><Text color="white">test</Text></Link>
      <Link to="dashboard">
        <Button
          onPress={() => {
            // handle sign in logic
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
      </Link>
      {/* <Text color="white" style={{transform: "translate(90px,-5px)"}}>Coming soon</Text> */}
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
