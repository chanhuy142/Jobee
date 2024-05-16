import { View, Text, FlatList } from 'react-native'
import { useEffect,useState,useLayoutEffect } from 'react'
import React from 'react'
import {  getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import {  addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { collection,query, where } from 'firebase/firestore';
import { useIsFocused } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const ItemView = ({item}) => {
    return (
        <View className= "bg-slate-300 p-4 m-2 rounded-xl flex-row items-center">
            <View className="bg-white rounded-full p-1 mr-2">
                <Feather name="user" size={24} color="black"  />  
            </View>
          
            <View>
                <Text className="text-lg font-bold">{item.detail.username}</Text>
                <Text className="text-sm">{item.detail.email}</Text>
                <Text className="text-sm">Job applied: {item.job.pos}</Text>
            </View>
            <View className=" rounded-full p-1 mr-2 absolute right-3" >
                <Feather name="mail" size={24} color="black" />
            </View>
        </View>
    )
    }

const CadidatesSreen = () => {
    const isFocused = useIsFocused();
    const auth = getAuth();
    const generateID = () => {
        return Math.random().toString(36).substr(2, 9);
    }
    const [data, setData] = useState([])
    datatest = [ {name: 'John Doe'}, {name: 'Jane'}]
    useEffect(() => {
        
        const fetchData = async () => {
            const jobposted = await getDocs(collection(db, "jobs")).then((snapShot)=>snapShot.docs.filter(
                (doc)=>doc.data().uid===auth.currentUser.uid
            ).map((doc)=>{return{...doc.data(), id: doc.id}}));
            //get all matched candidates for each job
            let matchedcandidates = []
            for (let i=0; i<jobposted.length; i++){
                const matchedcandidatesRef = collection(db, "jobs", jobposted[i].id, "matched")
            const matched= onSnapshot(matchedcandidatesRef, (snapshot) => {
                setData(snapshot.docs.map((doc)=>{
                    let candidate={
                        id: doc.id,
                        job: jobposted[i],
                        detail: doc.data()
                    };
                    console.log(candidate)
                    return candidate;
                }))
            })
            }


            
        }
        fetchData()
        
        
    }, [isFocused])

    

    
  return (
    <View>
      {data.length>0?
        <FlatList
        data={data}
        renderItem={({item}) => <ItemView item={item} />}
        keyExtractor={item => item.id}
        />
        :<Text className="text-center">loading</Text>
        }
        
    </View>
  )
}

export default CadidatesSreen