import React from "react";
import {
  VStack,
  Box,
  Divider,
  Heading,
  HStack,
  View,
  Text,
  Button,
  Icon,
} from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { styles } from "./styles";

export default function EventCard({ event, routeToDetails }) {
  const eventName = event.name || "Event";
  const eventDate = event.duration.startDate.slice(0, 10) || "TBD";
  const eventPrice = event.price || getPrice();
  const eventType = event.competition?.name || "Undetermined";

  function getPrice() {
    const prices = [250, 150, 300, 100, 200, 400];
    const randomIndex = Math.floor(Math.random() * prices.length);

    return prices[randomIndex];
  }
  return (
    <Box style={styles.card} shadow={2}>
      <VStack space="4">
        <Heading px="4" pt="4" style={styles.text} size={"md"}>
          {eventName}
        </Heading>
        <HStack space="3" justifyContent="space-between" padding="3">
          <VStack space="2">
            <HStack space="1">
              <MaterialIcons name="date-range" size={24} color="white" />
              <Text style={styles.text}>{eventDate}</Text>
            </HStack>
            <HStack space="1">
              <MaterialCommunityIcons name="ticket" size={24} color="white" />
              <Text style={styles.text}>{eventPrice}</Text>
            </HStack>
            <HStack space="1">
              <FontAwesome5 name="running" size={24} color="white" />
              <Text style={styles.text}>{eventType}</Text>
            </HStack>
          </VStack>
          <VStack space="3">
            <Button
              rightIcon={
                <Icon
                  as={
                    <Feather
                      name="arrow-right-circle"
                      size={24}
                      color="black"
                    />
                  }
                />
              }
              style={styles.viewMore}
              onPress={() => routeToDetails(event)}
            >
              ViewMore
            </Button>
            <Button
              rightIcon={
                <Icon
                  as={
                    <FontAwesome5
                      name="shopping-basket"
                      size={24}
                      color="black"
                    />
                  }
                />
              }
              style={styles.buyTicket}
            >
              Buy Ticket
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
