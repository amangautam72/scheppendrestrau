import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Switch, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Left, Header, Icon, Right, Spinner } from 'native-base';


import Accordion from 'react-native-collapsible/Accordion';

import { useSelector, useDispatch } from 'react-redux'

import { addToCart, removeItem, subtractQuantity, addQuantity } from '../ActionCreators/CartActions'
import { callMenuApi } from '../ActionCreators/FetchMenuActions'
import { callOrdersApi } from '../ActionCreators/OrderActions';


import vegIcon from '../assets/images/veg.png';
import nonVegIcon from '../assets/images/nonveg.png';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout'


const DATA = [0,1,2,3,4]

const HomeScreen = ({ navigation, route }) => {

  const { restaurantcode, tableid } = route.params

  const [resLocation, setResLocation] = useState('')
  const [resDetails, setResDetails] = useState({ name: '', locality: '', raffle: false, configs: {} })
  const [sections, setSections] = useState([])
  const [activeSections, setActiveSections] = useState([0])
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaceOrderVisible, setPlaceOrderVisible] = useState(false);
  const [isPayNowVisible, setPayNowVisible] = useState(false);
  const [isVegOn, setVegFilter] = useState(false);
  const [isNonVegOn, setNonVegFilter] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [isOrderOpen, setOrderOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const response = useSelector(state => state)
  const dispatch = useDispatch()

  const { total } = response.cartReducer
  const { order_status, orderid, orders } = response.orderReducer


  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize',handleResize)
  })

  useEffect(() => {
    //setSections(response.cartReducer.data)

    dispatch(callMenuApi(restaurantcode))
  }, []);

  useEffect(() => {
    setSections(response.menuReducer.data)

  }, [response.menuReducer]);

  useEffect(() => {
    setOrderOpen(order_status)
  }, [response.orderReducer]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log("FOCUSED  " + JSON.stringify(sections))
      // if(sections.length > 0 ){
      //   checkCart(sections)
      // }

      dispatch(callOrdersApi(restaurantcode, tableid))
    })
    return unsubscribe
  }, [navigation])


  const toggleVegSwitch = () => {
    setVegFilter(previousState => !previousState)
    setNonVegFilter(false)
  };
  const toggleNonVegSwitch = () => {
    setNonVegFilter(previousState => !previousState)
    setVegFilter(false)
  };


  const renderSectionTitle = section => {
    return (
      <View >
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.catname}</Text>
          <Icon style={{ fontSize: 14, color: Colors.blue }} name="ios-arrow-down"></Icon>
        </View>
        <View style={{ padding: 1, backgroundColor: '#f2f2f2' }}></View>
      </View>
    );
  };


  const renderSectionContent = section => {
    return (
      //section.items.data.map((item, index) => renderContent(item, index))

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 20 }}
        data={section.item}
        renderItem={({ item, index }) => renderContent(item)}
        keyExtractor={item => item.id.toString()}
      />

    );
  };

  const addCart = (item) => {
    item.cartQuantity += 1


    if (item.cartQuantity == 1) {
      dispatch(addToCart(item))
    }
    else {
      dispatch(addQuantity(item))
    }

  }

  const removeFromCart = (item) => {
    item.cartQuantity = item.cartQuantity - 1



    if (item.cartQuantity == 0) {
      dispatch(removeItem(item))
    } else {

      dispatch(subtractQuantity(item))
    }
  }

  const renderContent = (item) => {

    if (isVegOn) {
      return item.Is_veg == 1 && renderItem(item)
    }else if(isNonVegOn){
      return item.Is_veg != 1 && renderItem(item)
    }
       
    return renderItem(item)
    
  };



  const renderItem = (item) => {

    return (
      <View style={{ flexDirection: 'row', padding: 15, paddingLeft: 20, paddingRight: 20, backgroundColor: !item.In_stock && '#F2F2F2' }}>
        <Image resizeMode='contain' style={{ width: 10, height: 10 }} source={item.Is_veg ==1 ? vegIcon : nonVegIcon}></Image>

        <Text style={{ flex: 1, paddingLeft: 10, fontWeight: '500' }}>{`${item.name}  `}
          {/* {Array(item.spice_level).fill(0).map(() => item.spice_level != null && <Image style={{ width: 9, height: 11 }} source={chillyIcon}></Image>)} */}
          {`\n`}
          <Text style={{ color: Colors.lightGrey, }}>{`${item.description}`}</Text></Text>
        <Text style={{ textAlign: 'center', marginRight: 10, fontWeight: '500' }}>{`${'\u20B9'} ${item.cost}`} </Text>


        {item.In_stock && <View>
          {item.cartQuantity < 1 ?

            <TouchableOpacity
              onPress={() => addCart(item)}
              style={{ alignSelf: 'baseline', paddingLeft: 5, paddingRight: 5, borderWidth: 1, borderColor: Colors.blue }}>

              <Icon name='md-add' style={{ fontSize: 15, color: Colors.blue, padding: 5, }}></Icon>
            </TouchableOpacity>

            :

            <View style={{ flexDirection: 'row', alignSelf: 'baseline', borderWidth: 0.5, borderColor: Colors.blue, paddingLeft: 5, paddingRight: 5, alignItems: 'center', justifyContent: 'center' }}>
              
              <TouchableOpacity onPress={() => addCart(item)} >
                <Icon

                  name='md-add' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5, borderLeftWidth: 0.1, borderRightWidth: 0.1, borderColor: "#f2f2f2" }}></Icon>
              </TouchableOpacity>

              <Text style={{ fontSize: 12, padding: 5 }}>{item.cartQuantity}</Text>

              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <Icon
                  //onPress={() => removeFromCart(item, index)} 
                  name='md-remove' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5 }}></Icon>
              </TouchableOpacity>

            </View>

          }
        </View>
        }
      </View>

    );

  }

  const updateSections = activeSections => {
    setActiveSections(activeSections)
  };



  const space = (amount) => {
    return <View style={{ padding: amount }}></View>
  }



  return (
    <View
      style={styles.container}
    >


      <ScrollView style={{ height: Layout.window.height }}>





        <Header style={{ backgroundColor: 'white', paddingLeft: 20, paddingRight: 20 }}>
          <Left>
            <Icon
              style={{ fontSize: 22 }}
              name="ios-person"></Icon>

          </Left>


          <Right>
            <Icon onPress={() => navigation.navigate('OrderSuccess', {getBill:false, ...route.params })}
              style={{ fontSize: 20 }}
              name="md-heart-empty"></Icon>
            {/* <TouchableOpacity onPress={() => setRatingVisibility(true)}>
            <Image resizeMode='contain' style={{width:20, height: 15 }} source={require('../assets/images/heart.png')}></Image>  
            </TouchableOpacity>   */}
            {space(10)}
            <Icon
              // onPress={() => setSearchVisibility(true)}
              style={{ fontSize: 22 }}
              name="ios-search"></Icon>

          </Right>

        </Header>


        <View style={{ height: 0.2, backgroundColor: Colors.lightGrey }}></View>



        {/* {space(8)} */}

        <View
          style={{ padding: 20 }}
        >






          <View >

            <Text style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.15, lineHeight: 25, }}>{"Demo Restaurant"}</Text>
            {/* <Text style={{ lineHeight: 25 }}>Best in: Beer, Pizza, Pasta, Butter Chicken...</Text> */}
            <Text style={{ color: Colors.lightGrey, lineHeight: 25, }}>{"Sector 7"}</Text>

          </View>

          {space(6)}

          <Image resizeMode='contain' style={{width:Layout.window.width*.9, height:150, alignSelf:'center', borderWidth:1, borderColor:Colors.lightGrey, borderRadius:5}} source={require('../assets/images/banner.png')}></Image>


          {space(6)}

          <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: Colors.blue, borderRadius: 5, padding: 10, alignItems: 'center', marginTop: 10, marginBottom: 2 }}>
            {/* <Text style={{ fontSize: 22, color: Colors.blue,  }}>NOTE</Text> */}
            <Text style={{ flex: 1, fontSize: 10, color: Colors.blue, padding: 5, paddingLeft: 10 }}>{`Body Temperature of our waiter has been checked in the morning & it was under safe limits.`}</Text>

          </View>






        </View>


        {/* <View style={{ padding: 10, backgroundColor: '#f2f2f2' }}></View> */}


        <View >


          <View style={{ height: 0.1, backgroundColor: Colors.lightGrey }}></View>


          {space(6)}


          <View>
            <View style={{ flexDirection: 'row', padding: 10 }}>

              <Switch
                style={{ marginLeft: 5 }}
                //trackColor={{ false: "#000", true: 'grey' }}
               // thumbColor={isVegOn ? Colors.green : Colors.lightGrey}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleVegSwitch}
                value={isVegOn}
              />

              <Text style={{ fontWeight: '400', marginLeft: 10 }}>Veg Only</Text>

            </View>

            <View style={{position:'absolute',right:10, flexDirection: 'row', padding: 10 }}>

            <Text style={{ fontWeight: '400', marginRight: 10 }}>NonVeg Only</Text>
              <Switch
                style={{ marginLeft: 5 }}
                //trackColor={{ false: "#000", true: Colors.green }}
                thumbColor={isNonVegOn ? Colors.green : Colors.lightGrey}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNonVegSwitch}
                value={isNonVegOn}
              />

              

            </View>

          </View>



          {/* {space(5)} */}

          {/* <View style={{ padding: 10, backgroundColor: '#f2f2f2' }}></View> */}




          <Accordion
            underlayColor={'white'}
            sections={sections}
            activeSections={activeSections}
            //renderSectionTitle={renderSectionTitle}
            renderHeader={renderSectionTitle}
            renderContent={renderSectionContent}
            onChange={updateSections}
          />


        </View>


      </ScrollView>

      {total != 0 &&
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center', alignItems: 'center' }}>



          <TouchableOpacity
            onPress={() => navigation.navigate('Cart', { ...route.params, orderInfo: JSON.stringify(response.orderReducer) })}
            style={{ flexDirection: 'row', padding: 10, backgroundColor: Colors.darkBlue, alignSelf: 'center', borderRadius: 5, alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', letterSpacing: 0.2 }}>Place Order</Text>
            {space(10)}
            <View style={{ height: 18, width: 1, backgroundColor: Colors.lightGrey }}></View>
            {space(5)}
            <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'white' }}>{`${'\u20B9'} ${total}`}</Text>
          </TouchableOpacity>

        </View>
      }

      {isOrderOpen && total == 0 &&

        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center', alignItems: 'center' }}>


          {/* <TouchableOpacity >
            <Image style={{ width: 60, height: 80 }} source={menuIcon}></Image>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderSuccess', { getBill: true, ...route.params })}
            style={{ flexDirection: 'row', padding: 15, backgroundColor: '#ffdd00', alignSelf: 'center', borderRadius: 5, alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', letterSpacing: 0.2 }}>Pay Now!</Text>
          </TouchableOpacity>

        </View>

      }



      {/* {loading && <Spinner style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: Layout.window.height, backgroundColor: 'rgba(52, 52, 52, 0.3)' }} />} */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
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
    fontWeight: '700',
    letterSpacing: -0.11
  }

});


export default HomeScreen   
