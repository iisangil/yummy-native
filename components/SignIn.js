import React from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';

const SignIn = (props) => {
  const {
      setEmail,
      setPw,
      signIn,
  } = props;

  return (
    <View>
      <TextInput
      style={styles.input}
      onChangeText={text => setEmail(text)}
      placeholder={'Email'}
      />
      <TextInput
      style={styles.input}
      onChangeText={text => setPw(text)}
      placeholder={'Password'}
      />
      <Button
      title="Sign In"
      onPress={() => signIn()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});

export default SignIn;