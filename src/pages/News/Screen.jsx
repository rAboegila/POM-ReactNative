//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import {
  Box,
  Text,
  HStack,
  Center,
  Avatar,
  IconButton,
  ScrollView,
  Modal,
  Image,
  ZStack,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";
import FilterItem from "../../components/FilterItem/component";

// External Style Sheet Import
import styles from "./styles";
import NewsCard from "../../components/NewsCard/component";
import NewsModal from "../../components/NewsModal/component";
export default function News({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const Filters = ["All", "Public", "Mine"];
  const announcements = [
    {
      title: "Speed Run",
      body: "Pending",
      image:
        "https://docs.expo.dev/static/images/react-native-community-cli-debugger-ui.png",
    },
    {
      title: "Speed Run2",
      body: "Pending",
      image:
        "https://docs.expo.dev/static/images/react-native-community-cli-debugger-ui.png",
    },
    {
      title: "Speed Run3",
      body: "Pending",
      image:
        "https://docs.expo.dev/static/images/react-native-community-cli-debugger-ui.png",
    },
    {
      title: "Speed Run",
      body: "Pending",
      image:
        "https://docs.expo.dev/static/images/react-native-community-cli-debugger-ui.png",
    },
  ];

  const [modalAnnouncement, setModalAnnouncement] = useState({
    title: "",
    body: "",
    image: "",
  });


  function viewMore(announcement){
    setModalAnnouncement(announcement);
    setShowModal(true)
  }
  return (
    <>
      <Box safeArea mb="3">
        <HStack mx="3" my="2">
          <DrawerIcon navigation={navigation} iconSize={"lg"} />
        </HStack>
      </Box>
      <Center>
        <Box style={styles.group}>
          {Filters.map((label, index) => (
            <FilterItem
              style={styles.filterItem}
              label={label}
              onPress={() => console.log(label, "Button")}
              disabled={false}
              key={label + "_" + index}
            ></FilterItem>
          ))}
        </Box>
      </Center>
      <ScrollView mt="3">
        <Center>
          {announcements.map((announcement, index) => (
            <NewsCard
              style={styles.eventCard}
              title={announcement.title}
              body={announcement.body}
              image={announcement.image}
              navigation={navigation}
              viewMore={()=>viewMore(announcement)}
              key={announcement.title + "-ticket_" + index}
            ></NewsCard>
          ))}
        </Center>
      </ScrollView>
      <HomeButton navigation={navigation} />
      <Center>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>{modalAnnouncement.title}</Modal.Header>
            <Modal.Body>
              <Text style={styles.body}>{modalAnnouncement.body}</Text>
              <Image src={modalAnnouncement.image} alt="image alt" />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
}
