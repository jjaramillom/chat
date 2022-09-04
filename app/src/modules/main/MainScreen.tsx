import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text, Button} from '../../components';
import {useAuthContext} from '../../state/AuthProvider';

const LoginScreen = () => {
  const {logout} = useAuthContext();
  return (
    <View style={styles.screen}>
      <Text>Main</Text>
      <Button title="logout" onPress={logout} />
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
