// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { RadioButton } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// // import jwt from 'jsonwebtoken'

// const Home = () => {
//   const navigation = useNavigation();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [contactType, setContactType] = useState("personal");
//   const [loading, setLoading] = useState(false);
//   const [contacts, setContacts] = useState([]);


//   const storeToken = async (token) => {
//     try {
//       await AsyncStorage.setItem("authToken", token);
//       console.log("Token stored successfully:", token);
//     } catch (error) {
//       console.error("Error storing token:", error);
//     }
//   };

//   const retrieveToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       console.log("Retrieved token:", token);
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//       return null;
//     }
//   };

//   const refreshToken = async (token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const response = await axios.post("https://mycontacts-backend-783r.onrender.com/api/refresh", {}, config);
//       const newToken = response.data.token;
//       storeToken(newToken);
//       return newToken;
//     } catch (err) {
//       console.error("Error refreshing token:", err);
//       return null;
//     }
//   };

//   // const fetchContacts = async () => {
//   //   try {
//   //     const token = await retrieveToken();

//   //     if (token) {
//   //       const decodedToken = jwt.decode(token);
//   //       const exp = decodedToken.exp;
//   //       const now = Math.floor(Date.now() / 1000);
  
//   //       if (exp < now) {
//   //         const newToken = await refreshToken(token);
//   //         await storeToken(newToken);
//   //         fetchContacts();
//   //       } else {
//   //         // Use the existing token to make the API request
//   //         const config = {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         };
  
//   //         const response = await axios.get("https://mycontacts-backend-783r.onrender.com/api/contacts", config);
//   //         setContacts(response.data);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching contacts:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchContacts();
//   // }, []);

  
//   const goToAllContacts = () => {
//     navigation.navigate("AllContact");
//   };

//   const onSubmit = async () => {
//     if (name === "" || email === "" || phone === "") {
//       Alert.alert("Please enter all fields", "danger");
//     } else {
//       try {
//         setLoading(true);

//         const token = await retrieveToken();

//         if (!token) {
//           console.error("Token not available");
//           navigation.navigate("Login");
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const data = {
//           name,
//           email,
//           phone,
//           contactType,
//         };

//         const response = await axios.post(
//           "https://mycontacts-backend-783r.onrender.com/api/contacts",
//           data,
//           config
//         );

//         const newToken = response.data.token;
//         console.log("Token storing:", newToken);
//         await storeToken(newToken);
//         setLoading(false);

//         Alert.alert("Contact Added successfully", "Here you can see!");

//         setName("");
//         setEmail("");
//         setPhone("");
//         setContactType("personal");

//         navigation.navigate("AllContact");
//       } catch (err) {
//         // Handle other errors
//         Alert.alert("Error", "Failed to add contact");
//         console.error(err);
//         setLoading(false);
//       }
//     }
//   };

 

//   const onLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("authToken");
//       navigation.navigate("Login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };


//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.title}>
//         <Text style={styles.titleText}>My Contact Book</Text>
//         <TouchableOpacity style={styles.button1} onPress={onLogout}>
//           <Text style={styles.buttonText3}>LogOut</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.MainView}>
//         <View style={styles.RegisterTitle}>
//           <Text style={styles.RegisterTitleText}>Add Contact</Text>
//         </View>

//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={(text) => setName(text)}
//           placeholder="Enter Name"
//           keyboardType="default"
//           autoCorrect={false}
//         />
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           placeholder="Enter Email"
//           keyboardType="default"
//         />
//         <TextInput
//           style={styles.input}
//           value={phone}
//           onChangeText={(text) => setPhone(text)}
//           placeholder="Enter Phone"
//           keyboardType="default"
//         />

//         {/* Radio buttons for contact type */}
//         <View style={styles.radioGroup}>
//           <View style={styles.RegisterTitle}>
//             <Text style={styles.RegisterTitleText}>Contact Type:</Text>
//           </View>
//           <View style={styles.radioButtonContainer}>
//             <RadioButton
//               value="personal"
//               status={contactType === "personal" ? "checked" : "unchecked"}
//               onPress={() => setContactType("personal")}
//             />
//             <Text>Personal</Text>
//           </View>
//           <View style={styles.radioButtonContainer}>
//             <RadioButton
//               value="professional"
//               status={contactType === "professional" ? "checked" : "unchecked"}
//               onPress={() => setContactType("professional")}
//             />
//             <Text>Professional</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={onSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText2}>
//             {loading ? "Adding Contact" : "Add Contact"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={goToAllContacts}>
//           <Text style={styles.buttonText2}>My All Contacts</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     backgroundColor: "#0000ff",
//     height: 70,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   titleText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   RLButton: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   dropdownButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   MainView: {
//     margin: 30,
//     padding: 20,
//   },
//   RegisterTitle: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: 30,
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   RegisterTitleText: {
//     color: "#000",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 55,
//     margin: 15,
//     borderWidth: 1 / 2,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#d3d3d3",
//     fontSize: 14,
//   },
//   button: {
//     height: 55,
//     margin: 15,
//     borderWidth: 1 / 2,
//     borderRadius: 5,
//     backgroundColor: "#800000",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button1: {
//     height: 40,
//     margin: 15,
//     width: 90,
//     borderWidth: 1 / 2,
//     borderRadius: 5,
//     backgroundColor: "#4169e1",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText2: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   buttonText3: {
//     fontSize: 15,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   radioGroup: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     // justifyContent: "center",
//     alignItems: "center",
//   },
// });
