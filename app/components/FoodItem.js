import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../../src/constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';
import LoadingFood from '../base_components/LoadingFood';
import ViewRow from '../base_components/ViewRow';
import Colors from '../../src/constants/colors';
import FlatButton from '../base_components/FlatButton';

/**
 * {FoodItem} renderiza un loader si no tiene items o
 *  desplega una lista de menus
 *  @props:
 *          - {food} data para renderizar el menu
 *          - {onPress} callback para el componente padre del boton agregar
 */

class FoodItem extends React.Component {
  render() {
    const { food, onPress } = this.props;
    if (!food) {
      return <LoadingFood />;
    }
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <View
          key={food.id}
          style={{
            minHeight: 150,
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 5,
          }}
        >
          <Image
            source={Assets.Images.placeholderFood}
            style={{
              width: '100%',
              height: 150,
            }}
            resizeMode="contain"
          />
          <ViewRow
            jc="space-between"
            ai="flex-start"
            style={{ padding: 10 }}
          >
            <View style={{ flex: 4 }} >

              <PrimaryText size={18} align="left" style={{ marginBottom: 2 }}>
                {food.name}
              </PrimaryText>

              <SecondaryText size={14}>
                {food.description}
              </SecondaryText>

            </View>
            <View style={{ flex: 1 }}
            >

              <PrimaryText size={20} color={Colors.moneyColor}>
                $ {food.unit_price}
              </PrimaryText>

            </View>
          </ViewRow>
          <FlatButton
            key="add2Cart"
            title="Agregar al carrito"
            onPress={onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

FoodItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

export default FoodItem;
