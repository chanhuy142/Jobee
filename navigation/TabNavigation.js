import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import { Entypo } from '@expo/vector-icons';
import {SafeAreaView, View, Text, Button, TextInput,TouchableOpacity,ScrollView } from "react-native";
import CadidatesSreen from '../screens/CadidatesSreen';
const screenOptions= {
    tabBarShowLabel: false,

}
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    
                    tabBarIcon: ({focused}) => (
                        <View className= " justify-center items-center">
                            <Entypo name="home" size={24} color={focused ? '#FCE353' : 'gray'}></Entypo>
                            {
                                focused ? <Text className="text-yellow-600">Home</Text>:
                                <Text className="text-gray-500">Home</Text>

                            }
                        </View>
                        
                    ),
                }}
            />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Candidates" component={CadidatesSreen} />
        </Tab.Navigator>
    );
}
export default TabNavigation;