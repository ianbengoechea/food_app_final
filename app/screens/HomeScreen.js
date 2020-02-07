/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

// actions
import { fetchRestaurant } from '../../src/actions/restaurantAction';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';

import RightHeaderButtons from '../components/RightHeaderButtons';
import CuisineGrid from '../components/CuisineGrid';
import RestaurantList from '../components/RestaurantList';
import FilterRadioModal from '../components/FilterRadioModal';


class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <PrimaryText>Food App</PrimaryText>,
    headerRight: <RightHeaderButtons />,
  });

  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
  }

  componentDidMount() {

    // call action creator for retrieve all restaurants
    this.props.fetchRestaurant()
    console.log('this.props.restaurantList', this.props.restaurantList)

    console.log('home screen >>>', Actions.currentScene)
    // const { restaurantList, cuisineTypes } = this.props;
    // if (!restaurantList || restaurantList.length === 0) {
    //   this.props.fetchRestaurant();
    // }

    // if (!cuisineTypes || cuisineTypes.length === 0) {
    //   this.props.fetchCuisineTypes();
    // }
  }

  handleFilter = (type) => {
    if (type !== null) {
      this.props.fetchRestaurantByType(type);
    } else {
      this.props.fetchRestaurant();
    }
  };

  openCuisineScreen = (value) => {
    console.log('value', value)
    // Actions.cuisineRestaurants({
    //   cuisineType: value,
    //   backTitle: 'Back',
    //   title: startCase(value),
    //   rightTitle: 'Sign Out',
    //   onRight: () => this.handleSignOut(),
    // });
  };

  render() {

    const filterData = this.props.cuisineTypes.map(type => ({
      value: type,
      label: startCase(type),
    }));

    return (

      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
      }}
      >
        {
          filterData.length > 0 &&
          <FilterRadioModal
            heading="Cuisine Type"
            data={filterData}
            // eslint-disable-next-line no-return-assign
            pRef={el => (this.filterModalRef = el)}
            close={() => this.filterModalRef.close()}
            onClose={this.handleFilter}
          />
        }
        <ScrollView >
          <CuisineGrid
            data={this.props.cuisineTypes}
            onPress={this.openCuisineScreen}
          />
          <RestaurantList
            onFilterIconPress={() => this.filterModalRef.open()}
            restaurantList={this.props.restaurantList}
          />
        </ScrollView>
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  restaurantList: [],
  cuisineTypes: ['chinese', 'south-indian', 'beverages', 'north-indian', 'biryanis', 'desserts', 'ice-creams', 'mexican', 'pizza']
};

HomeScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  fetchCuisineTypes: PropTypes.func.isRequired,
  // fetchCartItems: PropTypes.func.isRequired,
  restaurantList: PropTypes.array,
  cuisineTypes: PropTypes.array,
};

const MapStateToProps = (store) => {
  return {
    restaurantList: store.restaurant.fullList
  }
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRestaurant
  }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(HomeScreen);
