import { View, Text, Image,TouchableWithoutFeedback,StyleSheet} from 'react-native'
import {useState} from 'react'

import React from 'react'

const Card = (props) => {
  
    const carddata = props.carddata
    const [mode, setMode] = useState(0) //0 for image, 1 job description
  return (
    <TouchableWithoutFeedback onPress={()=>{setMode(!mode)}}>
      
      <View className= "h-3/4 rounded-2xl relative " style={{shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 8,}}>
        {!mode? <><Image source={{uri: carddata.detail.imageuri}} className = " absolute h-full w-full rounded-2xl " resizeMode='stretch' ></Image>
        <Text className="text-3xl text-white font-bold absolute bottom-20 left-10" style={styles.textWithShadow}>{carddata.detail.company}</Text>
        <Text className="text-3xl text-white absolute bottom-10 left-10" style={styles.textWithShadow}>{carddata.detail.pos}</Text></> :
        <>  
        <View className = " absolute h-full w-full rounded-2xl bg-slate-400 p-4 ">
        <Text className="text-lg text-black">{carddata.detail.description}</Text>
        </View>
        
        </>
      }

    
          

      </View>
    </TouchableWithoutFeedback>
    
  )
}
const styles = StyleSheet.create({
  textWithShadow:{
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
  }
});
export default Card