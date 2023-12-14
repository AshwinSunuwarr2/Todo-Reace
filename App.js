import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';

import TaskCard from './components/task';
import { useState, useRef } from 'react';

export default function App() {
  const [task, setTask] = useState();
  const [taskItem, setTaskItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null)

  const textRef = useRef(null)

  const addTask = () => {
    Keyboard.dismiss();
    if (task) {
      if (editIndex !== null) {
        let copyItems = [...taskItem]
        copyItems[editIndex] = task
        setTaskItem(copyItems)
        setEditIndex(null)
      }
      else {
        setTaskItem([...taskItem, task])
      }
      setTask(null)
    }
  }

  const deleteAll = () => {
    let copyItems = [];
    setTaskItem(copyItems)
  }

  const deleteItem = (index) => {
    let copyItems = [...taskItem]
    copyItems.splice(index, 1)
    setTaskItem(copyItems)
  }

  const editTask = (index) => {
    setTask(taskItem[index])
    setEditIndex(index)

    if (textRef.current) {
      textRef.current.focus()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headTxt}>Todo</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity style={styles.removeall} onPress={() => deleteAll()}>
          <Text style={{ fontSize: 16, fontWeight: "700", letterSpacing: 0.25, color: '#fff' }}>Remove all</Text>
        </TouchableOpacity>
        {/* -----  mapping for list items ----- */}
        <View style={styles.itemContainer}>
          {taskItem.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.todoCard} onPress={() => editTask(index)}>
                <TaskCard text={item} />
                <TouchableOpacity key={index} onPress={() => {
                  deleteItem(index)
                }}>
                  <Image source={require('./image/delete.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      <KeyboardAvoidingView style={styles.txtInputWrapper}>
        <TextInput ref={textRef} placeholder='Enter your task' style={styles.txtInput} value={task} onChangeText={(text) => { setTask(text) }} />
        <TouchableOpacity onPress={() => addTask()}>
          <Image source={require('./image/plus.png')} />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d4d5',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  headTxt: { fontSize: 22, padding: 10, backgroundColor: 'orange', marginTop: 34, fontWeight: '700', letterSpacing: 0.5, color: '#30302f', borderTopLeftRadius: 20, borderTopRightRadius: 20 },

  removeall: { backgroundColor: '#fa3c45', padding: 7, width: 100, borderRadius: 20, margin: 4, alignItems: 'center', alignSelf: 'flex-end', elevation: 4 },

  taskCard: { backgroundColor: '#fff', padding: 12, margin: 5, borderRadius: 18 },
  dltBtn: { width: 25, height: 25 },

  itemContainer: { flex: 0 },
  todoCard: { flex: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', margin: 8, borderRadius: 18, alignItems: 'center' },

  txtInputWrapper: { backgroundColor: '#fff', padding: 9, flex: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopStartRadius: 20, borderTopEndRadius: 20 },
  txtInput: { fontSize: 18, fontWeight: '500', width: '90%', padding: 4 }
});