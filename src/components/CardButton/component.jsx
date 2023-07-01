//React + React Native Imports
import React from "react";

// UI Library and Elements Imports
import { Text, Box, Pressable, Button } from "native-base";

//Import Library Objects

//Components Imports

// External Style Sheet Import
import styles from "./styles";

export default function CardButton({
  onPress,
  firstWord,
  secondWord,
  disabled,
  style,
}) {
  return (
    <Box style={[styles.container, style]}>
      <Button
        _text={{ fontWeight: "bold" }}
        style={styles.button}
        onPress={onPress}
        isDisabled={disabled}
      >
        {firstWord}
        {secondWord}
      </Button>
    </Box>
  );
}
