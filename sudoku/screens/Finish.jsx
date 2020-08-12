import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, AsyncStorage } from "react-native";

function Finish({ route, navigation }) {
  const { name, time } = route.params;
  let value;

  const [leaderBoard, setLeaderBoard] = useState([]);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getMultiple = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      value = await AsyncStorage.multiGet(keys);
      setLeaderBoard(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    storeData(name, String(time));
  }, []);
  useEffect(() => {
    getMultiple();
  }, []);

  leaderBoard.sort((x, y) => +x[1] - +y[1]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 27, marginBottom: 10 }}>LeaderBoard</Text>
      <View style={{ borderWidth: 1 }}>
        <View style={{ borderBottomWidth: 1 }}>
          <View
            style={{
              flexDirection: "row",
              width: 150,
            }}
          >
            <View
              style={{ width: 150, alignItems: "center", borderRightWidth: 1 }}
            >
              <Text>Name</Text>
            </View>
            <View style={{ width: 150, alignItems: "center" }}>
              <Text>Duration</Text>
            </View>
          </View>
        </View>
        {leaderBoard.map((score, index) => (
          <View key={index} style={{ flexDirection: "row", width: 300 }}>
            <View
              style={{ width: 150, alignItems: "center", borderRightWidth: 1 }}
            >
              <Text style={{ fontSize: 16 }}>{score[0]}</Text>
            </View>
            <View style={{ width: 150, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>{score[1]}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ width: 80, marginTop: 10 }}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11999e",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Finish;
