import React, { useEffect, useState } from "react";
import { Text, Box, Button, FlatList ,HStack,VStack} from "native-base";
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";

import styles from "./styles";
import EventCard from "../../components/EventCard/component";
export default function Events({ navigation }) {
  const events = [
    {
      id: 1,
      name: "event",
      price: 100,
      date: "2023-7-10",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 2,
      name: "event",
      price: 100,
      date: "2023-7-3",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 3,
      name: "event",
      price: 100,
      date: "2023-8-10",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 4,
      name: "event",
      price: 100,
      date: "2025-8-10",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
  ]; //

  const [renderedEvents, setrenderedEvents]=useState(events);

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

  const filterEvents = (filter)=>{
    let filteredEvents
    switch (filter) {
      case "Week":
        filteredEvents =events.filter(event=>daysFromNow(event.date)<=7);
        setrenderedEvents(filteredEvents);
        break;
      case "Month":
        filteredEvents =events.filter(event=>daysFromNow(event.date)<=30);
        setrenderedEvents(filteredEvents);
        break;
      default:
        setrenderedEvents(events);
        break;
    }
  }

  return (
    <>
    {/* <Box safeArea mb="3">
      <HStack mx="3" my="2">
        <DrawerIcon navigation={navigation} iconSize={"lg"} />
      </HStack>
    </Box> */}

    <Box safeArea style={styles.container}>
      <HStack mb="3" justifyContent="space-between" width="70%">
        <Button style={styles.filterBtn} onPress={()=>filterEvents("All")}>All</Button>
        <Button style={styles.filterBtn} onPress={()=>filterEvents("Week")}>In Week</Button>
        <Button style={styles.filterBtn} onPress={()=>filterEvents("Month")}>In Month</Button>
      </HStack>
        <FlatList  
        style={styles.list}
        data={renderedEvents}
        renderItem={({item})=><EventCard event={item} routeToDetails={routeToDetails}/>}
        keyExtractor={item=>item.id}
        />
        {/* {events.map((event)=><EventCard event={event} routeToDetails={routeToDetails}/>)} */}
      </Box>
    <HomeButton navigation={navigation} />
  </>
  );
}
