import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';

export default function CreateAccount() {
    const db = getDatabase(); // Get database

    const [username, setUsername] = useState(); // Create state variables
    const [email, setEmail] = useState();
    const [fire, setFire] = useState('j');
  
    function writeUserData(userId, name, email) { // Write data to firebase
        set(ref(db, 'Werth/' + "/Dryers" + "/Dryer 1"), { // Define the reference/path to the data
        DryerID: uuidv4(), // Generate a random ID
        LastUpdated: Date.now(), // Get the current date
        });
    }

    function readUserData() { // Read data from firebase
        const starCountRef = ref(db, 'Werth/' + "/Dryers" + "/LastUpdated"); // Define the reference/path to the data
        onValue(starCountRef, (snapshot) => { // On value change used to get value at an instant in time
            const data = snapshot.val(); // assigns the value to data

            if (data != fire){ // Since this is realtime, the value is constantly being updated.
                setFire(data); // to avoid rendering issues, we only update the state variable if the value has changed
            }
        })
    }

    readUserData();

    return (
       <>
        <Text >Create Your Account</Text>
        <TextInput placeholder="Username" onChangeText={(val) => setEmail(val)}></TextInput>
        <TextInput placeholder="Email"  onChangeText={(val) => setUsername(val)}></TextInput>
        <Button title="Create Account" onPress={() => writeUserData('1', username, email)}></Button>
        <StatusBar style="light" />
      </> 
    );
}

// const styles = StyleSheet.create({ 
//     input: {
//         backgroundColor: "white",
//         height: 40,
//         width: 300,
//         borderRadius: 5,
//         padding: 5,
//         marginBottom: 30,
//       },
    
//       h1: {
//         position: "relative",
//         top: -40,
//         color: "white",
//         fontSize: 30,
//         textAlign: "left",
//         width: 300,
//         marginBottom: 30,
//       }
// });