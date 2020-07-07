
import React, { useState, useEffect } from 'react';
import { Image, Switch, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import { Container, Left, Header, Icon, Right, Spinner } from 'native-base';

import { useSelector, useDispatch } from 'react-redux'
import { callMenuApi } from '../ActionCreators/FetchMenuActions'
import { addToCart, removeItem, subtractQuantity, addQuantity, updateCart } from '../ActionCreators/CartActions'

import vegIcon from '../assets/images/veg.png';
import nonVegIcon from '../assets/images/nonveg.png';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout'
import { placeOrder, modifyOrder } from '../Services/Requests';




const CartScreen = ({ navigation, route }) => {

    const { restaurantcode, tableid } = route.params

    const { orderInfo } = route.params
    const [isOrderOpen, setOrderOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [comment, setComment] = useState('')
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isRatingVisibile, setRatingVisibility] = useState(false);
    //const { resInfo, tableid } = route.params


    const response = useSelector(state => state)
    const dispatch = useDispatch()

    const { cartItems, total } = response.cartReducer


    useEffect(() => {
       
        setProducts(cartItems)

        const cart = localStorage.getItem('cart')
        const cartTotal = localStorage.getItem('total')

        
        if(cart != null && cartItems.length < 1){
            dispatch(updateCart(JSON.parse(cart),parseInt(cartTotal)))
        }

    }, []);

    useEffect(() => {
        setProducts(cartItems)
        storeCart()
    },[response.cartReducer])



    const onPlaceOrderClick = () => {
        let orderDetails = JSON.parse(orderInfo)

        let products = []
        for (let i = 0; i < cartItems.length; i++) {
            let product = {}
            let menuId = cartItems[i].id
            let quantity = cartItems[i].cartQuantity
            console.log("MENU : " + JSON.stringify(cartItems[i]))
            if (quantity > 0) {
                console.log("PRODUCT : " + JSON.stringify(product))
                product.itemid = menuId
                product.quantity = quantity
                products.push(product)
            }
        }

        /// console.log("PRODUCTS : "  + JSON.stringify(products))


        if (products.length < 1) {
            alert("Please add items to place order")
            return
        }


        if (orderDetails.orderid != 0) {

            modifyPlacedOrder(orderDetails.orderid, products)

        } else {
            placeNewOrder(products)
        }

    }

    const placeNewOrder = (products) => {
        setLoading(true)
        placeOrder(restaurantcode, tableid, total, products, '').then((res) => {
            console.log("RESPONSE = " + JSON.stringify(res))
            if (res.status == 1) {
                // clearCart()
                dispatch(callMenuApi(restaurantcode))
                dispatch(updateCart([], 0))
                setLoading(false)
                navigation.replace("OrderSuccess", { ...route.params, comment: comment })
            } else {
                setLoading(false)
            }

        }).catch(err => setLoading(false))
    }

    const modifyPlacedOrder = (orderId, products) => {
        setLoading(true)

        modifyOrder(orderId, products).then((res) => {
            console.log("RESPONSE MODIFY = " + JSON.stringify(res))

            if (res.status == 1) {
                dispatch(callMenuApi(restaurantcode))
                dispatch(updateCart([], 0))
                setLoading(false)
                navigation.replace("OrderSuccess", { ...route.params, comment: comment })

            } else {
                setLoading(false)
            }

        }).catch(err => setLoading(false))
    }

    const storeCart = () => {
        console.log("STORING")
        localStorage.setItem('cart',JSON.stringify(cartItems))
        localStorage.setItem('total',JSON.stringify(total))
    }


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



    const renderContent = (item, index) => {

        return (
            products.map((item) =>
                <View key={item.id} style={{ flexDirection: 'row', padding: 15, paddingLeft: 20, paddingRight: 20 }}>
                    <Image resizeMode='contain' style={{ width: 10, height: 10 }} source={item.Is_veg == 1 ? vegIcon : nonVegIcon}></Image>

                    <Text style={{ flex: 1, fontFamily: 'PROXIMANOVA-SBOLD', paddingLeft: 10, }}>{`${item.name}\n`}<Text style={{ color: Colors.lightGrey, fontFamily: 'PROXIMANOVA-REG' }}>{`${item.description}`}</Text></Text>


                    {item.cartQuantity < 1 ?
                        <TouchableOpacity
                            onPress={() => addCart(item)}
                            style={{ alignSelf: 'baseline', paddingLeft: 5, paddingRight: 5, borderWidth: 1, borderColor: Colors.blue, marginRight: 10 }}>

                            <Icon name='md-add' style={{ fontSize: 15, color: Colors.blue, padding: 5 }}></Icon>
                        </TouchableOpacity>

                        :

                        <View style={{ flexDirection: 'row', alignSelf: 'baseline', borderWidth: 0.5, borderColor: Colors.blue, paddingLeft: 5, paddingRight: 5, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>

                            <TouchableOpacity onPress={() => addCart(item)} >
                                <Icon

                                    name='md-add' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5, borderLeftWidth: 0.1, borderRightWidth: 0.1, borderColor: "#f2f2f2" }}></Icon>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 12, padding: 5, fontFamily: 'PROXIMANOVA-SBOLD' }}>{item.cartQuantity}</Text>

                            <TouchableOpacity onPress={() => removeFromCart(item)}>
                                <Icon
                                    //onPress={() => removeFromCart(item, index)} 
                                    name='md-remove' style={{ fontSize: 15, color: Colors.lightGrey, padding: 5 }}></Icon>
                            </TouchableOpacity>



                        </View>
                    }
                    <Text style={{ textAlign: 'center', alignSelf: 'center', fontFamily: 'PROXIMANOVA-SBOLD' }}>{`${'\u20B9'} ${item.cost}`} </Text>
                </View>



            ));
    };


    const space = (amount) => {
        return <View style={{ padding: amount }}></View>
    }

    const onBack = () => {

        //navigation.goBack()
        navigation.navigate("Home", { ...route.params })

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
                                style={{ fontSize: 20 }}
                                name="md-heart-empty"></Icon>
                            {/* <Image resizeMode='contain' style={{width:20, height: 15 }} source={require('../assets/images/heart.png')}></Image> */}



                        </Right>

                    </Header>


                    <View style={{ height: 0.5, backgroundColor: Colors.lightGrey }}></View>



                    {space(8)}



                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>

                        <View style={{ flex: 1 }}>

                            <Text style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.15, lineHeight: 25, fontFamily: 'PROXIMANOVA-BOLD' }}>{'Demo Restaurant'}</Text>
                            {/* <Text style={{ lineHeight: 25 }}>Best in: Beer, Pizza, Pasta, Butter Chicken...</Text> */}
                            <Text style={{ color: Colors.lightGrey, lineHeight: 25, fontFamily: 'PROXIMANOVA-REG' }}>{'Sector 7'}</Text>

                        </View>
                        {/* <View >

                            <Text style={{ color: 'white', backgroundColor: Colors.green, padding: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>4.9 <Icon name='ios-star' style={{ color: 'white', fontSize: 16 }}></Icon> </Text>

                            <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', borderWidth: 0.1, borderColor: Colors.lightGrey, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>{`${'\u20B9'} 1900`} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{`\nFor Two`}</Text></Text>
                        </View> */}

                    </View>

                    {space(6)}

                    <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: Colors.blue, borderRadius: 5, padding: 10, alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                        <Text style={{ fontSize: 22, color: Colors.blue, fontFamily: 'oswald-bold' }}>NOTE</Text>
                        <Text style={{ flex: 1, fontSize: 10, color: Colors.blue, padding: 5, paddingLeft: 10 }}>{`You can't modify your order once you have placed it but\nyou definitely order more by going back to the menu\npage. Have a Happy Meal.`}</Text>

                    </View>


                    {renderContent()}


                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>




                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                        {/* <Image resizeMode='contain' style={{ width: 17, height: 17 }} source={note}></Image> */}
                        <TextInput
                            style={{ flex: 1, fontSize: 11, padding: 10, fontFamily: 'PROXIMANOVA-REG' }}
                            placeholder='Add any request or customisation? Feel free to write it.'
                            placeholderTextColor={Colors.lightGrey}
                            onChangeText={text => setComment(text)}
                            value={comment}
                        />

                    </View>


                    <View style={{ padding: 6, backgroundColor: '#f2f2f2' }}></View>



                </View>


                {space(20)}

            </ScrollView>

            <TouchableOpacity
                onPress={onPlaceOrderClick}
                style={{ flexDirection: 'row', position: 'absolute', bottom: 30, padding: 10, backgroundColor: Colors.darkBlue, alignSelf: 'center', borderRadius: 5, alignItems: 'center', paddingLeft: 20, paddingRight: 20, }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', letterSpacing: 0.2 }}>Place Order</Text>
                {space(10)}
                <View style={{ height: 18, width: 1, backgroundColor: Colors.lightGrey }}></View>
                {space(5)}
                <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'white' }}>{`${'\u20B9'} ${total}`}</Text>
            </TouchableOpacity>


            {/* {isRatingVisibile && <RatingModal visibility={() => setRatingVisibility(false)}></RatingModal>} */}

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


export default CartScreen