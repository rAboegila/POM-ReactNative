import { View, Text, Pressable } from "react-native";
import React from "react";
import { Box, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "./styles"

export default function GoBackButton({ navigation }) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.goBack()}>
        <AntDesign  name="banckward" size={24} color="black"/>
    </Pressable>
  );
}
