//React + React Native Imports
import React, { useEffect, useState } from "react";

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
  Spinner,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import HomeButton from "../../components/HomeButton/component";
import FilterItem from "../../components/FilterItem/component";

// External Style Sheet Import
import styles from "./styles";
import NewsCard from "../../components/NewsCard/component";
import NewsModal from "../../components/NewsModal/component";
import api from "../../lib/api";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/features/auth/authSlice";
import { getAnnouncements } from "../../redux/features/profile/profileSlice";
export default function News({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const Filters = ["All", "Public", "Mine"];
  const [announcements, setAnnouncements] = useState([]);
  const userAnnouncements= useSelector(getAnnouncements)
  const [generalAnnouncements, setGeneralAnnouncements] = useState([]);

  const token = useSelector(getToken);
  async function getGeneralAnnouncements() {
    await api
      .get("/administration/announcements/general", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setGeneralAnnouncements(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.error);
      });
  }

  const [modalAnnouncement, setModalAnnouncement] = useState({
    title: "",
    body: "",
    image: "",
  });

  function viewMore(announcement) {
    setModalAnnouncement(announcement);
    setShowModal(true);
  }

  function renderAnnouncements(filter) {
    switch (filter) {
      case "Public":
        setAnnouncements(generalAnnouncements);
        break;
      case "Mine":
        setAnnouncements(userAnnouncements);
        break;
      default:
        setAnnouncements([...generalAnnouncements, ...userAnnouncements]);
        break;
    }
  }
  useEffect(() => {
    getGeneralAnnouncements();
    renderAnnouncements("All");
  }, []);
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
              onPress={() => renderAnnouncements(label)}
              disabled={false}
              key={label + "_" + index}
            ></FilterItem>
          ))}
        </Box>
      </Center>
      {!announcements ? (
        <Spinner size={"lg"} color={"emerald.500"} />
      ) : (
        <ScrollView mt="3">
          <Center>
            {announcements.map((announcement, index) => (
              <NewsCard
                style={styles.eventCard}
                title={announcement.title}
                body={announcement.body}
                image={announcement.image}
                navigation={navigation}
                viewMore={() => viewMore(announcement)}
                key={announcement.title + "-ticket_" + index}
              ></NewsCard>
            ))}
          </Center>
        </ScrollView>
      )}

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
          <Modal.Content width={"90%"}>
            <Modal.CloseButton />
            <Modal.Header>{modalAnnouncement.title}</Modal.Header>
            <Modal.Body size={"lg"} overflow="scroll">
              <Text style={styles.body}>{modalAnnouncement.body}</Text>
              {modalAnnouncement.image ? (
                <Image
                  width={"60%"}
                  height={"80%"}
                  resizeMode="contain"
                  source={{
                    uri:
                      "http://192.168.1.8:5000/uploads/announcements/images/" +
                      modalAnnouncement.image,
                  }}
                  alt={modalAnnouncement.title + " Image"}
                  _alt={{
                    color: "grey",
                  }}
                />
              ) : null}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
}
