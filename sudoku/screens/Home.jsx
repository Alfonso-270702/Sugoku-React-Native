import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";

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
      <View
        style={{
          backgroundColor: "#769fcd",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 300,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <View style={{ flex: 0.25, padding: 10 }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "bold",
              fontStyle: "italic",
              color: "white",
            }}
          >
            Sogokuy
          </Text>
        </View>
        <View
          style={{
            width: 250,
            marginBottom: 10,
            backgroundColor: "white",
            padding: 7,
            borderRadius: 10,
          }}
        >
          <TextInput
            style={{ textAlign: "center" }}
            value={name}
            placeholder="Input your name"
            onChangeText={(text) => setName(text)}
          ></TextInput>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 10 }}>
            <View
              style={styles.button}
              style={{ marginBottom: 20, marginTop: 10 }}
            >
              <Button
                color="#0077c2"
                title="Easy"
                onPress={() => onChangeScreen("easy")}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#6a0080"
                title="Medium"
                onPress={() => onChangeScreen("medium")}
              />
            </View>
          </View>

          <View>
            <View
              style={styles.button}
              style={{ marginBottom: 20, marginTop: 10 }}
            >
              <Button
                color="#d50000"
                title="Hard"
                onPress={() => onChangeScreen("hard")}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#673ab7"
                title="Random"
                onPress={() => onChangeScreen("random")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "#404b69",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
