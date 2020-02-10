import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {ScrollView} from "react-navigation";
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';

import PrimaryText from '../base_components/PrimaryText';
import ViewRow from '../base_components/ViewRow';
import Assets from '../../src/constants/assets';

/**
 *
 */

class TipoCocina extends Component {

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
        style={{ flex: 1}}
      >
        Comidas
      </PrimaryText>
    </ViewRow>);

  renderItem = ( platos ) => {
      return platos.map(item => {
          return (
              <TouchableOpacity
                  activeOpactiy={0.3}
                  style={{ width: '100%', flex: 1, marginTop: 5 }}
                  onPress={() => this.props.onPress(console.log('plato seleccionado >>', item))}
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

                      <View/>

                      <PrimaryText style={{ marginTop: 5 }} >

                          {startCase(item)}

                      </PrimaryText>

                  </View>
              </TouchableOpacity>
          )
      })
  };

  render() {
      const tipoPlato = this.props.data;
    return (
        <View>

            {this.renderHeader()}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {this.renderItem(tipoPlato)}

            </ScrollView>

        </View>
    );
  }
}

TipoCocina.propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

export default TipoCocina;
