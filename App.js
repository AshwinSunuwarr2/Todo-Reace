
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Task from './components/task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])

  const addTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  };

  const deleteAll = () => {
    let itemsCopy = [];
    setTaskItems(itemsCopy)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* headin of todo */}
        <View style={{ backgroundColor: "black", padding: 14, alignItems: 'left', marginTop: 20, width: "100%" }}>
          <Text style={styles.headtxt}>Todo App</Text>
        </View>
        {/* remove all */}
        <TouchableOpacity style={styles.removeall} onPress={() => deleteAll()}>
          <Text style={{ fontSize: 18, color: "white", letterSpacing: 0.25, fontWeight: '700' }}>Remove all</Text>
        </TouchableOpacity>
        {/* lists of todos and remove btn*/}
        <View>
          <View style={styles.todolist}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.todocard}>
                  <Task text={item} />

                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Image style={styles.deleteicon} source={require('./assets/images/delete.png')} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        {/* input field for todo */}
      </ScrollView>
      <KeyboardAvoidingView style={styles.inputxtwrapper}>
        <TextInput placeholder='Enter your task' style={styles.inputField} value={task} onChangeText={(text) => { setTask(text) }} />
        <TouchableOpacity onPress={() => { addTask() }}>
          <Image source={require('./assets/images/plus.png')} style={styles.plusiconstyle} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", backgroundColor: '#e8e7e6'
  },
  headtxt: { fontSize: 20, fontWeight: "700", color: "orange" },
  removeall: { backgroundColor: "red", borderRadius: 5, padding: 8, flex: 0, alignSelf: 'flex-end', margin: 5, width: 120, alignItems: 'center' },
  removealltxt: {},
  plusiconstyle: {
    backgroundColor: 'white', height: 50, borderTopRightRadius: 10, resizeMode: 'contain', width: 30, marginBottom: 4, borderBottomRightRadius: 10
  },
  inputField: {
    padding: 7, fontSize: 16, backgroundColor: "white", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, flex: 1, height: 50, fontWeight: '600', marginBottom: 4
  },
  inputxtwrapper: { flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding: 4, alignSelf: 'flex-end' },

  todocard: { backgroundColor: 'white', margin: 10, borderRadius: 12, flex: 0, flexDirection: 'row', alignItems: 'center', padding: 7, justifyContent: 'space-between' },

  deleteicon: { width: 25, height: 25 }
});
