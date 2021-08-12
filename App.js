import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal } from 'react-native';

// var rand = require('random-key');

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

  const [create, setCreate] = useState(false);
  const [join, setJoin] = useState(false);

  const ws = useRef(null);
  
  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);

      switch (message.type) {
        case 'users':
          setUsers(message.users);
          break;
        case 'get':
          setRestaurants((restaurants) => [
            ...restaurants,
            ...message.restaurants,
          ]);
          break;
        // case 'start':
        case 'match':
          const index = parseInt(message.message);
          setMatches((matches) => [...matches, index]);
          const alertMessage = 'Your room has matches a restaurant! ' + restaurants[index].name;
          alert(alertMessage);
          break;
        default:
          console.log('huh');
          break;
      }
    }
  })

  // this signin, signout functions are just placeholders before firebase
  const signIn = () => {
    if (email && pw) {
      setStatus(true);
    }
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
    // const roomName = rand.generate(8);
    const roomName = 'test_placeholder';
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
        // placeholder values for location
        latitude: '42.280827',
        longitude: '-83.743034',
      },
    };
    console.log('toSend', toSend);

    ws.current.onopen = () => ws.current.send(JSON.stringify(toSend));
  }

  const joinRoom = () => {
    if (code !== '') {
      setRoom(code);
      
      ws.current = new WebSocket(
        'ws://localhost:8000/ws/' + code + '/' + email
      );

      const toSend = {
        username: email,
        type: 'get',
      };
      console.log('toSend', toSend);

      ws.current.onopen = () => ws.current.send(JSON.stringify(toSend));
    }
  }

  const leaveRoom = () => {
    ws.current.close();
    ws.current = null;

    setRoom('');
    setRestaurants([]);
    setRadius(10);
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
      {status && room === '' &&
      <View>
        <Button
         title='Create room'
         onPress={() => setCreate(true)}
        />
        <Modal
         animationType='slide'
         visible={create}
         onRequestClose={() => setCreate(false)}
        >
          <Button
           title='create'
           onPress={() => createRoom()}
          />
          <Button
           title='go back'
           onPress={() => setCreate(false)}
          />
        </Modal>
        <Button
         title='Join room'
          onPress={() => setJoin(true)}
        />
        <Modal
         animationType='slide'
         visible={join}
         onRequestClose={() => setJoin(false)} 
        >
          <TextInput
           style={styles.input}
           onChangeText={text => setCode(text)}
           placeholder={'Enter room code'}
          />
          <Button
           title='join'
           onPress={() => joinRoom()}
          />
        </Modal>
        <Button
         title='Sign out'
         onPress={() => signOut()}
        />
      </View>}
      {status && room !== '' &&
      <View>
        <Button
         title='Leave room'
         onPress={() => leaveRoom()}
        />
      </View>}
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
