import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Center, Pressable, Text, Icon } from "native-base";
// External Style Sheet Import
import styles from "./styles";
import { log } from "react-native-reanimated";
export default HomeButton = ({ navigation }) => {
  function buttonPressed() {
    navigation.navigate("Dashboard");
  }
  //<AntDesign name="home" size={24} color="black" />
  return (
    <Center>
      <Pressable style={styles.button} onPress={buttonPressed}>
        <Icon as={AntDesign} name="home" size={"5xl"} color="white" />
        {/* <Text style={styles.text}>Dashboard</Text> */}
      </Pressable>
    </Center>
  );
};
