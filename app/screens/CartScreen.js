import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Modal, View, Text, TextField } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AppBase from '../base_components/AppBase'
import ViewRow from '../base_components/ViewRow';
import BR from '../base_components/BR';
import Item from '../components/Checkout/Item';
import PrimaryText from '../base_components/PrimaryText';

// actions creators
import {
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty,
} from "../../src/actions/cartAction";
import {createOrder} from "../../src/actions/orderActions";

// firebase
import firestore from '@react-native-firebase/firestore';
import ModalWrapper from "react-native-modal-wrapper";

/**
 *
 * @type {*}
 */

const FooterContainer = styled.View`
  height: 10%;
  width: 100%;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AmountContainer = styled.View`
  flex: 0.5;
  align-items: center;
  height: 100%;
  background-color: #d9d9d9;
  justify-content: center;
`;

const PayButton = styled.TouchableOpacity`
  height: 100%;
  background-color: green;
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled(PrimaryText)`
  font-weight: bold;
  color: #eee;
  font-size: 16px;
`;

const LoadingWrap = styled.View`
  background-color: red;
  margin: 10px auto;
  padding: 15px;
  width: 150px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
`;

class CartScreen extends Component {

    constructor() {
        super();
        this.unsubscribe = null
        this.ref = firestore().collection('orders_client').doc('1');

        this.state = {
            loading: false,
            order: {},
        }
    }
    componentDidMount() {
        if ( this.ref.onSnapshot({}) ) {
            this.unsubscribe = this.ref.onSnapshot(event => {
                this.state.loading == true
                    ? Actions.paymentHome({
                        nameRest: 'El Club de la Milanesa',
                        orderId: this.state.order.id,
                        totalAmount: this.state.order.total_order,
                    })
                    :
                    null
                this.setState({loading: false})
            })
        }
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleItemValueChange = (item, qty) => {
        if (qty === 0) {
            this.props.deleteCartItem(item.id);
        } else {
            this.props.updateCartItemQty(item.id, qty);
        }
    };

    handlePayment = (totalAmount) => {

        const {cartData} = this.props;

        if (cartData.length > 0) {
            const menu = {order_details: [] };
            const postData = cartData.map(item => ({
                    product: { id: item.data.id },
                    quantity: item.qty,
                    unit_price: item.data.unit_price,
            }));
            menu.order_details.menu_items = postData;
            this.props.createOrder(postData, callback => callback ? this.setState({loading: true, order: callback}): null);
        }
    };

    _renderItem = ({item}) => {
        return (
            <Item
            key={item.id}
            name={item.data.name}
            price={`$${item.data.unit_price * item.qty}`}
            qty={item.qty}
            onChange={qty => this.handleItemValueChange(item.data, qty)}
            />
        )
    };

    renderCartItems = (cartData) => {

        if (cartData.length > 0) {
            return (
                <FlatList
                    style={{ borderWidth: 1, borderColor: '#fcfcfc' }}
                    data={cartData}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.id}
                />
            );

        } else {
            return (
                <ViewRow>
                    <PrimaryText>
                        Tu carrito se encuentra vacío.
                    </PrimaryText>
                </ViewRow>
            );
        }
    };

    renderFooter = (totalAmount) => {
        const {cartData} = this.props;

        if (cartData.length > 0) {
            return (
                <FooterContainer>
                    <AmountContainer>
                        <PrimaryText> $ {totalAmount}</PrimaryText>
                    </AmountContainer>

                        <PayButton onPress={() => this.handlePayment(totalAmount)}>
                            {this.state.loading
                                ?
                                <ActivityIndicator size="large" color="#fff"/>
                                :
                                <FooterText>
                                    Pedir
                                </FooterText>
                            }
                        </PayButton>
                </FooterContainer>
            );
        }
        return null;
    };

    render() {
        const {cartData} = this.props;

        if (cartData) {
            let totalBill = parseFloat(cartData.reduce(
                    (total, item) => total + (item.data.unit_price * item.qty), 0,
                ));

            return (
                <AppBase style={{ alignItems: 'stretch' }} >

                    <ScrollView>

                        <BR size={10}/>
                        {this.renderCartItems(cartData)}
                        <BR/>

                    </ScrollView>

                    {this.renderFooter(totalBill)}

                </AppBase>
            );
        }
    }
}

CartScreen.defaultProps = {
    createdOrder: null,
    cartData: []
};

CartScreen.propTypes = {
    cartData: PropTypes.array.isRequired,
    deleteCartItem: PropTypes.func.isRequired,
    fetchCartItems: PropTypes.func.isRequired,
    updateCartItemQty: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    createdOrder: PropTypes.object,
};


function MapStateToProps(store) {
    return {
        cartData: store.cart.cartData,
    };
}

function MapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem,
        fetchCartItems,
        updateCartItemQty,
        createOrder,
    }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(CartScreen);
