//React + React Native Imports
import React, { useEffect, useState } from "react";

// UI Library and Elements Imports
import { Center, Box, Text } from "native-base";

//Import Library Objects
import { getSavedToken } from "../../lib/secureStorage";
import {
  getLocaleTime,
  getLocaleDate,
  toSentenceCase,
  addWhiteSpace
} from "../../lib/helpers";
//Components Imports

import CardButton from "../CardButton/component";

// External Style Sheet Import
import styles from "./styles";

export default function TicketCard({ ticket, navigation }) {
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("\n\n\nGET EVENT FUNCTION");
    setIsLoading(true);
    const getEvent = async () => {
      const token = await getSavedToken();
      await api
        .get("/Event/event/" + ticket.event, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("___________\n\ngetEvent", res.data.data);
          setEvent(res.data.data);
        })
        .catch((err) => console.log(err.response.data))
        .finally(() => setIsLoading(false));
    };
    getEvent();
  }, [ticket]);

  return (
    <Box style={styles.card} shadow={4}>
      <Text style={styles.eventTitle}>
        {event ?addWhiteSpace(event.name) : "Event"}
      </Text>
      <Center style={styles.group5Row}>
        <Box style={styles.group}>
          <Box style={styles.infoCard}>
            <Box style={styles.information}>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Status :</Text>
                <Text style={styles.infoData}>
                  {toSentenceCase(ticket.paymentStatus)}
                </Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Type :</Text>
                <Text style={styles.infoData}>
                  {toSentenceCase(ticket.type)}
                </Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Date :</Text>
                <Text style={styles.infoData}>
                  {event ? getLocaleDate(event.duration.startDate) : "date"}
                </Text>
              </Box>
              <Box style={styles.group}>
                <Text style={styles.infoLabel}>Time :</Text>
                <Text style={styles.infoData}>
                  {event
                    ? getLocaleTime(event.duration.startTime.time)
                    : "time"}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <CardButton
          onPress={() => {
            console.log("Card Button Pressed");
            navigation.navigate("NotFound");
          }}
          firstWord={"Enter"}
          secondWord={"Event"}
          disabled={false}
        /> */}
      </Center>
    </Box>
  );
}
