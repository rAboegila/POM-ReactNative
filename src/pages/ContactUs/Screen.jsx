//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import {
  Box,
  Text,
  HStack,
  Center,
  Heading,
  Icon,
  ScrollView,
  VStack,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";
import ContactItem from "../../components/ContactItem/component";
// External Style Sheet Import
import styles from "./styles";

export default function Contact({ navigation }) {
  const socialMediaAccounts = [
    {
      name: "facebook",
      link: "https://www.facebook.com/PowerOfMotion/",
      handler: "PowerOfMotion",
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/powerofmotion.eg/",
      handler: "@powerofmotion.eg",
    },
  ];

  const email = "powerofmotion.eg@gmail.com";
  const phoneNumber = "+201557995400";
  function getIcon(name) {
    switch (name) {
      case "facebook":
        return {
          IconName: "facebook-square",
          IconType: FontAwesome,
          IconColor: "#4267B2",
        };
      case "instagram":
        return {
          IconName: "instagram",
          IconType: FontAwesome,
          IconColor: "#833AB4",
        };
      case "twitter":
        return {
          IconName: "twitter-square",
          IconType: FontAwesome,
          IconColor: "#1DA1F2",
        };
      case "snapchat":
        return {
          IconName: "snapchat-square",
          IconType: FontAwesome5,
          IconColor: "#FFFC00",
        };
      case "tiktok":
        return {
          IconName: "tiktok",
          IconType: FontAwesome5,
          IconColor: "#ff0050",
        };
      case "email":
        return {
          IconName: "mail",
          IconType: Entypo,
          IconColor: "success.600",
        };
      case "mobile":
        return {
          IconName: "phone-square",
          IconType: FontAwesome,
          IconColor: "success.600",
        };
      default:
        return {
          IconName: "comment-dots",
          IconType: FontAwesome5,
          IconColor: "success.600",
        };
    }
  }
  return (
    <>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>
      <Box flex={1} m={3}>
        <Heading color={"success.900"}>How To Contact Us?</Heading>
        <VStack flex={1} m={4} mt={8} space={3}>
          <Box bg={"muted.200"} p={4} borderRadius={30} shadow={2}>
            <Heading size={"md"} color={"success.900"}>
              Follow Us
            </Heading>
            <VStack m={2} mt={4} space={3} justifyContent={"space-around"}>
              {socialMediaAccounts.map((account, index) => {
                const icon = getIcon(account.name);
                return (
                  <ContactItem
                    link={account.link}
                    IconName={icon.IconName}
                    IconType={icon.IconType}
                    IconColor={icon.IconColor}
                    title={account.handler}
                    key={account.name + "_" + index}
                    type={"SOCIAL"}
                  />
                );
              })}
            </VStack>
          </Box>
          <Box bg={"muted.200"} p={4} borderRadius={30} shadow={2}>
            <Heading size={"md"} color={"success.900"}>
              Send An Email
            </Heading>
            <VStack m={2} mt={4} space={3} justifyContent={"space-around"}>
              <ContactItem
                IconName={getIcon("email").IconName}
                IconType={getIcon("email").IconType}
                IconColor={getIcon("email").IconColor}
                title={email}
              />
            </VStack>
          </Box>
          <Box bg={"muted.200"} p={4} borderRadius={30} shadow={2}>
            <Heading size={"md"} color={"success.900"}>
              Call Us
            </Heading>
            <VStack m={2} mt={4} space={3} justifyContent={"space-around"}>
              <ContactItem
                IconName={getIcon("mobile").IconName}
                IconType={getIcon("mobile").IconType}
                IconColor={getIcon("mobile").IconColor}
                title={phoneNumber}
                type={"MOBILE"}
              />
            </VStack>
          </Box>
        </VStack>
      </Box>
      <HomeButton navigation={navigation} />
    </>
  );
}
