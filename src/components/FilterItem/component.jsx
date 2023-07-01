//React + React Native Imports
import React from "react";

// UI Library and Elements Imports
import { Text, Box, Pressable, Button } from "native-base";

//Import Library Objects

//Components Imports

// External Style Sheet Import
import styles from "./styles";

export default function FilterItem({ label, onPress, disabled }) {
  return (
    <Box style={styles.container}>
      {/* <Pressable style={styles.button} onPress={onPress} isDisabled={disabled}>
        <Text style={styles.text}>{label}</Text>
      </Pressable> */}
      <Button
        colorScheme={"success"}
        style={[styles.button]}
        onPress={onPress}
        isDisabled={disabled}
      >
        {label}
      </Button>
    </Box>
  );
}
