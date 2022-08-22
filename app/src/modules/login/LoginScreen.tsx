import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Button, TextInput, Card, Text} from '../../components';
import {useAuthContext} from '../../state/AuthProvider';
import axios from '../../utils/axios';

const LoginScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login} = useAuthContext();

  async function handleLogin() {
    if (!username || !password) {
      return;
    }
    try {
      const {data} = await axios.post(
        '/auth/login',
        {},
        {auth: {username, password}},
      );
      console.log(data);
      login(data.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="Log in"
          disabled={!password || !username}
          onPress={handleLogin}
        />
        <View style={styles.separatorView}>
          <Text style={styles.separatorText}>― Or ―</Text>
        </View>
        <View style={styles.anonymousButton}>
          <Button
            title="Remain anonymous"
            color="warning"
            onPress={() => console.log('hoasd')}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '70%',
    marginTop: '20%',
    marginHorizontal: 50,
  },
  anonymousButton: {
    marginTop: 15,
  },
  separatorView: {
    marginVertical: 20,
  },
  separatorText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default LoginScreen;
