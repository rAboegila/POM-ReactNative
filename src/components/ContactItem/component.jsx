//React + React Native Imports
import React from "react";

//APIs imports
import * as Linking from "expo-linking";
import call from "react-native-phone-call";
import * as MailComposer from "expo-mail-composer";
// UI Library and Elements Imports
import { AntDesign } from "@expo/vector-icons";
import { Icon, HStack, Link, Text, Pressable } from "native-base";

//Import Library Objects

//Components Imports

// External Style Sheet Import
import styles from "./styles";

export default function ContactItem({
  navigation,
  link,
  title,
  IconType,
  IconName,
  IconColor,
  type,
}) {
  let callArgs = null;
  if (type === "MOBILE") {
    callArgs = {
      number: title, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };
  }
  function sendEmail() {
    MailComposer.composeAsync({
      recipients: [title],
      subject: "App User Feedback ",
      body: "",
    });
  }
  /**
   * MailComposer.composeAsync({
      recipients: ["unleaded@reiner.design"],
      subject: "Unleaded Feedback",
      body: feedbackTemplate
    }).catch(() =>
      Alert.alert("Unable To Send Feedback", undefined, [
        {
          text: "Copy feedback email",
          onPress: () => Clipboard.setString("unleaded@reiner.design")
        },
        {
          text: "OK"
        }
      ])
    );
   */
  return (
    <HStack alignItems={"center"}>
      <Icon
        as={IconType}
        name={IconName}
        color={IconColor}
        size={"md"}
        mr={2}
      ></Icon>
      {type === "SOCIAL" ? (
        <Link href={link} isExternal isUnderlined={false}>
          {title}
        </Link>
      ) : type === "MOBILE" ? (
        <Pressable
          onPress={() => {
            call(callArgs).catch(console.error);
          }}
        >
          <Text>{title}</Text>
        </Pressable>
      ) : (
        <Pressable onPress={sendEmail}>
          <Text>{title}</Text>
        </Pressable>
      )}
    </HStack>
  );
}
