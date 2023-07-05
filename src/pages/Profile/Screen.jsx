//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Text,
  HStack,
  Center,
  Avatar,
  IconButton,
  ScrollView,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import ProfileInformationForm from "../../components/ProfileInformationForm/component";
import HomeButton from "../../components/HomeButton/component";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getMemoizedProfile } from "../../redux/features/profile/profileSlice";

//Helper Functions
import { getProfileImageUrl, toSentenceCase } from "../../lib/helpers";

// External Style Sheet Import
import styles from "./styles";
//"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const userProfile = useSelector(getMemoizedProfile);
  function toggleEditMode() {
    setIsEditing((prevState) => !prevState);
  }
  return (
    <>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>

      <ScrollView mb="3">
        <Center>
          <Avatar
            bg="green.500"
            source={{
              uri: getProfileImageUrl(userProfile.profilePic),
            }}
            size={"xl"}
            mb="4"
          ></Avatar>
          <Center flexDirection="row">
            <Text fontSize={"md"} mx="4">
            {toSentenceCase(userProfile.firstName)} {toSentenceCase(userProfile.lastName)}
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
          profile={userProfile}
          my="3"
        />
      </ScrollView>
      <HomeButton navigation={navigation} />
    </>
  );
}
