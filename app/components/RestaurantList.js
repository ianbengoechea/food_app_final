import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import Assets from '../../src/constants/assets';
import RestaurantItem from './RestaurantItem';
import BR from '../base_components/BR';
import ViewRow from '../base_components/ViewRow';
import PrimaryText from '../base_components/PrimaryText';
import RippleIcon from '../base_components/RippleIcon';

/**
 * {RestaurantList} componente que recibe props del padre (array de datos) y
 * @return Array of {RestaurantItem}
 * @props:
 *          - {onFilterIconPress} envia callback del icono de filtro presionado
 *          - {restaurantList} data of type {Array}
 */

class RestaurantList extends Component {
  // handleFilter = (type) => {
  //   this.props.handleFilter(type);
  // };

  renderHeader = () => (

    <ViewRow jc="space-between" ai="center" style={{ padding: 10 }} >

      <PrimaryText size={18} align="left" style={{ flex: 1 }} >
        Restaurantes
      </PrimaryText>

        <RippleIcon
            style={{ flex: 0 }}
            dark
            onPress={this.props.onFilterIconPress}
            name='md-switch'
            size={30}
        />

    </ViewRow>
  );

  renderEmptySection = () => {

      if (!this.props.restaurantList || this.props.restaurantList.length === 0) {
        return (
            <View>
                {this.renderHeader()}
                <View
                    style={{
                    backgroundColor: '#fdfdfd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    flexDirection: 'column',
                    }}
                >

                    <Image
                        source={Assets.Images.noRest}
                        style={{ width: 120, height: 120 }}
                    />

                    <PrimaryText>
                        Lo sentimos, no pudimos encontrar nada.
                    </PrimaryText>

                    <BR />

                    <PrimaryText>
                        Intenta nuevamente...
                    </PrimaryText>

                </View>

            </View>
        );
      }
    return null;
  };

  renderRestaurantSection = () => (
    (this.props.restaurantList && this.props.restaurantList.length > 0)
        ?
        <FlatList
            data={this.props.restaurantList}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            ListHeaderComponent={this.renderHeader}
            renderItem={this.renderRestaurantList}
            keyExtractor={item => item.id}
        />
        :
        this.renderEmptySection()
  );


  renderRestaurantList = ({ item: restaurant }) => {
    if (restaurant) {
      return (
        <RestaurantItem
          restaurant={restaurant}
          onPress={() => Actions.restaurantScreen({
            title: startCase(restaurant.name),
            backTitle: 'Back',
            rightTitle: 'Sign Out',
            onRight: () => this.handleSignOut(),
            restaurant,
          })}
        />
      );
    }
    return null;
  };

  render() {
      return (
          this.renderRestaurantSection()
      );
  }

}

RestaurantList.defaultProps = {
  handleFilter: () => {},
  onFilterIconPress: () => {},
  // hideFilter: false,
};


RestaurantList.propTypes = {
  hideFilter: PropTypes.bool,
  restaurantList: PropTypes.array.isRequired,
  handleFilter: PropTypes.func,
  // onFilterIconPress: PropTypes.func,
};

export default RestaurantList;
