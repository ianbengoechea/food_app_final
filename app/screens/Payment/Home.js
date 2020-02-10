import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CreditCardInput } from 'react-native-credit-card-input';
import styled from 'styled-components';
import Stripe from 'react-native-stripe-api';

import Colors from '../../../src/constants/colors';
import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import BR from '../../base_components/BR';

const windowWidth = Dimensions.get('window').width - 18;

const Heading = styled.Text`
  font-size: 14px;
  color: #9DA8BA;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeading = styled.Text`
  font-size: 16px;
  color: #213052;
  text-align: center;
`;

const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px 20px;
  background: #FFF;
`;

const SectionItem = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;  
`;

class PaymentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: {},
            validData: false,
            loadingPayment: false,
        };
    }

    static getDerivedStateFromProps(nextProps) {
        console.log('PAYMENT HOME ####### NEXTPROPS ####', nextProps)
        // if (nextProps.createdOrder === null) {
        //     Actions.pop();
        // }
    }

    _onChange = (form) => {

        this.setState((s, p) => ({
            cardData: form,
            validData: form.valid,
        }));
    };

    doPayment = async () => {
        this.setState({
            loadingPayment: true,
        });

        const { totalAmount } = this.props;
        const { cardData: { values: cardValue } } = this.state;

        const apiKey = 'pk_test_rM2enW1rNROwx4ukBXGaIzhr';
        const client = new Stripe(apiKey);
        const expMonth = cardValue.expiry.split('/')[0];
        const expYear = cardValue.expiry.split('/')[1];
        // Create a Stripe token with new card infos
        const token = await client.createToken({
            number: cardValue.number.replace(' ', ''),
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cardValue.cvc,
            address_zip: cardValue.postalCode,
        });
        setTimeout( () => Actions.paymentSuccess({totalAmount} ), 3000)

    };

    handleCancelOrder = () => {
        console.log('CANCELA PAGO CON TARJETA')
    };

    render() {
        const { orderId, totalAmount, nameRest } = this.props;

        return (
            <AppBase>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} >

                    <ScrollView bounces={false} >

                        <BR size={10} />

                        <Section>

                            <SectionItem>
                                <Heading>{'Id Orden'.toUpperCase()}</Heading>
                                <SubHeading>{orderId}</SubHeading>
                            </SectionItem>

                        </Section>

                        <Section>

                            <SectionItem>
                                <Heading>LUGAR</Heading>
                                <SubHeading>{ nameRest }</SubHeading>
                            </SectionItem>

                            <SectionItem>
                                <Heading>PRECIO</Heading>
                                <SubHeading>$ {totalAmount}</SubHeading>
                            </SectionItem>

                        </Section>

                        <Section style={{ borderBottomWidth: 2, borderBottomColor: '#eee' }} >

                            <SectionItem>
                                <Heading>FECHA</Heading>
                                <SubHeading>{new Date().toDateString()}</SubHeading>
                            </SectionItem>

                        </Section>

                        <View style={{ marginTop: 20 }} >

                            <CreditCardInput
                                requiresCVC
                                cardScale={1}
                                inputContainerStyle={{
                                    backgroundColor: '#FFF',
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    flexDirection: 'column',
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    borderWidth: 1,
                                    borderColor: '#eee',
                                    minWidth: 150,
                                    borderRadius: 6,
                                }}
                                onChange={this._onChange}
                            />

                        </View>

                        <RoundButton
                            loading={this.state.loadingPayment}
                            title="Realizar pago"
                            buttonColor={Colors.green}
                            onPress={() => this.doPayment()}
                            disabled={!this.state.validData}
                            baseStyle={{ marginTop: 30, marginBottom: Platform.OS === 'ios' ? 100 : 20 }}
                        />

                        <RoundButton
                            title="Cancelar orden"
                            onPress={() => this.handleCancelOrder()}
                            baseStyle={{ marginTop: 30, marginBottom: Platform.OS === 'ios' ? 100 : 20 }}
                        />

                    </ScrollView>
                </KeyboardAvoidingView>
            </AppBase>
        );
    }
}

PaymentHome.defaultProps = {
    createdOrder: null,
};

export default PaymentHome;
