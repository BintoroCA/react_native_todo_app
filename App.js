import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import TodoCard from "./component/TodoCard";
import { FlatList } from "react-native";
import axios from "axios";

export default function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function addTodo(e) {
    axios
      .post(
        "https://api.kontenbase.com/query/api/v1/aa8f8c5f-db3b-41d5-aa29-9cc97a003d21/ToDo APP",
        {
          Todo: e,
        }
      )
      .then((res) => console.log("----", res))
      .catch((error) => {
        console.log(error);
      });
    setTodo("");
  }

  function getTodos() {
    axios
      .get(
        "https://api.kontenbase.com/query/api/v1/aa8f8c5f-db3b-41d5-aa29-9cc97a003d21/ToDo%20APP"
      )
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch(() => {
        alert("Sum Ting Wong on Fetching");
      });
  }

  useEffect(() => {
    getTodos();
  }, [todo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <View style={styles.cardcontainer}>
        <FlatList
          // style={{ flex: 1 }}
          data={list}
          renderItem={({ item }) => <TodoCard Todo={item} />}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.txtinput}
          onChangeText={(todo) => setTodo(todo)}
          // value={todo}
          placeholder="what you gotta do ?"
        />
        <TouchableOpacity
          style={styles.inputbtn}
          onPress={() => addTodo(todo)}
          // onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btntext}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What you gotta do?</Text>
            <TextInput
              style={styles.txtinput}
              onChangeText={(todo) => setTodo(todo)}
              // value={todo}
              placeholder="what you gotta do ?"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 500,
    backgroundColor: "honeydew",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  title: {
    borderBottomLeftRadius: 30,
    // borderRadius: 15,
    borderBottomRightRadius: 30,
    // width: "100%",
    fontSize: 30,
    fontWeight: "500",
    padding: 15,
    backgroundColor: "royalblue",
    color: "white",
    textAlign: "center",
  },
  cardcontainer: {
    flex: 1,
    // marginTop: 15,
    // marginBottom: 15,
    margin: 15,
    backgroundColor: "white",
    borderColor: "royalblue",
    borderWidth: 3,
    borderRadius: 15,
    paddingTop: 5,
  },
  input: {
    flexDirection: "row",
    marginTop: "auto",
    // paddingBottom: "20",
    justifyContent: "center",
    backgroundColor: "white",
  },
  txtinput: {
    flex: 1,
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 15,
    borderColor: "royalblue",
    borderWidth: 1,
    marginEnd: 5,
  },
  inputbtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "royalblue",
    borderRadius: 15,
  },
  btntext: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  // modal style
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   // alignItems: "center",
  //   // marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
});
