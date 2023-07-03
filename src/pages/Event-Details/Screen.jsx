import { View, Text } from "react-native";
import React from "react";
import MapView, { LatLng } from "react-native-maps";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

import { styles } from "./styles";
import { HStack, VStack, Button, Icon, Box, Heading } from "native-base";

export default function EventDetails({ navigation, route }) {
  const event = route.params.event;
  console.log(event);
  const eventName = event.name || "Event";
  const eventDate = event.duration.startDate.slice(0, 10) || "TBD";
  const eventPrice = event.price || "Undetermined";
  const eventType = event.competition?.name || "Undetermined";
  const eventDescription = event.description || "To Be Added";

  //   // Define the corners of the bounds as LatLng objects
  // const northeast = { latitude: 37.78825, longitude: -122.4324 };
  // const southwest = { latitude: 37.7749, longitude: -122.4194 };

  // // Create the LatLngBoundsLiteral object
  // const latLngBoundsLiteral = { northeast, southwest };

  // // Create the LatLngBounds object
  // const latLngBounds = new LatLng(latLngBoundsLiteral);
  return (
    <>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />  */}
    <Box safeArea style={styles.container}>
      <Heading
        size="2xl"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        {eventName}
      </Heading>

      {/* <MapView.MapMarker
        coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
        title="San Francisco"
        description="A beautiful city"
      /> */}
      {/* </MapView> */}
      {/* <MapView style={styles.map}
          initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 37.78825,
            longitude: -122.4324}}
            title={"title"}
            description={"description"}
         />
      </MapView> */}

      <Text style={styles.description}>{eventDescription}</Text>
      <HStack space="3" justifyContent="space-between" width="90%" padding="3">
        <VStack space="2">
          <HStack space="1">
            <MaterialIcons name="date-range" size={24} color="#14ae5c" />
            <Text style={styles.text}>{eventDate}</Text>
          </HStack>
          <HStack space="1">
            <MaterialCommunityIcons name="ticket" size={24} color="#14ae5c" />
            <Text style={styles.text}>{eventPrice}</Text>
          </HStack>
          <HStack space="1">
            <FontAwesome5 name="running" size={24} color="#14ae5c" />
            <Text style={styles.text}>{eventType}</Text>
          </HStack>
        </VStack>
        <Button
          rightIcon={
            <Icon
              as={
                <FontAwesome5 name="shopping-basket" size={24} color="black" />
              }
            />
          }
          style={styles.buyTicket}
        >
          Buy Ticket
        </Button>
      </HStack>
    </Box>
    </>

  );
}
