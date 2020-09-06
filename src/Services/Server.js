export const SERVER_ADDRESS = 'http://ec2-13-233-172-180.ap-south-1.compute.amazonaws.com:8082'

export default {
    SEND_OTP: SERVER_ADDRESS + '/sendotp',
    VERIFY_OTP: SERVER_ADDRESS + '/checkotp',
    RESTAURANT_INFO: SERVER_ADDRESS + '/restaurant_detail?',
    MENU: SERVER_ADDRESS + '/menucard?',
    PLACE_ORDER: SERVER_ADDRESS + '/createorder',
    MODIFY_ORDER: SERVER_ADDRESS + '/updateorder',
    ORDERS: SERVER_ADDRESS + '/getorderdetail?',
    GENERATE_BILL: SERVER_ADDRESS + '/genratebill?',
    GENERATE_SIGNATURE: SERVER_ADDRESS + '/request',

}