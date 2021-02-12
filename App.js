/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Input,
  Header,
  Overlay,
  ListItem,
  Avatar,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

const App = () => {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const renderList = () => {
    if (edit) {
      return list.map(({todo, done}, i) => (
        <ListItem
          key={i}
          bottomDivider
          containerStyle={{
            backgroundColor: done ? '#144959' : '#155263',
            borderColor: '#ffc93c',
            height: 100,
          }}>
          <Icon name="dot-circle" size={24} color="grey" />
          <ListItem.Content style={styles.list}>
            <ListItem.Title
              style={{
                textDecorationLine: done ? 'line-through' : 'none',
                color: done ? '#b84f2a' : '#ff6f3c',
                fontFamily: 'Cascadia',
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              {todo}
            </ListItem.Title>
            <View style={{flexDirection: 'row'}}>
              <Button
                containerStyle={{marginRight: 10}}
                buttonStyle={{backgroundColor: 'red'}}
                icon={{type: 'AntDesign', name: 'edit'}}></Button>
              <Button
                icon={{type: 'AntDesign', name: 'delete'}}
                onPress={() =>
                  setList(
                    list.filter((val, index) => {
                      return i !== index;
                    }),
                  )
                }></Button>
            </View>
          </ListItem.Content>
        </ListItem>
      ));
    } else {
      return list.map(({todo, done}, i) => (
        <ListItem
          key={i}
          bottomDivider
          containerStyle={{
            backgroundColor: done ? '#144959' : '#155263',
            borderColor: '#ffc93c',
            height: 100,
          }}>
          <Icon name="dot-circle" size={24} color="grey" />
          <ListItem.Content style={styles.list}>
            <ListItem.Title
              style={{
                textDecorationLine: done ? 'line-through' : 'none',
                color: done ? '#b84f2a' : '#ff6f3c',
                fontFamily: 'Cascadia',
                fontWeight: 'bold',
                fontSize: 24,
              }}
              onPress={() =>
                setList(
                  list.map((val, index) => {
                    if (i === index) {
                      return {...val, done: !val.done};
                    } else {
                      return val;
                    }
                  }),
                )
              }>
              {todo}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ));
    }
  };

  const handleAddTodo = () => {
    if (!/^\s*$/.test(todo)) {
      setList([...list, {todo, done: false}]);
    }

    setVisible(!visible);
  };
  console.log(list);
  return (
    <>
      <SafeAreaProvider>
        <View style={styles.mainContainer}>
          <Header
            // leftComponent={{icon: 'menu', color: '#ff9a3c', size: 38}}
            leftComponent={{
              text: 'TODO',
              style: {
                color: '#ffc93c',
                fontFamily: 'Cascadia',
                fontWeight: 'bold',
                fontSize: 28,
              },
            }}
            rightComponent={
              <Button
                title={edit ? 'CONFIRM' : 'EDIT'}
                buttonStyle={{
                  backgroundColor: '#ff9a3c',
                  borderRadius: 10,
                  paddingRight: 20,
                  paddingLeft: 20,
                  width: 130,
                }}
                titleStyle={{
                  color: '#155263',
                  fontFamily: 'Cascadia',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
                onPress={handleEdit}
              />
            }
            containerStyle={{
              backgroundColor: '#155263',
              justifyContent: 'space-around',
            }}
            style={styles.textStyle}
          />
          <View>{renderList()}</View>

          <View style={styles.addButton}>
            <TouchableOpacity style={styles.button}>
              <Button
                onPress={toggleOverlay}
                icon={{
                  type: 'Ionicons',
                  name: 'add',
                  backgroundColor: 'trasparent',
                  size: 50,
                  color: '#155263',
                }}
                buttonStyle={{
                  backgroundColor: '#ff9a3c',
                  width: 100,
                  height: 100,
                  borderRadius: 30,
                  //   shadowOffset: {width: 10, height: 10},
                  //   shadowColor: 'black',
                  //   shadowOpacity: 1.0,
                }}
              />
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View>
                <Input
                  placeholder="type here"
                  // leftIcon={{
                  //   type: 'font-awesome',
                  //   name: 'chevron-right',
                  //   color: '#ff6f3c',
                  // }}
                  onChangeText={(e) => setTodo(e)}
                  inputStyle={{color: '#ff6f3c', fontFamily: 'Cascadia'}}
                  containerStyle={{
                    borderColor: '#ff6f3c',
                    width: 200,
                  }}
                />
                <Button
                  // icon={<Icon name="arrow-right" size={15} color="#155263" />}
                  title="Submit"
                  titleStyle={{color: 'black'}}
                  buttonStyle={{backgroundColor: '#ffc93c'}}
                  onPress={handleAddTodo}
                />
              </View>
            </Overlay>
          </View>
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#155263',
    flex: 1,
  },
  textStyle: {
    color: '#ff6f3c',
    fontFamily: 'Cascadia',
    fontWeight: 'bold',
    // textDecorationLine: true ? 'line-through' : 'none',
  },
  addButton: {
    position: 'absolute',
    bottom: 33,
    right: 15,
  },
  button: {
    borderRadius: 30,
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingLeft: 50,
    // paddingRight: 50,
    backgroundColor: '#ff9a3c',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  editButton: {
    color: 'black',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn_style: {
    backgroundColor: 'red',
  },
});

export default App;
