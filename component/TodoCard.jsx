import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function TodoCard(props) {
  const [deleteState, setDeteleState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  function renderUpdate(par1) {
    setUpdateState(true);
    setNewTodo(par1);
  }

  function handleUpdate(par1, par2, par3) {
    axios
      .patch(
        `https://api.kontenbase.com/query/api/v1/b9278cc8-6353-475e-8a34-1e55e4142a42/todos/${par2}`,
        {
          todo: par1,
        }
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    setUpdateState(false);
    par3();
  }

  function handleDelete(par1) {
    // setDeteleState(!deleteState);

    axios
      .delete(
        `https://api.kontenbase.com/query/api/v1/aa8f8c5f-db3b-41d5-aa29-9cc97a003d21/ToDo APP/${par1}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        alert("Error Delete Data");
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerlist}
        onPress={() => renderUpdate(props.text)}
      >
        <Text style={styles.list} numberOfLines={2}>
          {props.Todo}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containericon}>
        <AntDesign
          style={styles.delete}
          name="delete"
          size={24}
          color="black"
          onPress={() => {
            handleDelete(props._id);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "greenyellow",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  containerlist: {
    flex: 7,
  },
  containericon: {
    flex: 3,
    overflow: "hidden",
  },
  list: {
    fontSize: 25,
    fontWeight: 500,
    paddingStart: 10,
  },
  delete: {
    marginLeft: "auto",
    paddingEnd: 10,
  },
});
