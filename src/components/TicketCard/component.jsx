//React + React Native Imports
import React from "react";

// UI Library and Elements Imports
import { Center, Box, Text } from "native-base";

//Import Library Objects

//Components Imports

import CardButton from "../CardButton/component";

// External Style Sheet Import
import styles from "./styles";

export default function TicketCard({eventTitle, status, type, date, time, style }) {
  return (
    <Box style={styles.card}>
      <Text style={styles.eventTitle}>{eventTitle}</Text>
      <Center style={styles.group5Row}>
        <Box style={styles.group5}>
          <Box style={styles.infoCard}>
            <Box style={styles.information}>
              <Box   style={styles.group}>
                <Text style={styles.infoLabel}>Status :</Text>
                <Text style={styles.infoData}>{status}</Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Type :</Text>
                <Text style={styles.infoData}>{type}</Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Date :</Text>
                <Text style={styles.infoData}>{date}</Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Time :</Text>
                <Text style={styles.infoData}>{time}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <CardButton
          onPress={() => {
            console.log("Card Button Pressed");
          }}
          firstWord={"Enter"}
          secondWord={"Event"}
          disabled={false}
        />
      </Center>
    </Box>
  );
}
