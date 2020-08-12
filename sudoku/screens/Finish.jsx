import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function Finish({ route, navigation }) {
  const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text>Congrats {name} You win the challange</Text>
      <View style={{ width: 80 }}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>
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

export default Finish;
