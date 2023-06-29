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
  IconButton,
  ScrollView,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import ProfileInformationForm from "../../components/ProfileInformationForm/component";

// External Style Sheet Import
import styles from "./styles";

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  function toggleEditMode() {
    console.log("before", isEditing);
    setIsEditing((prevState) => !prevState);
    console.log("after", isEditing);
  }
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>

      <Center>
        <Avatar
          bg="green.500"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          size={"xl"}
          mb="4"
        ></Avatar>
        <Center flexDirection="row">
          <Text fontSize={"md"} mx="4">
            John Doe
          </Text>
          <IconButton
            onPress={toggleEditMode}
            isDisabled={isEditing}
            variant="solid"
            colorScheme="success"
            _icon={{
              as: AntDesign,
              name: "edit",
              size: "xs",
              color: "white",
            }}
          />
        </Center>
      </Center>
      <ProfileInformationForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        my="3"
      />
    </ScrollView>
  );
}
