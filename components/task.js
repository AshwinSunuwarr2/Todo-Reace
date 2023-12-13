import React from "react";
import { Text, Image, View, StyleSheet, TextInput } from "react-native";

const TaskCard = (prop) => {
    return (
        <View style={styles.todoTask}>
            <Text style={{ fontSize: 18, letterSpacing: 0.5 }}>{prop.text}</Text>
        </View>
    )
}

export default TaskCard;

const styles = StyleSheet.create({
    todoTask: { width: "90%" }
})