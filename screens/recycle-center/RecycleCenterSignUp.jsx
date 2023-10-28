import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/recycle-center/Button";
import TextInput from "../../components/TextInputLogin";
import { nameValidator } from '../../helpers/nameValidator';
import { emailValidator } from "../../helpers/emailValidator";
import { descriptionValidator } from "../../helpers/descriptionValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { phoneValidator } from "../../helpers/phoneValidator";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase.config'
import { collection, addDoc } from "firebase/firestore";

const RecycleCenterSignUp = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [description, setDescription] = useState({ value: "", error: "" });
    const [contact, setContact] = useState({ value: "", error: "" });

    const handleSignUpButton = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const descriptionError = descriptionValidator(description.value)
        const contactError = phoneValidator(contact.value);
        if (nameError || emailError || passwordError || descriptionError || contactError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setDescription({ ...description, error: descriptionError })
            setContact({ ...contact, error: contactError })
            return;
        }

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {

                const user = userCredential.user;

                const userData = {
                    name: name.value,
                    email: email.value,
                    phone: contact.value,
                };

                addDoc(collection(db, "users"), userData)
                    .then((docRef) => {
                        const userId = docRef.id;
                        console.log("User data added to Fire store");

                        const data = {
                            userId: userId,
                            email: email.value,
                            name: name.value,
                            description: description.value,
                            contact: contact.value,
                            address: "48, New Kandy Road, Malabe.",
                            since: '2000',
                            latitude: 93.45,
                            longitude: 89.32,
                            acceptsDropOff: true,
                            openFromForDropOff: new Date().setHours(6, 0, 0),
                            openToForDropOff: new Date().setHours(20, 0, 0),
                            image: "https://media.istockphoto.com/id/1157179147/photo/checking-oil-in-car-engine.jpg?s=612x612&w=0&k=20&c=UlpxPn7pkghIG3FC7ldhwtFIBwEf6eJOfiUTM_nn8JI=",
                            recyclingMaterials: ["Plastic", "Paper"],
                            License: ["Environmental Protection License from Central Environment Authority",],
                        };

                        addDoc(collection(db, 'recuycleCompanies'), data)
                        .then(() => {
                            console.log("User data added to Fire store");
                        })
                    })
                    .catch((error) => {
                        console.error("Error adding user data to Fire store: ", error);
                    });

                navigation.reset({
                    index: 0,
                    routes: [{ name: "RecycleCenterBottomNavBar" }],
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error signing up: ", errorCode, errorMessage);
            });
    }

    return (
        <View>
            <Text style={styles.header}>Sign Up</Text>
            <View
                style={{
                    margin: 20,
                    paddingTop: 40,
                }}
            >
                <TextInput
                    label="Company Name"
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
                    label="Description"
                    returnKeyType="next"
                    value={description.value}
                    onChangeText={(text) => setDescription({ value: text, error: "" })}
                    error={!!description.error}
                    errorText={description.error}
                />
                <TextInput
                    label="Contact"
                    returnKeyType="next"
                    value={contact.value}
                    onChangeText={(text) => setContact({ value: text, error: "" })}
                    error={!!contact.error}
                    errorText={contact.error}
                />
                <Button text="Sign Up" onPress={handleSignUpButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
    container: {
        marginTop: 80,
    },
    input: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: "gray"
    }
});

export default RecycleCenterSignUp;
