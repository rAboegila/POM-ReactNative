//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import {
  Box,
  Text,
  HStack,
  Center,
  View,
  IconButton,
  ScrollView,
  ZStack,
  Image,
  VStack,
} from "native-base";
import { ImageBackground } from "react-native";
//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";
import TicketCard from "../../components/TicketCard/component";
import FilterItem from "../../components/FilterItem/component";

// External Style Sheet Import
import styles from "./styles";
import bgImage from "../../../assets/parkour1.png";

export default function NotFound({ navigation }) {
  return (
    <View bg="rgba(187, 247, 208,0.4)" flex={1}>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>
      <Center justifyContent={"center"} flex={1}>
        <Image
          source={bgImage}
          opacity={0.2}
          style={{ width: 400, height: 400 }}
          alt="parkour-image"
        />
        <Center mb="8">
          <Text fontSize={"4xl"} color={"success.600"} fontWeight={"black"}>
            Coming Soon
          </Text>
          <Text fontSize={"xl"} color={"tertiary.900"} fontWeight={"semibold"}>
            Oooops! We are still working on it!
          </Text>
        </Center>

        {/* <ZStack alignItems="center" justifyContent="center">
          <Image
            source={bgImage}
            opacity={0.1}
            //   style={{ width: 400, height: 400 }}
            alt="parkour-image"
          />

          <Text fontSize={"4xl"} color={"success.700"} fontWeight={"black"}>
            Coming Soon
          </Text>
        </ZStack> */}
      </Center>

      <HomeButton alignSelf={"baseline"} navigation={navigation} />
    </View>
  );
}
