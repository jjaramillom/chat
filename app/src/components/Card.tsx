import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type Props = {style?: ViewStyle};

const Card = ({children, style}: PropsWithChildren<Props>) => {
  return <View style={{...styles.container, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    borderRadius: 15,
  },
});

export default Card;
