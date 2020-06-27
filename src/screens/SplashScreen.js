import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Image, Switch, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';


import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

import { getRestaurant } from '../Services/requests';



const SplashScreen = ({ navigation, route }) => {

  const { restaurantcode, tableid, userImageUri } = route.params
  const [logo, setLogo] = useState('');
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');


  useEffect(() => {

    localStorage.setItem('RESCODE', restaurantcode)
    getRestaurantDetails()




  }, []);

  const getRestaurantDetails = () => {

    getRestaurant(restaurantcode, tableid, idToken).then((res) => {

      console.log("RESINFO : " + JSON.stringify(res))


      if(res.status == "1"){

      

      //setLogo(`http://serene-lake-49953.herokuapp.com/image${res.logo_url}`)
      setName(res.data.name)
      setLocality(res.data.location)
      }



      setTimeout(() => {
        navigation.replace('Home', { ...route.params, userImage: userImageUri, resName: res.name, resLocality: res.locality, raffle: res.raffle, waitertemp: waiterTemperature, waitername: waiterName, waiterimage: waiterImage, configs: resconfig, contests: JSON.stringify(contestPrizes), contestendtime: contestEndTime })
      }, 4000)



    }).catch((err) => console.log(err))





  }






  const space = (amount) => {
    return <View style={{ padding: amount }}></View>
  }


  return (
    <View
      style={styles.container}
    >

      {space(60)}

      <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={{ uri: logo }}></Image>
      {/* {space(10)} */}

      <Text style={{ fontSize: 22, alignSelf: 'center', fontFamily: 'PROXIMANOVA-BOLD' }}>{name}</Text>
      {space(2)}
      <Text style={{ fontSize: 12, alignSelf: 'center', color: Colors.lightGrey, fontFamily: 'PROXIMANOVA-REG' }}>{locality}</Text>


      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 40 }}>

        <View>
          <Text style={{ fontSize: 12, alignSelf: 'center' }}>{`From`}</Text>
          {space(5)}
          <Text style={{ fontSize: 26, fontWeight: 'bold', alignSelf: 'center', color: Colors.blue }}>{`DINEX`}</Text>
        </View>

      </View>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  textStyle: {
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.07
  },
  header: {
    flexDirection: 'row',
    padding: 20
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.11
  }

});


export default SplashScreen   