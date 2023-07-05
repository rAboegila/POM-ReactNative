//React + React Native Imports
import React from "react";

// UI Library and Elements Imports
import { Center, Box, Text,Image, Button } from "native-base";

//Import Library Objects

//Components Imports

import CardButton from "../CardButton/component";

// External Style Sheet Import
import styles from "./styles";

export default function NewsCard({ title, body,viewMore, navigation }) {
  return (
    <Box style={styles.card}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Center style={styles.group5Row}>
        <Box style={styles.group}>
          <Box style={styles.infoCard}>
            <Box style={styles.information}>
              <Box style={styles.group}>
                <Text>{body}</Text>
              </Box>
              {/* <Button style={styles.viewMore} colorScheme="green">here</Button> */}
            </Box>
          </Box>
        <CardButton
          onPress={viewMore}
          firstWord={"View"}
          secondWord={"More"}
          disabled={false}
        />
        </Box>
      </Center>
    </Box>
  );
}
