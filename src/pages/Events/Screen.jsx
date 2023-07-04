import React, { useEffect, useState } from "react";
import { Text, Box, Button, FlatList, HStack, Center } from "native-base";
import HomeButton from "../../components/HomeButton/component";

import styles from "./styles";
import EventCard from "../../components/EventCard/component";
import DrawerIcon from "../../components/DrawerIcon/component";
import api, { apiToken } from "../../lib/api";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/features/auth/authSlice";
export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);
  // const events = [
  //   {
  //     id: 1,
  //     name: "event",
  //     price: 100,
  //     date: "2023-7-10",
  //     type: "parkour",
  //     description:
  //       "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
  //   },
  //   {
  //     id: 2,
  //     name: "event",
  //     price: 100,
  //     date: "2023-7-3",
  //     type: "parkour",
  //     description:
  //       "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
  //   },
  //   {
  //     id: 3,
  //     name: "event",
  //     price: 100,
  //     date: "2023-8-10",
  //     type: "parkour",
  //     description:
  //       "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
  //   },
  //   {
  //     id: 4,
  //     name: "event",
  //     price: 100,
  //     date: "2025-8-10",
  //     type: "parkour",
  //     description:
  //       "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
  //   },
  // ]; //

  const [renderedEvents, setRenderedEvents] = useState(events);

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
  };

  const token = useSelector(getToken);
  const getEvents = async () => {
    await api
      .get("Event/events", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setRenderedEvents(res.data.data);
        setEvents(res.data.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      {/* <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box> */}
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
        <FlatList
          style={styles.list}
          data={renderedEvents}
          renderItem={({ item }) => (
            <Center>
              <EventCard event={item} routeToDetails={routeToDetails} />
            </Center>
          )}
          keyExtractor={(item) => item._id}
        />
        {/* {events.map((event)=><EventCard event={event} routeToDetails={routeToDetails}/>)} */}
      </Box>
      <HomeButton navigation={navigation} />
    </>
  );
}
