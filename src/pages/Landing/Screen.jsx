//React Native/React Imports

import React from "react";
import { ImageBackground, View } from "react-native";

// Redux Imports

// Slices Imports

// Native Base Imports
import { Text, Box, Button, ZStack } from "native-base";

// styles import
import styles from "./styles";

import bgImage from "../../../assets/Landing.jpg";
export default function Landing({ navigation }) {
  return (
    <Box flex={1} bg="#fff">
      <ImageBackground source={bgImage} resizeMode="cover" style={{ flex: 1 }}>
        <Box
          style={{ flex: 1, justifyContent: "flex-end" }}
          bg="rgba(187, 247, 208,0.4)"
        >
          <Box p="3">
            <Button
              onPress={() => navigation.navigate("Home")}
              colorScheme="lime"
              mb="80px"
              _text={{
                letterSpacing: "2xl",
                fontWeight: "bold",
                fontSize: "lg",
              }}
            >
              Join Our Community
            </Button>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}
