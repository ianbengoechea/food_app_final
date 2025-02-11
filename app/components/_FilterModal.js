import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';
import styled from 'styled-components';
import indexOf from 'lodash/indexOf';

import Colors from '../../src/constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * {_FilterModal} componente que saque de ejemplo, lo use en {FilterRadioModal}
 * @props:
 *        - {data} items que utiliza para hacer una lista
 *        - {onClose} callback, envia items seleccionados del modal
 *        - {onOpen} recibe props
 *        - {onClosingState} callback, envia estado general del componente
 *        - {pRef} referencia que envio desde el padre y paso al modal
 */

const ModalBase = styled.View`
  flex: 1;
  flex-direction: column;
  background: #f5f5f5;
`;

const FilterHeadWrap = styled.View`
  padding: 20px 20px 10px;
  flex-direction: row;
  background: #f5f5f5;
  justify-content: space-between;
  align-items: center;
`;

const FilterHeading = styled.Text`
  font-size: 16px;
  flex: 1;
  font-weight: bold;
`;

const CheckWrap = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  margin: 10px;
`;

class _FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeToClose: true,
      filterData: this.props.data,
    };
  }

  onClose = () => {
    const selectedValues = filter(this.state.filterData, item => item.checked);
    this.props.onClose(selectedValues);
  };

  onOpen = () => {
    this.props.onOpen();
  };

  onClosingState = (state) => {
    this.props.onClosingState();
  };

  onClick = (item) => {
    const newItem = { ...item, ...{ checked: !item.checked } };

    this.setState((s, p) => {
      const { filterData } = s;

      // busca en el array de datos que tengo el item que seleccioné
      // si lo encuentra, guardo el index y despues lo reemplazo en el
      // array principal (todo esto para setear el check)
      const index = indexOf(filterData, item);
      filterData[index] = newItem;
      return {
        filterData,
      };
    });
  };

  closeModal = () => {
    this.props.close();
  };

  render() {
    const { filterData } = this.state;
    const { heading } = this.props;

    return (
      <Modal
        ref={this.props.pRef}
        swipeToClose={this.state.swipeToClose}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        position="center"
        style={{
          justifyContent: 'flex-start',
        }}
        onClosingState={this.onClosingState}
      >
        <ModalBase>
          <FilterHeadWrap>
            <FilterHeading>{heading}</FilterHeading>
            <Ionicons
              size={26}
              color="#888"
              name="md-close"
              onPress={this.closeModal}
            />
          </FilterHeadWrap>
          <CheckWrap>
            {
              map(filterData, (item, index) => (
                <CheckBox
                  key={index}
                  checkBoxColor={Colors.primaryColor}
                  style={{
                    padding: 10,
                    height: 50,
                  }}
                  leftTextStyle={{
                    color: item.disabled ? '#bbb' : '#111',
                  }}
                  onClick={() => this.onClick(item)}
                  isChecked={item.disabled ? false : item.checked}
                  disabled={item.disabled}
                  leftText={item.label}
                />
              ))
            }
          </CheckWrap>
        </ModalBase>
      </Modal>
    );
  }
}

_FilterModal.defaultProps = {
  heading: 'Filter',
  onOpen: () => {},
  onClose: () => {},
  onClosingState: () => {},
};

_FilterModal.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool.isRequired,
  })).isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClosingState: PropTypes.func,
  close: PropTypes.func.isRequired,
  pRef: PropTypes.func.isRequired,
};

export default _FilterModal;
