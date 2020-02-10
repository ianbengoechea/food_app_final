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
import TipoCocina from '../components/TipoCocina';
import RestaurantList from '../components/RestaurantList';
import FilterRadioModal from '../components/FilterRadioModal';
import AppMem from "../common/AppMem";


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
    this.props.fetchRestaurant();
  }

  handleFilter = (type) => {
    console.log('tipo de cocina seleccionada', type)
  };

  openCuisineScreen = (value) => {
    console.log('value', value)
    // TODO: abrir una nueva screen con los restaurantes que cumplan la condicion
  };

  render() {

    const filterData = this.props.cuisineTypes.map(type => ({
      value: type,
      label: startCase(type),
    }));

    return (

      <AppBase style={{ alignItems: 'stretch', backgroundColor: '#ffffff' }}
      >
        {
          filterData.length > 0 &&
          <FilterRadioModal
            heading="Filtrar por tipo de cocina"
            data={filterData}
            pRef={el => this.filterModalRef = el}
            close={() => this.filterModalRef.close()}
            onClose={this.handleFilter}
          />
        }
        <ScrollView >
          <TipoCocina
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
  cuisineTypes: ['china', 'bebidas', 'india', 'postres', 'helado', 'mexicana', 'pizza']
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
