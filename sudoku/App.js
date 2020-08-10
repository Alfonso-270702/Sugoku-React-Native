import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Row from "./components/Row";

export default function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios({
      url: "https://sugoku.herokuapp.com/board?difficulty=random",
      method: "get",
    })
      .then(({ data }) => {
        setBoards(data.board);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Sudoku</Text>
      {boards.map((board, index) => (
        <Row board={board} key={index} />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
