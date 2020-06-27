import React from 'react';
import { StyleSheet, TextInput,View,Text } from 'react-native';
import { Content, Item, Input, Container } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import Colors from '../constants/Colors';

class OtpInputs extends React.Component {
    state = { otp: [] };
    otpTextInput = [];

    componentDidMount() {
        this.otpTextInput[0]._root.focus();
    }

    renderInputs() {
        const inputs = Array(6).fill(0);
        const txt = inputs.map(
            (i, j) => <Col key={j} style={styles.txtMargin}>
                {/* <Item style={{borderWidth:0,}} > */}
                <Input
                    style={[styles.inputRadius, { color:Colors.blue,
                        borderWidth:0.5,
                        padding:15,
                        borderRadius: 5, borderColor:Colors.blue }]}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={v => this.focusNext(j, v)}
                    onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
                    ref={ref => this.otpTextInput[j] = ref}
                />



            {/* </Item> */}
            </Col>
        );
        return txt;
    }

    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.otpTextInput[index - 1]._root.focus();
    }

    focusNext(index, value) {
        if (index < this.otpTextInput.length - 1 && value) {
            this.otpTextInput[index + 1]._root.focus();
        }
        if (index === this.otpTextInput.length - 1) {
            this.otpTextInput[index]._root.blur();
        }
        const otp = this.state.otp;
        otp[index] = value;
        this.setState({ otp });
        this.props.getOtp(otp.join(''));
    }


    render() {
        return (
            <Content >
                <Grid style={styles.gridPad}>
                    {this.renderInputs()}

                </Grid>
            </Content>
        
        );
    }
}

const styles = StyleSheet.create({
    gridPad: { marginLeft:25,marginRight:25, },
    txtMargin: { margin: 8, borderWidth:0},
    inputRadius: { textAlign:'center', fontWeight:'800',},
});

export default OtpInputs;