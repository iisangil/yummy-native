import React from 'react';
import { StyleSheet, Button, Text, View, TextInput, Modal, CheckBox } from 'react-native';

import { Slider } from "@miblanchard/react-native-slider";

const Home = (props) => {
  const {
    create,
    setCreate,
    radius,
    setRadius,
    one,
    setOne,
    two,
    setTwo,
    three,
    setThree,
    four,
    setFour,
    createRoom,
    join,
    setJoin,
    setCode,
    joinRoom,
    signOut,
  } = props;

  return (
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
        <View style={styles.modalView}>
          <Slider
          value={radius}
          onValueChange={value => setRadius(value)}
          minimumValue={0}
          maximumValue={10}
          step={0.5}
          />
          <Text>Radius: {radius}</Text>
          <CheckBox
          style={styles.checkbox}
          value={one}
          onValueChange={() => setOne(!one)}
          />
          <Text>$</Text>
          <CheckBox
          style={styles.checkbox}
          value={two}
          onValueChange={() => setTwo(!two)}
          />
          <Text>$$</Text>
          <CheckBox
          style={styles.checkbox}
          value={three}
          onValueChange={() => setThree(!three)}
          />
          <Text>$$$</Text>
          <CheckBox
          style={styles.checkbox}
          value={four}
          onValueChange={() => setFour(!four)}
          />
          <Text>$$$$</Text>
          <Button
          title='create'
          onPress={() => createRoom()}
          />
          <Button
          title='go back'
          onPress={() => setCreate(false)}
          />
        </View>
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
        <View style={styles.modalView}>
          <TextInput
          style={styles.input}
          onChangeText={text => setCode(text)}
          placeholder={'Enter room code'}
          />
          <Button
          title='join'
          onPress={() => joinRoom()}
          />
          <Button
          title='go back'
          onPress={() => setJoin(false)}
          />
        </View>
      </Modal>
      <Button
      title='Sign out'
      onPress={() => signOut()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    backgroundColor: 'white',
  },
  checkbox: {
    alignSelf: 'center',
  },
  input: {
    height: 40,
  },
});

export default Home;