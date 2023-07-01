import React from "react";
import { Text, Box, Button, FlatList ,HStack,VStack} from "native-base";
import DrawerIcon from "../../components/DrawerIcon/component";
// import HomeButton from "../../components/HomeButton/component";

import styles from "./styles";
import EventCard from "../../components/EventCard/component";
export default function Events({ navigation }) {
  const events = [
    {
      id: 1,
      name: "event",
      price: 100,
      date: "5/10/2022",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 2,
      name: "event",
      price: 100,
      date: "5/10/2022",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 3,
      name: "event",
      price: 100,
      date: "5/10/2022",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
    {
      id: 4,
      name: "event",
      price: 100,
      date: "5/10/2022",
      type: "parkour",
      description:
        "loremipsumksladakdmklasdklsamdlkaslkdmklsamdlkmaskldmklamsdlkmsalkdmklasmdlkmaslkdmlksamdk",
    },
  ]; //

  const routeToDetails = (event) => {
    navigation.navigate("Event Details", { event });
  };
  return (
    <>
    {/* <Box safeArea mb="3">
      <HStack mx="3" my="2">
        <DrawerIcon navigation={navigation} iconSize={"lg"} />
      </HStack>
    </Box> */}

    <Box safeArea style={styles.container}>
        <FlatList  
        style={styles.list}
        contentContainerStyle={{flexGrow:1}}
        data={events}
        renderItem={({item})=><EventCard event={item} routeToDetails={routeToDetails}/>}
        keyExtractor={item=>item.id}
        />
        {/* {events.map((event)=><EventCard event={event} routeToDetails={routeToDetails}/>)} */}
      </Box>
    {/* <HomeButton navigation={navigation} /> */}
  </>
  );
}
