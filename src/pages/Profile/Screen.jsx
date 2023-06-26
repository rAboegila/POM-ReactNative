//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import { AntDesign, WarningOutlineIcon } from "@expo/vector-icons";
import {
  Box,
  Text,
  Icon,
  HStack,
  Center,
  VStack,
  Avatar,
  FormControl,
  Stack,
  Input,
  Button,
  Circle,
  Image,
  ScrollView,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import ProfileInformationForm from "../../components/ProfileInformationForm/component";

// External Style Sheet Import
import styles from "./styles";

export default function Profile({ navigation }) {
  return (
    <Box safeArea>
      <VStack>
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
        <VStack>
          <Center>
            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
              size={"lg"}
            ></Avatar>
            <HStack>
              <Text>John Doe</Text>
              <Icon as={AntDesign} name={"edit"} size="sm" color="black" />
            </HStack>
          </Center>
          <Box alignItems="center">
            <Box w="100%" maxWidth="300px"></Box>
          </Box>
        </VStack>
        <ProfileInformationForm />
      </VStack>
    </Box>
  );
}
