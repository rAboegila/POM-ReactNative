//React + React Native Imports
import React, { useEffect, useState } from "react";

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

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getTickets,
  fetchTickets,
} from "../../redux/features/tickets/ticketSlice";
import { getID } from "../../redux/features/profile/profileSlice";
// External Style Sheet Import
import styles from "./styles";
export default function MyTickets({ navigation }) {
  const dispatch = useDispatch();
  const Filters = ["All", "Past", "Future", "Now"];
  const userID = useSelector(getID);
  useEffect(() => {
    dispatch(fetchTickets(userID));
  }, [dispatch]);

  const myTickets = useSelector(getTickets);
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
      {myTickets === [] ? (
        <ScrollView mt="3">
          <Center>
            {myTickets.map((ticket, index) => (
              <TicketCard
                style={styles.eventCard}
                ticket={ticket}
                navigation={navigation}
                key={ticket.eventID + "-ticket_" + index}
              ></TicketCard>
            ))}
          </Center>
        </ScrollView>
      ) : (
        <Center style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }} size="xxl">
            No Tickets Available!
          </Text>
        </Center>
      )}

      <HomeButton navigation={navigation} />
    </>
  );
}
