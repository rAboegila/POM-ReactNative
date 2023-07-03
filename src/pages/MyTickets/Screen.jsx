//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import {
  Box,
  Text,
  HStack,
  Center,
  Avatar,
  IconButton,
  ScrollView,
  ZStack,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";
import TicketCard from "../../components/TicketCard/component";
import FilterItem from "../../components/FilterItem/component";

// External Style Sheet Import
import styles from "./styles";
export default function MyTickets({ navigation }) {
  const Filters = ["All", "Past", "Future", "Now"];
  const myTickets = [
    {
      eventTitle: "Speed Run",
      status: "Pending",
      type: "Early Bird - Guest",
      date: "2023-07-12",
      time: "12 pm",
    },
    {
      eventTitle: "Parkour Free Run",
      status: "Verified",
      type: "Early Bird - Participant",
      date: "2023-07-12",
      time: "12 pm",
    },
    {
      eventTitle: "Skate Free Style",
      status: "Cancelled",
      type: "Regular - Guest",
      date: "2023-07-12",
      time: "12 pm",
    },
    {
      eventTitle: "Keep Moving",
      status: "Verified",
      type: "Regular - Guest",
      date: "2023-07-12",
      time: "12 pm",
    },
  ];
  return (
    <>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>
      <Center>
        <Box style={styles.group}>
          {Filters.map((label, index) => (
            <FilterItem
              style={styles.filterItem}
              label={label}
              onPress={() => console.log(label, "Button")}
              disabled={false}
              key={label + "_" + index}
            ></FilterItem>
          ))}
        </Box>
      </Center>
      <ScrollView mt="3">
        <Center>
          {myTickets.map((ticket, index) => (
            <TicketCard
              style={styles.eventCard}
              eventTitle={ticket.eventTitle}
              status={ticket.status}
              type={ticket.type}
              date={ticket.date}
              time={ticket.time}
              navigation={navigation}
              key={ticket.eventTitle + "-ticket_" + index}
            ></TicketCard>
          ))}
        </Center>
      </ScrollView>
      <HomeButton navigation={navigation} />
    </>
  );
}
