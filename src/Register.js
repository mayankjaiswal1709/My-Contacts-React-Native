import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";
import setAuthToken from "./setAuthToken";
import axios from "axios";


const Register = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState(null);

  const { name, email, password, confirmPassword } = user;

  const onChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const formData = {
    name,
    email,
    password,
  };

  const onSubmit = async () => {
    try {
      if (name === "" || email === "" || password === "") {
        Alert.alert("Please enter all fields", "danger");
      } else if (password !== confirmPassword) {
        Alert.alert("Passwords do not match", "danger");
      } else {
        try {
          setLoading(true);
          const res = await axios.post("https://mycontacts-backend-783r.onrender.com/api/users", formData);
         
           
          const token = res.data.token;
    
          setAuthToken(token);
  
          setLoading(false);
          Alert.alert("Registration successful", "Success");
          setUser("");
          setUser("");
          setUser("");
          setUser("personal");

        // navigation.navigate("Contact");
          goToHome();
        } catch (err) {
          setLoading(false);
          Alert.alert("Login failed", "Invalid credentials");
          console.error(err);          setLoading(false);
        }
       
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Network Error",
        "Please check your internet connection and try again"
      );
      setLoading(false);
    }
  };

  const showAlert = () => {
    if (alert) {
      Alert.alert(
        alert.title,
        alert.message,
        [{ text: "OK", onPress: () => Alert.alert(null), style: "default" }],
        { cancelable: false }
      );
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const goToHome = () => {
    navigation.navigate("Contact");
  };

  return (
    <ScrollView style={styles.container}>
      {showAlert()}
      <View style={styles.title}>
        <Text style={styles.titleText}>My Contact Book</Text>

        <View style={styles.RLButton}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={goToRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownButton} onPress={goToLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.MainView}>
        <View style={styles.RegisterTitle}>
          <Text style={styles.RegisterTitleText}>Register</Text>
        </View>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => onChange("name", text)}
          placeholder="Enter your Name"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => onChange("email", text)}
          placeholder="Enter your Email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => onChange("password", text)}
          placeholder="Enter your Password"
          keyboardType="default"
          secureTextEntry
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => onChange("confirmPassword", text)}
          placeholder="Confirm your Password"
          keyboardType="default"
          secureTextEntry
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
          <Text style={styles.buttonText2}>{loading ? "Registering in..." : "Register"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

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
    backgroundColor: "#4169e1",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#333333",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  buttonText2: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
