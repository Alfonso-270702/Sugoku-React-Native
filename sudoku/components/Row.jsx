import React from "react";
import { View } from "react-native";
import Block from "./Block";

export default function Row(props) {
  const { board } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      {board.map((block, index) => (
        <Block block={block} key={index} />
      ))}
    </View>
  );
}
