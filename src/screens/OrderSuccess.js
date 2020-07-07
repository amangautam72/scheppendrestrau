import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Image, Switch, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, Left, Header, Icon, Right, Spinner } from 'native-base';

// import vegIcon from '../assets/images/veg_icon.svg';
// import nonVegIcon from '../assets/images/nonveg_icon.svg';
// import beKindBadge from '../assets/images/bekindbadge.svg';
// import note from '../assets/images/note.svg';

import { useSelector, useDispatch } from 'react-redux'


import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

import { callOrdersApi } from '../ActionCreators/OrderActions';
import { getGeneratedBill } from '../Services/Requests';
// import RatingModal from '../components/Rating'; 



const OrderSuccess = ({ navigation, route }) => {

    const {restaurantcode, tableid } = route.params

    // const resInfo = route.params ? route.params.resInfo : null;
    // const tableid = route.params ? route.params.tableid : null;
    //const getBill = route.params ? route.params.getBill : false;
    const [getBill, setGetBill] = useState(route.params ? route.params.getBill : false)
    //const [orders, setOrders] = useState([])
    const [orderid, setOrderId] = useState(0)
    const [comment, setComment] = useState('')
    const [bill, setBill] = useState({ Payamount: 0, Discount: 0, service_charge: 0, tax: 0 })
    const [loading, setLoading] = useState(true);
    const [isRatingVisibile, setRatingVisibility] = useState(false);
    const [payOptionVisibility, setPayOptionVisibility] = useState(false);


    const response = useSelector(state => state)
    const dispatch = useDispatch()

    const { orders } = response.orderReducer

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          
          // if(sections.length > 0 ){
          //   checkCart(sections)
          // }
    
          dispatch(callOrdersApi(restaurantcode,tableid))

          if(getBill){
            console.log("FOCUSED  " + JSON.stringify(getBill))
              generateBill()
          }
  
        })
        return unsubscribe
      }, [navigation])


    const generateBill = () => {
        setLoading(true)
        getGeneratedBill(restaurantcode,tableid).then((res) => {
            console.log("RES :" + JSON.stringify(res))

            if (res.status == '1') {
                setBill(res)
                setGetBill(true)
                setLoading(false)
                //screenX(1)
                setPayOptionVisibility(true)
                navigation.setParams({getBill:false})
            } else {
                setLoading(false)
            }
        }).catch(err => setLoading(false))
    }

    const onPayNowClick = () => {

       if(!getBill){
            generateBill(orderid)
       }else{
          if(!payOptionVisibility){
            setPayOptionVisibility(true)
          }else{
            setPayOptionVisibility(false)
          }
          
       }
        
    }



    const renderContent = () => {
        return (
            orders.map((item) =>
                <View key={item.id} style={{ paddingLeft: 20, paddingRight: 20 }}>

                    {space(10)}

                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image resizeMode='contain' style={{ width: 10, height: 10 }} source={item.is_veg ? vegIcon : nonVegIcon}></Image> */}

                        <Text style={{ flex: 1, fontWeight: '700', paddingLeft: 10 }}>{`${item.name}\n`}<Text style={{ color: Colors.lightGrey, fontWeight: 'normal' }}>{`Quantity: ${item.quantity}`}</Text></Text>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', alignSelf: 'center' }}>{`${'\u20B9'} ${item.cost}`} </Text>

                    </View>

                    {space(10)}

                    <View style={{ padding: 1, backgroundColor: '#f2f2f2' }}></View>
                </View>
            )

        );
    };




    const space = (amount) => {
        return <View style={{ padding: amount }}></View>
    }

    const onBack = () => {
        navigation.goBack() 
        
    }


    return (
        <View
            style={styles.container}
        >
            <ScrollView style={{ height: Layout.window.height }}>
                <View >

                    <Header style={{ backgroundColor: 'white', paddingLeft: 20, paddingRight: 20 }}>
                        <Left>
                            <Icon
                                onPress={onBack}
                                name="ios-arrow-round-back"></Icon>
                        </Left>


                        <Right>
                        <Icon 
                        onPress={() => setRatingVisibility(true)}
                        style={{fontSize:20}}
                         name="md-heart-empty"></Icon> 



                        </Right>

                    </Header>


                    <View style={{ height: 0.5, backgroundColor: Colors.lightGrey }}></View>



                    {space(8)}



                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>

                        <View style={{ flex: 1 }}>

                            <Text style={{ fontSize: 22, letterSpacing: -0.15, lineHeight: 25, fontWeight: '700' }}>{'Demo Restaurant'}</Text>
                            {/* <Text style={{ lineHeight: 25 }}>Best in: Beer, Pizza, Pasta, Butter Chicken...</Text> */}
                            <Text style={{ color: Colors.lightGrey, lineHeight: 25, fontWeight: '400' }}>{'Sector 7'}</Text>

                        </View>
                        {/* <View >

                        <Text style={{ color: 'white', backgroundColor: Colors.green, padding: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>4.9 <Icon name='ios-star' style={{ color: 'white', fontSize: 16 }}></Icon> </Text>

                        <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', borderWidth: 0.1, borderColor: Colors.lightGrey, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>{`${'\u20B9'} 1900`} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{`\nFor Two`}</Text></Text>
                    </View> */}

                    </View>

                    {space(6)}

                    <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: Colors.blue, borderRadius: 5, padding: 10, alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 22, color: Colors.blue, fontWeight:'600' }}>NOTE</Text>
                        <Text style={{ flex: 1, fontSize: 10, color: Colors.blue, padding: 5,paddingLeft:10 }}>{`You can't modify your order once you have placed it but you definitely order more by going back to the menu page. Have a Happy Meal.`}</Text>

                    </View>


                    {renderContent()}


                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>




                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    {/* <Image resizeMode='contain' style={{ width: 17, height: 17 }} source={note}></Image> */}
                        <Text style={{ flex: 1, fontSize: 11, color: Colors.lightGrey, padding: 10,fontFamily:'PROXIMANOVA-REG' }}>{'comment'}</Text>

                    </View>


                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>




                    <View style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                            <Text style={{ flex: 1, fontFamily:'PROXIMANOVA-SBOLD' }}>{`Support our waiters\n`}<Text style={{fontSize:10, color: Colors.lightGrey,fontWeight:'400' }}>{`How it works`}</Text></Text>

                            

                        </View>

                        {space(5)}

                        <Text style={{ flex: 1, fontSize: 10,fontWeight:'400' }}>{`You can show a gesture of kind efforts towards your waiter for helping you\nenjoy safely. Support them through these tough times with a tip.`}</Text>


                        {space(5)}

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                            <TouchableOpacity style={{ margin: 10, padding: 20, paddingLeft: 30, paddingRight: 30, borderWidth: 0.5, borderColor: Colors.lightGrey, borderRadius: 5 }}>
                                <Text style={{ fontWeight: '500', fontFamily:'PROXIMANOVA-SBOLD'}}>{`${'\u20B9'} 20`} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10, padding: 20, paddingLeft: 30, paddingRight: 30, borderWidth: 0.5, borderColor: Colors.lightGrey, borderRadius: 5 }}>
                                <Text style={{ fontWeight: '500',fontFamily:'PROXIMANOVA-SBOLD' }}>{`${'\u20B9'} 30`} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10, padding: 20, paddingLeft: 30, paddingRight: 30, borderWidth: 0.5, borderColor: Colors.lightGrey, borderRadius: 5 }}>
                                <Text style={{ fontWeight: '500',fontFamily:'PROXIMANOVA-SBOLD' }}>{`${'\u20B9'} 50`} </Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>




                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                   
                        
                        <TextInput
                            style={{ flex: 1, fontSize: 11, padding: 10,fontFamily:'PROXIMANOVA-REG' }}
                            placeholder='Have any Coupon?'
                            placeholderTextColor={Colors.lightGrey}
                            onChangeText={text => setComment(text)}
                            value={comment}
                        />

                    </View>


                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>


                    {getBill &&




                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                            {space(10)}

                            <Text style={{ flex: 1, fontFamily:'PROXIMANOVA-SBOLD' }}>{`Bill Details`}</Text>
                            {space(8)}
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ flex: 1,fontFamily:'PROXIMANOVA-REG' }}>{`Bill Items`}</Text>
                                <Text style={{fontFamily:'PROXIMANOVA-REG'}}>{`${'\u20B9'} ${bill.Payamount}`} </Text>
                            </View>


                            {space(6)}


                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ flex: 1,fontFamily:'PROXIMANOVA-REG' }}>{`Taxes & Charges (18% GST)`}</Text>
                                <Text style={{fontFamily:'PROXIMANOVA-REG'}}>{`${'\u20B9'} ${Math.round((bill.tax + bill.service_charge) * 100) / 100}`} </Text>
                            </View>

                            {space(6)}


                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ flex: 1,fontFamily:'PROXIMANOVA-REG' }}>{`Discounts`}</Text>
                                <Text style={{fontFamily:'PROXIMANOVA-REG'}}>{`${'\u20B9'} ${bill.Discount}`} </Text>
                            </View>

                            {space(6)}
                        </View>




                    }


                </View>


                {space(20)}

            </ScrollView>

            <View style={{ position: 'absolute', bottom: 20,alignSelf:'center'}}>
               {payOptionVisibility && <View style={{borderWidth:1,borderColor:'#ffdd00',borderRadius:5, padding:10, backgroundColor:'white', marginBottom:10,shadowColor: '#ffdd00',
    
            shadowOpacity: 0.6,
            shadowRadius: 8,
             }}>
              <TouchableOpacity style={{flexDirection:'row', padding:12}}>
                  {/* <Image resizeMode="contain" style={{height:13,width:21, marginRight:10}} source={require('../assets/images/pay.png')}></Image> */}
                  <Text style={{fontSize:10,fontWeight: '400'}}>Online Payment</Text>
            </TouchableOpacity>  
            <View style={{height:1,backgroundColor:'#F2F2F2',margin:5}}></View>
            <TouchableOpacity style={{flexDirection:'row', padding:12}}>
                    {/* <Image resizeMode="contain" style={{height:13,width:21, marginRight:10}} source={require('../assets/images/money.png')}></Image> */}
                  <Text style={{fontSize:10,fontWeight: '400'}}>Ask for bill? Cash Payment</Text>
            </TouchableOpacity> 
            </View>     
}
            <TouchableOpacity
                onPress={onPayNowClick}
                style={{ flexDirection: 'row', padding: 12, backgroundColor: '#ffdd00', alignSelf: 'stretch', borderRadius: 5, alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', letterSpacing: 0.2 }}>Pay Now!</Text>
                {space(10)}
                {getBill && <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 18, width: 1, backgroundColor: Colors.lightGrey }}></View>
                    {space(5)}
                    <Text style={{ textAlign: 'center', padding: 5, fontWeight: '700', letterSpacing: 0.2 }}>{`${'\u20B9'} ${bill.Payamount}`}</Text>
                </View>
                }
            </TouchableOpacity>

            </View>        


            {/* {loading && <Spinner style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: Layout.window.height, backgroundColor: 'rgba(52, 52, 52, 0.3)' }} />} */}



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


export default OrderSuccess   