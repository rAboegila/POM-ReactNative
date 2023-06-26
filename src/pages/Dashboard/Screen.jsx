//React + React Native Imports
import React from "react";

// UI Library and Elements Imports
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Center,
  VStack,
  ZStack,
  Circle,
  Image,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import DashboardItem from "../../components/DashboardItem/component";
import logo from "../../../assets/POM_Logo.jpg";

// External Style Sheet Import
import styles from "./styles";

export default function Dashboard({ navigation }) {
  return (
    <Box safeArea bg="light.100">
      <HStack mx="3" my="2">
        <DrawerIcon navigation={navigation} iconSize={"lg"} />
      </HStack>
      <Center mt="2" h="90%">
        <ZStack alignItems="center" justifyContent="center">
          <VStack space={5}>
            <HStack space={3}>
              <DashboardItem
                navigation={navigation}
                title="Events"
                IconType={Entypo}
                IconName="sports-club"
                Screen={"Events"}
              />
              <DashboardItem
                navigation={navigation}
                title="News"
                IconType={FontAwesome5}
                IconName="newspaper"
                Screen={"News"}
              />
            </HStack>
            <HStack space={3} justifyContent="center">
              <DashboardItem
                navigation={navigation}
                title="Locations"
                IconType={Entypo}
                IconName="location"
                Screen={"Locations"}
              />
              <DashboardItem
                navigation={navigation}
                title="My Tickets"
                IconType={FontAwesome5}
                IconName="ticket-alt"
                Screen={"My Tickets"}
              />
            </HStack>
          </VStack>
          <Circle size="160px" bg="light.100">
            <Image
              size={"150px"}
              borderRadius={100}
              source={logo}
              alt="Alternate Text"
            />
          </Circle>
        </ZStack>
      </Center>
    </Box>
  );
}

{
  /* <Pressable onPress={() => navigation.navigate("Events")}>
                  <VStack alignItems="center" space={3}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} color="white">
                      Events
                    </Text>
                    <Icon
                      as={Entypo}
                      name="sports-club"
                      size="40px"
                      color="white"
                    />
                  </VStack>
                </Pressable> */
}
