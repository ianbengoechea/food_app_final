/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';


import Assets from '../../src/constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import ViewRow from '../base_components/ViewRow';
import {ScrollView} from "react-navigation";

class CuisineGrid extends Component {
  renderHeader = () => (
    <ViewRow
      jc="space-between"
      ai="center"
      style={{
        padding: 10,
        borderWidth: 0,
        borderBottomWidth: 1,
        zIndex: 1,
        borderBottomColor: '#f2f2f2',
      }}
    >
      <PrimaryText
        size={18}
        align="left"
        style={{
          flex: 1,
        }}
      >
        Dishes
      </PrimaryText>
    </ViewRow>);

  renderItem = ( lista ) => {
      return lista.map(item => {
          return (
              <TouchableOpacity
                  activeOpactiy={0.3}
                  style={{
                      width: '100%',
                      flex: 1,
                  }}
                  onPress={() => this.props.onPress(item)}
              >
                  <View
                      style={{
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 3,
                          margin: 3,
                          borderRadius: 10,
                          height: '100%',
                          borderWidth: 1,
                          borderColor: '#f2f2f2',
                          elevation: 2,
                          backgroundColor: '#fafafa',
                      }}
                  >
                      <Image
                          source={Assets.Images[item]}
                          style={{
                              width: 40,
                              height: 30,
                          }}
                          resizeMode="contain"
                      />
                      <View

                      />
                      <PrimaryText style={{
                          marginTop: 20,
                      }}
                      >
                          {startCase(item)}
                      </PrimaryText>
                  </View>
              </TouchableOpacity>
          )
      })
  };

  render() {
    return (
        <View>
            {this.renderHeader()}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.renderItem(this.props.data)}
      </ScrollView>
        </View>
    );
  }
}

CuisineGrid.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default CuisineGrid;
