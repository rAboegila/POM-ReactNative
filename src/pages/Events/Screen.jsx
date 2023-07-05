import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  FlatList,
  HStack,
  Center,
  useDisclose,
  Spinner,
} from "native-base";
import HomeButton from "../../components/HomeButton/component";

import styles from "./styles";
import EventCard from "../../components/EventCard/component";
import DrawerIcon from "../../components/DrawerIcon/component";
import api, { apiToken } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/features/auth/authSlice";
import { fetchEvents, getEvents } from "../../redux/features/events/eventSlice";
export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);
  const [renderedEvents, setRenderedEvents] = useState(events);
  const [pageLoading, setPageLoading] = useState(true);

  const routeToDetails = (event) => {
    navigation.navigate("Event Details", { event });
  };

  const daysFromNow = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filterEvents = (filter) => {
    setPageLoading(true);
    let filteredEvents;
    switch (filter) {
      case "Week":
        filteredEvents = events.filter(
          (event) => daysFromNow(event.duration?.startDate.slice(0, 10)) <= 7
        );
        setRenderedEvents(filteredEvents);
        break;
      case "Month":
        filteredEvents = events.filter(
          (event) => daysFromNow(event.duration?.startDate.slice(0, 10)) <= 30
        );
        setRenderedEvents(filteredEvents);
        break;
      default:
        setRenderedEvents(events);
        break;
    }
    setPageLoading(false);
  };

  const getEvents = async () => {
    const tokenInstance = await apiToken();
    await tokenInstance
      .get("Event/events")
      .then((res) => {
        setRenderedEvents(res.data.data);
        setEvents(res.data.data);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setPageLoading(false));
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>
      <Box safeArea style={styles.container}>
        <HStack mb="3" justifyContent="space-between" width="70%">
          <Button colorScheme="green" onPress={() => filterEvents("All")}>
            All
          </Button>
          <Button colorScheme="green" onPress={() => filterEvents("Week")}>
            In Week
          </Button>
          <Button colorScheme="green" onPress={() => filterEvents("Month")}>
            In Month
          </Button>
        </HStack>
        {pageLoading ? (
          <Spinner size={"lg"} color="emerald.500" />
        ) : (
          <FlatList
            style={styles.list}
            data={renderedEvents}
            renderItem={({ item }) => (
              <Center>
                <EventCard
                  event={item}
                  routeToDetails={routeToDetails}
                  navigation={navigation}
                />
              </Center>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </Box>
      <HomeButton navigation={navigation} />
    </>
  );
}
