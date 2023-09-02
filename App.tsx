import { StyleSheet, View } from "react-native";
import CreateAccount from "./Pages/CreateAccount";
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./firebase";


export default function App() {
  const app = initializeApp(FirebaseConfig); // Initialize Firebase

  return (
    <View style={styles.container}>
      <CreateAccount />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2428",
    alignItems: "center",
    justifyContent: "center",
  }

});
