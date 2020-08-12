import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { setBoardAsync } from "../store/actions/boardActions";
import { useDispatch, useSelector } from "react-redux";
import CountDown from "react-native-countdown-component";

import { encodeParams } from "../hooks/encodeParams";

const windowHeight = Dimensions.get("window").height;

function Game({ navigation, route }) {
  const { difficulty, name } = route.params;
  const dispatch = useDispatch();

  const [inputBoard, setInputBoard] = useState([]);
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");

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
  let duration = 60;
  let isRunning = status === "solved" ? false : true;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <CountDown
            until={duration}
            size={20}
            running={isRunning}
            onChange={(x) => setTime(duration - x)}
            onFinish={() => {
              alert("Time Up"), navigation.navigate("Home");
            }}
            digitStyle={{ backgroundColor: "black" }}
            digitTxtStyle={{ color: "#1CC625" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "black", fontSize: 27, fontStyle: "italic" }}>
            {status}
          </Text>
        </View>

        {inputBoard.length > 0 &&
          inputBoard.map((row, index1) => (
            <View
              style={
                index1 == 2 || index1 == 5
                  ? {
                      flexDirection: "row",
                      marginBottom: 10,
                    }
                  : { flexDirection: "row" }
              }
              key={index1}
            >
              {row.map((col, index2) => (
                <View
                  style={
                    index2 == 2 || index2 == 5
                      ? { marginRight: 10 }
                      : { margin: 0 }
                  }
                  key={index2}
                >
                  <TextInput
                    onChangeText={(text) =>
                      changeInputNum(text, { index1, index2 })
                    }
                    keyboardType={"numeric"}
                    maxLength={1}
                    editable={board[index1][index2] === 0 ? true : false}
                    value={col === 0 ? "" : col.toString()}
                    backgroundColor={
                      board[index1][index2] === 0 ? "white" : "orange"
                    }
                    style={styles.input}
                  />
                </View>
              ))}
            </View>
          ))}
        {inputBoard.length === 0 ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {status == "solved" ? (
              <View>
                <Button
                  title="Submit"
                  onPress={() => navigation.navigate("Finish", { name, time })}
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
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 2,
    borderColor: "#eaeaea",
    textAlign: "center",
    width: 30,
    height: 30,
    shadowColor: "#222831",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: windowHeight,
  },
});

export default Game;
