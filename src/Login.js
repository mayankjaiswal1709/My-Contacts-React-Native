import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import setAuthToken from "./setAuthToken";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {


  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('Token stored successfully:', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };
  
  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Retrieved token:', token);
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

    const navigation = useNavigation();
 
    const goToRegister = () =>{
      navigation.navigate('Register')
  }
  const goToHome = () =>{
      navigation.navigate('Contact')
  }
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async () => {
      if (email === "" || password === "") {
        Alert.alert("Please enter all fields", "danger");
      } else {
        try {
          setLoading(true);

          const res = await axios.post(
            "https://mycontacts-backend-783r.onrender.com/api/auth",
             { email, password }
             );
          
          const token = res.data.token;
          console.log("Token  storing:", token);

          
          setAuthToken(token);
          await storeToken(token);
          setLoading(false);
          
          Alert.alert("Login successful", "Welcome!"); 
          goToHome();
        } catch (err) {
          setLoading(false);
          Alert.alert("Login failed", "Invalid credentials");
          console.error(err);                   
          setLoading(false);
        }
      }
    };

    retrieveToken();
    
  

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>My Contact Book</Text>

        <View style={styles.RLButton}>
          <TouchableOpacity style={styles.dropdownButton}  onPress={goToRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        
        </View>
      </View>

      <View style={styles.MainView}>

      <View style={styles.RegisterTitle}>
      <Text style={styles.RegisterTitleText}>Login</Text>
      </View>
        
        
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your Email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your Password"
          keyboardType="default"
          secureTextEntry
          autoCorrect={false}
        />
        
        <TouchableOpacity 
        style={styles.button} 
        onPress={onSubmit} 
        disabled={loading}>

          <Text style={styles.buttonText2}>{loading ? "Logging in..." : "Login"}</Text>

        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Login;

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

    margin:30,
    padding:20 

  },
  RegisterTitle:{
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    flexDirection: "row",
    marginBottom: 10,
  },
  RegisterTitleText:{
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

    shadowColor:'#333333',
    shadowOffset:{width:6,height:6},
    shadowOpacity:0.6,
    shadowRadius:4
  },
  buttonText2: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
