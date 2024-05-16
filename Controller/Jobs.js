import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Card from '../components/Card';
import {  getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { useState, useEffect  } from 'react';
import { get } from 'firebase/database';
import {  getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
const getData= async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const resdata=[]
    
    querySnapshot.forEach((doc) => {
      //parse the data and set the state
      resdata.push(doc.data())
    });
    return resdata
    
}

export {getData}