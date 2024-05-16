import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Card from '../components/Card';
import {  getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { useState, useEffect, useLayoutEffect  } from 'react';
import {  addDoc, doc, getDocs, onSnapshot,getDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import Swiper from 'react-native-deck-swiper';
const HomeScreen = () => {
    const auth = getAuth();
     
    
    const [data, setData] = useState([])
    
    useEffect( () => {
      console.log("effect triggered")
      let unsubscribe

      const fetchData = async () => {
        unsubscribe = onSnapshot(collection(db, "jobs"), (snapshot) => {
          
          setData(snapshot.docs.map((doc)=>{
            let job={
              id: doc.id,
              detail: doc.data()
            };
            return job;
          }))


        })
      }// end of fetchData

      fetchData()
      //return unsubscribe
      
    }, [])

    const onSwipedRight =async (cardIndex) => {
      
      const userdocRef=doc(db, "users", auth.currentUser.uid)
      const userdocSnap = await getDoc(userdocRef)
      
      const jobdocRef=doc(db, "jobs", data[cardIndex].id)

      //add user to job's matched list
      await addDoc(collection(jobdocRef, "matched"), userdocSnap.data() )
    }

    
    

  return (
    <View className= "flex-1">
      
      {
        

       data.length>0?<Swiper
        containerStyle={
          {
            backgroundColor: "transparent",
          }
        }
        cards={data}
        renderCard={(card) => {
          return  (
            <Card carddata={card} />
          )
        }}
        onSwipedRight={onSwipedRight}
        onSwipedLeft={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('onSwipedAll')}}
        cardIndex={0}
        verticalSwipe={false}
        stackSize= {data.length}
        
        
        ></Swiper>: <Text>Loading...</Text>
      }
      

    </View>
  )
}

export default HomeScreen