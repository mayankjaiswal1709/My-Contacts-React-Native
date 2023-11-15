import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Home = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactType, setContactType] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState("personal");



  const goToAllContacts = () => {
    navigation.navigate("AllContact", { contacts: contacts });
  };
  
 

  const onSubmit = async () => {
    if (name === "" || email === "" || phone === "") {
      Alert.alert("Please enter all fields", "danger");
    } else {
      try {
          
          const newContact = {
              id: Date.now(), 
              name,
              email,
              phone,
              contactType: selectedContactType,
            };
            
            
        setContacts((prevContacts) => [...prevContacts, newContact]);

        Alert.alert("Contact Edited Added successfully", "Here you can see!");

            setName("");
            setEmail("");
            setPhone("");
            setContactType("personal");
            
           navigation.navigate("AllContact", { contacts: contacts });
          } catch (err) {
            Alert.alert("Error", "Failed to add contact");
            console.error(err);
            setLoading(false);
          }
    }
  };

 

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>My Contact Book</Text>
        <TouchableOpacity style={styles.button1} onPress={onLogout}>
          <Text style={styles.buttonText3}>LogOut</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MainView}>
        <View style={styles.RegisterTitle}>
          <Text style={styles.RegisterTitleText}>Edit Your Contact</Text>
        </View>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter Name"
          keyboardType="default"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Enter Phone"
          keyboardType="default"
        />

        {/* Radio buttons for contact type */}
        <View style={styles.radioGroup}>
          <View style={styles.RegisterTitle}>
            <Text style={styles.RegisterTitleText}>Contact Type:</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                contactType === "personal" && styles.radioButtonSelected,
              ]}
              onPress={() => setContactType("personal")}
            >
              <Text>Personal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                contactType === "professional" && styles.radioButtonSelected,
              ]}
              onPress={() => setContactType("professional")}
            >
              <Text>Professional</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
        //   disabled={loading}
        >
          <Text style={styles.buttonText2}>
            Edit Contact 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToAllContacts}>
          <Text style={styles.buttonText2}>My All Contacts</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    backgroundColor: "#0000ff",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  RLButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdownButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  MainView: {
    margin: 30,
    padding: 20,
  },
  RegisterTitle: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    flexDirection: "row",
    marginBottom: 10,
  },
  RegisterTitleText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 55,
    margin: 15,
    borderWidth: 1 / 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
    fontSize: 14,
  },
  button: {
    height: 55,
    margin: 15,
    borderWidth: 1 / 2,
    borderRadius: 5,
    backgroundColor: "#800000",
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    height: 40,
    margin: 15,
    width: 90,
    borderWidth: 1 / 2,
    borderRadius: 5,
    backgroundColor: "#4169e1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText2: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText3: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    // justifyContent: "center",
    alignItems: "center",
  },
  radioButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: "#4CAF50", 
  }
  
});
