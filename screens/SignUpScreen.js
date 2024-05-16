import {SafeAreaView, View, Text, Button, TextInput,TouchableOpacity, TouchableWithoutFeedback,ScrollView } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import {createUserWithEmailAndPassword,getAuth } from "firebase/auth";

import React from "react";
import { db, auth } from "../firebaseConfig";

function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confỉrmPassword, setConfirmPassword] = useState('')
    const [TermsAgreement, setTermsAgreement] = useState(false)
    //secure state
    const [secure, setSecure] = useState(true)
    //toggle secure
    const toggleSecure = () => {
        setSecure(!secure)
        
    }
    const toggleTermsAgreement = () => {
        setTermsAgreement(!TermsAgreement)
    }
    const checkconfirmPassword = () => {
        return password === confỉrmPassword
    }
    
    const signup =async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setDoc(doc(db, "users",user.uid), {
                username: username,
                email: email,
                uid: user.uid,
              })
                .catch((error) => {
                console.error("Error adding document: ", error);
                }
            );
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
    return (
        <SafeAreaView  >
            <ScrollView className="h-full">
            <View className="px-6 pt-10">
                <Text className="text-5xl">Just a few more steps, new friend</Text>
                <View className="h-1/6"></View>

                <View className="flex flex-row items-center">
                    <TextInput className="border-2 border-gray-300 text-2xl flex-1  my-2 py-3 px-6 rounded" 
                    placeholder="Username" 
                    
                    value={username}
                    onChangeText={setUsername}/>
                </View>

                <View className="flex flex-row items-center">
                    <TextInput className="border-2 border-gray-300 text-2xl flex-1  my-2 py-3 px-6 rounded" 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    value={email}
                    onChangeText={setEmail}/>
                </View>
                <View className="flex flex-row items-center">
                    <TextInput className="border-2 border-gray-300 text-2xl flex-1  py-3 px-6 my-2 rounded" 
                        placeholder="Password" 
                        secureTextEntry={secure} 
                        value={password}
                        onChangeText={setPassword} />
                    {   secure?
                        <Entypo name="eye" size={24} color="black" style={{position:"absolute", right:20}} onPress={toggleSecure} />:
                        <Entypo name="eye-with-line" size={24} color="black" style={{position:"absolute", right:20}} onPress={toggleSecure} />
                    }
                </View>
                <View className="flex flex-row items-center">
                    <TextInput className="border-2 border-gray-300 text-2xl flex-1  py-3 px-6 my-2 rounded" 
                        placeholder="Confirm Password" 
                        secureTextEntry={secure} 
                        value={confỉrmPassword}
                        onChangeText={setConfirmPassword} />
                    {   secure?
                        <Entypo name="eye" size={24} color="black" style={{position:"absolute", right:20}} onPress={toggleSecure} />:
                        <Entypo name="eye-with-line" size={24} color="black" style={{position:"absolute", right:20}} onPress={toggleSecure} />
                    }
                </View>
                {!checkconfirmPassword()?<Text className="text-red-600">Confirm password is not correct</Text>:null}

                <TouchableWithoutFeedback onPress={toggleTermsAgreement}>
                    
                    <View className="flex-row items-center ">
                    {TermsAgreement?<FontAwesome name="check-square" size={30} color="black" />:<FontAwesome name="square-o" size={30} color="black" />}
                    <Text className="text-xl  ml-2">I agree to the</Text>
                    <Text className="text-xl  text-yellow-500 ml-1">Terms of Service</Text>
                    </View>
                    
                </TouchableWithoutFeedback>
                
                <View style={{height:"10%"}}></View>
                
                    
                <TouchableOpacity onPress={signup}>
                <View style={{backgroundColor:"#FCE353", height:56, justifyContent:"center", alignItems:"center", borderRadius:8}}>
                    <Text className="text-2xl font-bold">Login</Text>
                </View>
                </TouchableOpacity>

                
            </View>
            </ScrollView>
            
            
            
            
        </SafeAreaView>
    );
}

export default SignUpScreen;