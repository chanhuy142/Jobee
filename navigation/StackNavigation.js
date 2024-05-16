import  { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import { useState } from 'react';

import { db, auth } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
const stack = createStackNavigator();
const StackNavigation = () => {
    const [user_uid, setUser_uid] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      setUser_uid(user.uid)
      console.log("User is signed in")
      // ...
    } else {
      // User is signed out
      setUser_uid("")
      console.log("User is signed out")
      // ...
    }
  });
    return (
        <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginScreen'>
            {user_uid ? (<stack.Screen name="TabNavigation" component={TabNavigation} />):
              (<> 
              <stack.Screen name="LoginScreen" component={LoginScreen} />
              <stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
              )
            }
    
        </stack.Navigator>
    );
}
export default StackNavigation;
 