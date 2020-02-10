/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../../src/constants/assets';
import FoodItem from '../components/FoodItem';
import ViewRow from '../base_components/ViewRow';
import BR from '../base_components/BR';
import SignOutButton from '../components/RightHeaderButtons';

//actions to props
import {fetchDishesByRestaurant} from "../../src/actions/restaurantAction";
import {updateCartItems} from "../../src/actions/cartAction";

class RestaurantInfoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: <SignOutButton />,
    });

    componentDidMount() {
        this.props.fetchDishesByRestaurant(this.props.restaurant.id);
        console.log('this.props.restaurant.id >> RESTAURANT INFO SCREEN>> ', this.props.restaurant.id)
    }

    renderFoodList = foods => (
        <FlatList
            data={foods}
            bounces={false}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={item => item.id}
            renderItem={this.renderFoodItem}
            ListEmptyComponent={this.renderFoodItem}
        />
    );

    renderHeader = () => (
        <ViewRow
            jc="space-between"
            style={{
                backgroundColor: '#fff',
                borderColor: '#eee',
                padding: 15,
                borderBottomWidth: 1,
                marginTop: 2,
            }}
        >
            <PrimaryText
                style={{
                    flex: 1,
                }}
                size={20}
            >
                Menu
            </PrimaryText>
        </ViewRow>
    );

    renderFoodItem = ({ item }) => {
        if (item) {
            return (
                <FoodItem
                    food={item}
                    onPress={() => this.props.updateCartItems(item, 1)}
                />
            );
        } else if (!item) {
            return (
                <FoodItem/>
            );
        }
        return null;
    };

    render() {
        const { restaurant: { name: restaurantName, details, foods, store_image, description } } = this.props;
        return (
            <View>
                <ScrollView>
                    <Image
                        source={{uri: `data:image/jpeg;base64,${store_image}`}}
                        resizeMode="cover"
                        style={{
                            width: 'auto',
                            height: 200,
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: '#fff',
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}
                    >
                        <PrimaryText align="left" size={20}>{restaurantName}</PrimaryText>
                        <SecondaryText align="left" size={14}>{description}</SecondaryText>
                    </View>

                    {this.renderFoodList(this.props.restaurantMenu)}

                </ScrollView>
            </View>
        );
    }
}

RestaurantInfoScreen.defaultProps = {};

RestaurantInfoScreen.propTypes = {
    fetchRestaurant: PropTypes.func.isRequired,
    updateCartItems: PropTypes.func.isRequired,
    restaurant: PropTypes.object.isRequired,
};

function MapStateToProps(store) {
    return {
        restaurantMenu: store.restaurant.restaurantMenuList,
    };
}

function MapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchDishesByRestaurant,
        updateCartItems
    }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(RestaurantInfoScreen);

