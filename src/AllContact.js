import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import setAuthToken from "./setAuthToken";
import { AsyncStorage } from 'react-native';



const AllContact = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const contacts = route.params.contacts || [];
  const contactType = route.params.contactType || "personal";

  
  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    // Update the route.params to reflect the changes
    navigation.setParams({ contacts: updatedContacts });
  };

  useEffect(() => {
    console.log("Contacts:", contacts);
    console.log("Contact Type:", contactType);
  }, [contacts, contactType]);

  const goToEdit = (contact) => {
    navigation.navigate("EditContact");
  };

  return (
    <ScrollView style={styles.container}>

      {contacts.length === 0 ? (
        <Text style={styles.noContactsText}>There are no contacts. Add a contact to see it here.</Text>
      ) : (
        contacts.map((contact) => (
        <View style={styles.card} key={contact.id}>
          <View style={styles.textContainers}>
            <View style={styles.lineOne}>
              <Text style={styles.nameResult}>{contact.name}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText1}>{contactType}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{contact.email}</Text>
            <Text style={styles.text}>{contact.phone}</Text>
          </View>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => goToEdit(contact)}
            >
              <Text style={styles.buttonText2}>EDIT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => deleteContact(contact.id)}
            >
              <Text style={styles.buttonText2}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )))}
    </ScrollView>
  );
};

export default AllContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#dcdcdc",
    margin: 20,
    padding: 30,
    height: 200,
  },
  lineOne: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    height: 30,
    width: 120,
    // margin: 5,
    borderWidth: 1 / 2,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button1: {
    height: 55,
    margin: 10,
    width: 120,

    borderWidth: 1 / 2,
    borderRadius: 15,
    backgroundColor: "#696969",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#333333",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  button2: {
    height: 55,
    margin: 10,
    width: 120,

    borderWidth: 1 / 2,
    borderRadius: 15,
    backgroundColor: "#cd5c5c",
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
  buttonText1: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  nameResult: {
    fontSize: 20,
    color: "#00bfff",
    // margin: 5,

    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#000",
    margin: 2,
    padding: 3,

    fontWeight: "bold",
  },
  noContactsText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
});
