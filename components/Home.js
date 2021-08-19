import React from 'react';
import { StyleSheet, Button, Text, View, TextInput, Modal } from 'react-native';

import Slider from '@react-native-community/slider';
import { Checkbox } from 'react-native-paper';

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
          <View style={styles.sliderContainer}>
            <Slider
            value={radius}
            minimumValue={0}
            maximumValue={10}
            />
            <Text>Radius: {radius}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
            label='$'
            status={one ? 'checked' : 'unchecked'}
            onPress={() => setOne(!one)}
            color='orange'
            />
            <Checkbox.Item
            label='$$'
            status={two ? 'checked' : 'unchecked'}
            onPress={() => setTwo(!two)}
            color='orange'
            />
            <Checkbox.Item
            label='$$$'
            status={three ? 'checked' : 'unchecked'}
            onPress={() => setThree(!three)}
            color='orange'
            />
            <Checkbox.Item
            label='$$$$'
            status={four ? 'checked' : 'unchecked'}
            onPress={() => setFour(!four)}
            color='orange'
            />
          </View>
          <Button
          title='create'
          onPress={() => createRoom()}
          />
          <Button
          title='go back'
          onPress={() => {
            setCreate(false);
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(true);
          }}
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 20,
    padding: 35,
  },
  sliderContainer: {
    alignItems: 'stretch',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
  },
});

export default Home;