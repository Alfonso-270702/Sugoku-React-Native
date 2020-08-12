import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

function Home({ navigation }) {
  const [name, setName] = useState("");

  function onChangeScreen(level) {
    if (!name) {
      alert("Name Must be Filled");
    } else {
      navigation.navigate("Game", {
        difficulty: level,
        name,
      });
      setName("");
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={name}
          placeholder="Input your name"
          onChangeText={(text) => setName(text)}
        ></TextInput>
      </View>
      <View style={styles.content}>
        <View style={styles.button}>
          <Button
            color="#008080"
            title="Easy"
            onPress={() => onChangeScreen("easy")}
          />
        </View>
        <View style={styles.button}>
          <Button title="Medium" onPress={() => onChangeScreen("medium")} />
        </View>
        <View style={styles.button}>
          <Button title="Hard" onPress={() => onChangeScreen("hard")} />
        </View>
        <View style={styles.button}>
          <Button title="Random" onPress={() => onChangeScreen("random")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    margin: 5,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
