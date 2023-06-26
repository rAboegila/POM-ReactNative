//React Native/React Imports

import React from "react";

// Redux Imports

// Slices Imports

// Native Base Imports
import { Text, Box, Button } from "native-base";

// styles import
import styles from "./styles";

export default function Landing({ navigation }) {
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Text>Landing Screen!</Text>
      <Button onPress={() => navigation.navigate("Index")}>
        Go To Dashboard
      </Button>
      <Button onPress={() => navigation.navigate("SignIn")}>
        Go To Dashboard
      </Button>
    </Box>
  );
}
