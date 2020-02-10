import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';

/**
 * {RestaurantItem} renderiza una imagen si no recibe {data}
 *  desplega una lista de restaurants (en como el FoodItem)
 *  @props:
 *          - {restaurant} data para renderizar el restaurant
 *          - {onPress} callback para el componente padre.. pasa data del restaurant seleccionado
 */

const RestaurantItem = ({ restaurant, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} >

            <View
                key={restaurant.id}
                style={{
                    width: '100%',
                    minHeight: 150,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                }}
            >

                <Image
                    source={{uri: `data:image/jpeg;base64,${restaurant.store_image}`}}
                    resizeMode="contain"
                    style={{ width: '100%', height: 150 }}
                />

                <View style={{ flex: 1, flexDirection: 'column', padding: 5 }} >

                    <PrimaryText size={18} align="left" style={{marginBottom: 5}}>
                        {restaurant.name}
                    </PrimaryText>

                    <SecondaryText>
                        {restaurant.description}
                    </SecondaryText>

                </View>
            </View>
        </TouchableOpacity>
    );
};

RestaurantItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

export default RestaurantItem;
