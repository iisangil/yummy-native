import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

var rand = require('random-key');

export default function App() {
  const [status, setStatus] = useState(false);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [room, setRoom] = useState('');
  const [code, setCode] = useState('');

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [radius, setRadius] = useState(10);

  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [matches, setMatches] = useState([]);

  const ws = useRef(null);

  const signIn = () => {
    setStatus(true);
  }

  const signOut = () => {
    clearInputs();
    setStatus(false);
  }

  const clearInputs = () => {
    setEmail('');
    setPw('');
  };

  const createRoom = () => {
    const roomName = rand.generate(8);
    setRoom(roomName)

    ws.current = new WebSocket(
      'ws://localhost:8000/ws/' + roomName + '/' + email
    );

    let price = '';
    if (one) price += '1,';
    if (two) price += '2,';
    if (three) price += '3,';
    if (four) price += '4,';

    const toSend = {
      username: email,
      type: 'get',
      parameters: {
        radius: radius.toString(),
        price: price,
        latitude: 42.280827,
        longitude: -83.743034,
      },
    };
  }

  return (
    <View style={styles.container}>
      {!status && 
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
         title="Sign in"
         onPress={() => signIn()}
        />
      </View>}
      {status && 
      <Button
       title="Sign out"
       onPress={() => signOut()}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
  },
});
