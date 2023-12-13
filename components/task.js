import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Task = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemtext}>{props.text}</Text>
        </View>
    )
}

export default Task;

const styles = StyleSheet.create({
    item: { padding: 9, width: '90%' },
    itemtext: { fontSize: 18 }
})