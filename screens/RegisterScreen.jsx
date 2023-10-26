import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo2 from "../components/Logo2";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { phoneValidator } from "../helpers/phoneValidator"; // Import phone number validator
import { THEME } from "../constants";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";



export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" }); 

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = password.value !== confirmPassword.value ? "Passwords do not match" : "";
    const phoneError = phoneValidator(phone.value); 

    if (emailError || passwordError || nameError || confirmPasswordError || phoneError ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      setPhone({ ...phone, error: phoneError });
      return;
    }
 
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {

            const user = userCredential.user;
    
            const userData = {
              name: name.value,
              email: email.value,
              phone: phone.value,
            };
    
            addDoc(collection(db, "users"), userData)
              .then(() => {
                console.log("User data added to Firestore");
              })
              .catch((error) => {
                console.error("Error adding user data to Firestore: ", error);
              });
    
            navigation.reset({
              index: 0,
              routes: [{ name: "Bottom Navigation" }],
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing up: ", errorCode, errorMessage);
          });
     // }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo2 />
      <Header>Join Scrapie</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password" 
        returnKeyType="next"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <TextInput
        label="Mobile Phone Number" 
        returnKeyType="done"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: "" })}
        error={!!phone.error}
        errorText={phone.error}
        keyboardType="phone-pad"
      />
      <Text style={{}}>

      </Text>
      <Button mode="outlined" onPress={onSignUpPressed}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: THEME.colors.primary,
  },
});
