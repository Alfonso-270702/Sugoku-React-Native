import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Block(props) {
  const { block } = props;
  const [inputNum, setInputNum] = useState(`${block}`);
  return (
    <View>
      <TextInput
        keyboardType={"numeric"}
        maxLength={1}
        value={inputNum}
        onChangeText={(text) => setInputNum(text)}
        style={style.input}
      ></TextInput>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#87ceeb",
    textAlign: "center",
    padding: 7,
  },
});
