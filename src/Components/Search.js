import React, { useState, useEffect } from 'react';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Icon } from 'native-base';

import vegIcon from '../assets/images/veg.png';
import nonVegIcon from '../assets/images/nonveg.png';


const SECTIONS = [
  {
    id: 1,
    title: 'Add',
    content: 'Lorem ipsum...',
    price: 'Rs. 100',
    cartQuantity: 0
  },
  {
    id: 2,
    title: 'Second',
    content: 'Lorem ipsum...',
    price: 'Rs. 100',
    cartQuantity: 0
  },
];

const space = (amount) => {
  return <View style={{ padding: amount }}></View>
}

const SearchModal = (props) => {


  const [menu, setMenu] = useState([])
  const [filteredMenu, setFilteredMenu] = useState([])
  const [searchText, setSearchText] = useState('')


  useEffect(() => {

    console.log("EFFECT : " + JSON.stringify(props.menu))
    let sections = props.menu
    let menuList = []
    for (let i = 0; i < sections.length; i++) {
      let sectionItems = sections[i].item

      for (let j = 0; j < sectionItems.length; j++) {
        menuList.push(sectionItems[j])
      }

    }

    setMenu(menuList)

  },[])


  


  const search = (text) => {
    if (text.length > 1) {

     

      let filteredData = menu.filter(function (item) {
        return item.name.toLowerCase().includes(text.toLowerCase()) || item.tags != null && item.tags.trim().includes(text.toLowerCase())
      });


      setFilteredMenu(filteredData)
      

    }else{
      setFilteredMenu([])
    }

  }

  const searchItem = (text) => {
    setSearchText(text)
    search(text)

  }

  const addToCart = (item) => {

    props.addToCart(item)
    search(searchText)

  }

  const removeFromCart = (item) => {
    props.removeFromCart(item)
    //item.cartQuantity = item.cartQuantity + 1
    search(searchText)

  }


  const renderItem = ({ item }) => {

    return (
      <View style={{ flexDirection: 'row', padding: 15, paddingLeft: 20, paddingRight: 20, backgroundColor: !item.In_stock == 1 && '#F2F2F2' }}>
        <Image resizeMode='contain' style={{ width: 10, height: 10 }} source={item.Is_veg == 1 ? vegIcon : nonVegIcon}></Image>

        <Text style={{ flex: 1, fontWeight: '700', paddingLeft: 10 }}> {`${item.name}  `}
          {/* {Array(item.spice_level).fill(0).map(() => item.spice_level != null && <Image style={{ width: 9, height: 11 }} source={chillyIcon}></Image>)} */}
          {`\n`}
          <Text style={{ color: Colors.lightGrey, fontWeight: 'normal' }}>{`${item.description}`}</Text></Text>
        <Text style={{ textAlign: 'center', marginRight: 10, fontWeight: 'bold', }}>{`${'\u20B9'} ${item.cost}`} </Text>

        {item.cartQuantity < 1 ?
          <TouchableOpacity
            onPress={() => item.In_stock == 1 && addToCart(item)}
            style={{ alignSelf: 'baseline', paddingLeft: 5, paddingRight: 5, borderWidth: 1, borderColor: Colors.blue }}>

            <Icon name='md-add' style={{ fontSize: 15, color: Colors.blue, padding: 5, }}></Icon>
          </TouchableOpacity>

          :

          <View style={{ flexDirection: 'row', alignSelf: 'baseline', borderWidth: 0.5, borderColor: Colors.blue, paddingLeft: 5, paddingRight: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, padding: 5 }}>{item.cartQuantity}</Text>
            <TouchableOpacity
            onPress={() => addToCart(item)} 
            >
              <Icon

                name='md-add' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5, borderLeftWidth: 0.1, borderRightWidth: 0.1, borderColor: "#f2f2f2" }}></Icon>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => removeFromCart(item)}
            >
              <Icon
                //onPress={() => removeFromCart(item, index)} 
                name='md-remove' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5 }}></Icon>
            </TouchableOpacity>



          </View>
        }
      </View>

    );

  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.visibility}
      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>

      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: 'white', top: 200, borderTopLeftRadius: 20, borderTopRightRadius: 10, }}>


        <TextInput
          style={styles.input}
          placeholder={`Search in ${props.resName}`}
          placeholderTextColor="#ddd"
          onChangeText={(text) => searchItem(text)}
          value={searchText}
        />

        <Text style={{ fontSize: 16, fontWeight: '800', paddingLeft: 20 }}>Recommended</Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 20 }}
          data={filteredMenu}
          extraData={filteredMenu}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />


      </TouchableOpacity>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  service: {
    margin: 5, flexDirection: 'row', alignItems: 'center', padding: 5, borderWidth: 0.5, borderRadius: 5, paddingLeft: 15, paddingRight: 15
  },
  serviceText: {
    fontSize: 11
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    padding: 5,
    paddingLeft: 10,
    margin: 20,

    borderColor: Colors.blue,
    borderWidth: 1,
    borderRadius: 4,

  },

});



export default SearchModal