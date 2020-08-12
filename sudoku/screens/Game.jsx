import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { setBoardAsync } from "../store/actions/boardActions";
import { useDispatch, useSelector } from "react-redux";

function Game({ navigation, route }) {
  const { difficulty, name } = route.params;
  const dispatch = useDispatch();

  const [inputBoard, setInputBoard] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(setBoardAsync(difficulty));
  }, []);

  const board = useSelector((state) => state.board);

  useEffect(() => {
    setInputBoard(board);
  }, [board]);

  function changeInputNum(text, location) {
    const inputNumToBoard = JSON.parse(JSON.stringify(inputBoard));
    inputNumToBoard[location.index1][location.index2] = +text;
    setInputBoard(inputNumToBoard);
  }

  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  function solveSudoku() {
    const data = { board };
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        setInputBoard(response.solution);
      })
      .catch(console.warn);
  }

  function validateSudoku() {
    const data = { board: inputBoard };
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        setStatus(response.status);
      })
      .catch(console.warn);
  }

  return (
    <View style={styles.container}>
      <Text>{status}</Text>
      {inputBoard.length > 0 &&
        inputBoard.map((row, index1) => (
          <View style={{ flexDirection: "row" }} key={index1}>
            {row.map((block, index2) => (
              <View key={index2}>
                <TextInput
                  onChangeText={(text) =>
                    changeInputNum(text, { index1, index2 })
                  }
                  keyboardType={"numeric"}
                  maxLength={1}
                  editable={board[index1][index2] === 0 ? true : false}
                  value={block === 0 ? "" : block.toString()}
                  style={styles.input}
                />
              </View>
            ))}
          </View>
        ))}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {status == "solved" ? (
          <View>
            <Button
              title="Submit"
              onPress={() => navigation.navigate("Finish", { name })}
            />
          </View>
        ) : (
          <View>
            <Button title="solve" onPress={() => solveSudoku()} />
          </View>
        )}
        <View style={{ marginLeft: 10 }}>
          <Button title="validate" onPress={() => validateSudoku()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#87ceeb",
    textAlign: "center",
    padding: 7,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Game;
