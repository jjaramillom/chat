import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from '../../components';

const LoginScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default LoginScreen;
