import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle){
      setTasks(oldTasks => [...oldTasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }])
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const updatedTasks = tasks.map( task => {
      if(task.id === id) {
        return {
          ...task,
          done: true
        }
      }

      return {...task}
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter( task => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <View style={styles.container}>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101E',
  },
});