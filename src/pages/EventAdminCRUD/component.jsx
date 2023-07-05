import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Icon,
  HStack,
  Center,
  FlatList,
  FormControl,
  VStack,
  Button,
  Select,
  Heading,
  Modal,
  ScrollView,
  TextArea,
  Pressable,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import EventCrudCard from "../../components/EventCrudCard/component";
import { apiToken } from "../../lib/api";
import styles from "./styles";
import { governments } from "../../lib/dropDownValues";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EventAdminCRUD() {
  const [events, setEvents] = useState([]);
  const [renderedEvents, setRenderedEvents] = useState(events);
  const [modalItem, setModalItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState("Add");
  const [dateSelected, setDateSelected] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  //   const [dob, setDob] = useState(new Date());
  const dob = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const changeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      toggleDatePicker();
      //   setDob(currentDate);
      console.log(currentDate);
      switch (dateSelected) {
        case "startDate":
          setModalItem((prevState) => {
            return {
              ...prevState,
              duration: {
                ...prevState.duration,
                startDate: currentDate.toISOString().slice(0, 10),
                startTime: {
                  time: currentDate.toISOString(),
                  amOrPm: "am",
                },
              },
            };
          });
          break;
        case "endDate":
          setModalItem((prevState) => {
            return {
              ...prevState,
              duration: {
                ...prevState.duration,
                endDate: currentDate.toISOString().slice(0, 10),
                endTime: {
                  time: currentDate.toISOString(),
                  amOrPm: "pm",
                },
              },
            };
          });
          break;
        default:
          break;
      }
      setDateSelected("");
    } else {
      toggleDatePicker();
    }
  };
  const getEvents = async () => {
    const tokenInstance = await apiToken();
    await tokenInstance
      .get("Event/events")
      .then((res) => {
        setRenderedEvents(res.data.data);
        setEvents(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getEvents();
  }, []);

  function closeModal() {
    setModalItem({});
    setErrors({});
    setShowModal(false);
  }
  async function addEvent() {
    setFormLoading(true);
    if (!handleValidation()) {
      setFormLoading(false);
      return;
    }
    const tokenInstance = await apiToken();
    await tokenInstance
      .post(`/Event/event/${id}`, modalItem)
      .then((res) => {
        setRenderedEvents(res.data.data);
        setEvents(res.data.data);
      })
      .then(() => getEvents())
      .catch((err) => console.log(err.response.data))
      .finally(() => setFormLoading(false));
    setFormLoading(false);
  }
  async function updateItem() {
    setFormLoading(true);
    if (!handleValidation()) {
      setFormLoading(false);
      return;
    }
    const tokenInstance = await apiToken();
    await tokenInstance
      .put(`/Event/event/${modalItem.id}`, modalItem)
      .then((res) => {
        console.log(res.data);
        // setRenderedEvents(res.data.data);
        // setEvents(res.data.data);
      })
      .then(() => getEvents())
      .catch((err) => console.log(err.response.data))
      .finally(() => setFormLoading(false));
    setFormLoading(false);
  }

  async function deleteItem(id) {
    const tokenInstance = await apiToken();
    await tokenInstance
      .delete(`/Event/event/${id}`)
      .then((res) => {
        setRenderedEvents(res.data.data);
        setEvents(res.data.data);
      })
      .then(() => getEvents())
      .catch((err) => console.log(err.response.data));
  }

  function search(string) {
    if (!string) {
      setRenderedEvents(events);
      return;
    }
    const items = events.filter((event) => event.name.includes(`${string}`));
    setRenderedEvents(items);
  }

  function handleValidation() {
    let formIsValid = true;
    let errors = {};

    console.log(modalItem);
    if (!modalItem.name) {
      formIsValid = false;
      errors["name"] = "Name is required";
    } else if (modalItem.name?.length < 5) {
      formIsValid = false;
      errors["name"] = "Name Must Be at least 5 characters";
    } else if (!/^[^\s@?$;%^*()+=\[\]{}|\\\/]+$/.test(modalItem.name)) {
      formIsValid = false;
      errors["name"] =
        "Name must not contain symbols such as @, ?, $, ;, %, ^, or spaces.";
    }

    if (!modalItem.competition?.name) {
      formIsValid = false;
      errors["competition"] = "Competition Type is Required ";
    }

    if (!modalItem.fault) {
      formIsValid = false;
      errors["faults"] = "Faults Score is Required ";
    } else if (modalItem.fault > 7 || modalItem.fault < 1) {
      formIsValid = false;
      errors["faults"] = "Faults Score Must be between 1 and 7";
    }

    if (!modalItem.location?.link) {
      formIsValid = false;
      errors["locationLink"] = "Link is Required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(modalItem.location.link)) {
      formIsValid = false;
      errors["locationLink"] = "Invalid Link";
    }

    if (!modalItem.location?.streetName) {
      formIsValid = false;
      errors["locationStreet"] = "Street is Required";
    } else if (modalItem.location?.streetName > 30) {
      formIsValid = false;
      errors["locationStreet"] = "Street Name Must be at Most 30 characters";
    }

    if (!modalItem.location?.city) {
      formIsValid = false;
      errors["locationCity"] = "Government is Required";
    }

    if (!modalItem.location?.area) {
      formIsValid = false;
      errors["locationArea"] = "Area is Required";
    }

    if (!modalItem.location?.building) {
      formIsValid = false;
      errors["locationBuilding"] = "Building is Required";
    }

    if (modalItem.location?.additionalInformation) {
      if (modalItem.location?.additionalInformation > 50) {
        formIsValid = false;
        errors["locationAdditional"] = "Max of 50 Characters";
      }
    }

    if (modalItem.duration?.endDate) {
      if (daysFromNow(modalItem.duration?.endDate) < 2) {
        formIsValid = false;
        errors.endDate = "End Date must be at least 2 days from now";
      }
    } else {
      formIsValid = false;
      errors.endDate = "End Date is Required";
    }

    if (modalItem.duration?.startDate) {
      if (daysFromNow(modalItem.duration?.startDate) < 1) {
        formIsValid = false;
        errors.startDate = "Start Date must be at least a day from now";
      }
    } else {
      formIsValid = false;
      errors.startDate = "Start Date is Required";
    }

    if (!modalItem.price) {
      formIsValid = false;
      errors["price"] = "price Score is Required ";
    } else if (modalItem.price > 10000 || modalItem.price < 0) {
      formIsValid = false;
      errors["price"] = "price Score Must be at least 1";
    }

    if (!modalItem.description) {
      formIsValid = false;
      errors["description"] = "Description is Required";
    }
    setErrors(errors);
    console.log(errors);
    return formIsValid;
  }

  const daysFromNow = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <>
      <Box safeArea>
        <Center>
          <HStack mt={"5"} space={3} alignItems={"baseline"}>
            <Input
              placeholder="Search By Name"
              width="80%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              }
              onChangeText={(value) => search(value?.toLowerCase())}
            />
            <Ionicons
              onPress={() => {
                setModalItem({});
                setShowModal(true);
              }}
              name="add-circle"
              size={36}
              color="black"
            />
          </HStack>
          <FlatList
            data={renderedEvents}
            renderItem={({ item }) => (
              <Center>
                <EventCrudCard
                  event={item}
                  updateItem={(event) => {
                    setModalState("Update");
                    setModalItem(event);
                    setShowModal(true);
                  }}
                  deleteItem={(event) => {
                    setModalItem(event);
                    setDeleteModal(true);
                  }}
                />
              </Center>
            )}
            keyExtractor={(item) => item._id}
          />
        </Center>
      </Box>

      {/* update and add modal */}
      <Center>
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content width={"100%"}>
            <Modal.CloseButton />
            <Modal.Header>{`${modalState} Event`} </Modal.Header>
            <Modal.Body height={"100%"} width={"90%"}>
              <ScrollView>
                <VStack space={3} mt="5">
                  {errors.request ? (
                    <Text style={styles.requestErorr}>{errors.request}</Text>
                  ) : null}
                  <FormControl isInvalid={"name" in errors}>
                    <FormControl.Label>Event Name</FormControl.Label>
                    <Input
                      value={modalItem.name}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          console.log(prevState);

                          return {
                            ...prevState,
                            name: itemValue,
                          };
                        })
                      }
                    />
                    {errors.name ? (
                      <FormControl.ErrorMessage>
                        {errors.name}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={"competition" in errors}>
                    <FormControl.Label>Competition Type</FormControl.Label>
                    <Select
                      placeholder="Competition Type"
                      selectedValue={modalItem.competition?.name}
                      onValueChange={(itemValue) =>
                        setModalItem((prevState) => {
                          console.log(prevState);
                          return {
                            ...prevState,
                            competition: { name: itemValue },
                          };
                        })
                      }
                    >
                      <Select.Item
                        label={"Free Style"}
                        value={"freestyle"}
                        key={"freestyle"}
                      />
                      <Select.Item
                        label={"Speed Run"}
                        value={"speedrun"}
                        key={"speedrun"}
                      />
                    </Select>
                    {errors.competition ? (
                      <FormControl.ErrorMessage>
                        {errors.competition}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={"faults" in errors}>
                    <FormControl.Label>Faults</FormControl.Label>
                    <Input
                      value={modalItem.fault}
                      keyboardType="numeric"
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            fault: itemValue,
                          };
                        })
                      }
                    />
                    {errors.faults ? (
                      <FormControl.ErrorMessage>
                        {errors.faults}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <Heading>Location</Heading>
                  <FormControl isInvalid={"locationLink" in errors}>
                    <FormControl.Label>Link</FormControl.Label>
                    <Input
                      value={modalItem.location?.link}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          console.log(prevState);

                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              link: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.locationLink ? (
                      <FormControl.ErrorMessage>
                        {errors.locationLink}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl isInvalid={"locationStreet" in errors}>
                    <FormControl.Label>Street Name</FormControl.Label>
                    <Input
                      value={modalItem.location?.streetName}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              streetName: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.locationStreet ? (
                      <FormControl.ErrorMessage>
                        {errors.locationStreet}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl
                    isReadOnly
                    isRequired
                    isInvalid={errors.locationCity}
                  >
                    <FormControl.Label
                      _text={{
                        bold: true,
                        color: "success.800",
                      }}
                    >
                      Government
                    </FormControl.Label>
                    <Select
                      placeholder="Government"
                      selectedValue={modalItem.location?.city}
                      onValueChange={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              city: itemValue,
                            },
                          };
                        })
                      }
                    >
                      {governments.map((gov, index) => (
                        <Select.Item
                          label={gov.label}
                          value={gov.value}
                          key={index}
                        />
                      ))}
                    </Select>
                    {errors.government ? (
                      <FormControl.ErrorMessage>
                        {errors.government}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl isInvalid={"locationArea" in errors}>
                    <FormControl.Label>Area</FormControl.Label>
                    <Input
                      value={modalItem.location?.area}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              area: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.locationArea ? (
                      <FormControl.ErrorMessage>
                        {errors.locationArea}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl isInvalid={"locationBuilding" in errors}>
                    <FormControl.Label>Building</FormControl.Label>
                    <Input
                      value={modalItem.location?.building}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              building: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.locationBuilding ? (
                      <FormControl.ErrorMessage>
                        {errors.locationBuilding}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl isInvalid={"locationAdditional" in errors}>
                    <FormControl.Label>Additional Info</FormControl.Label>
                    <TextArea
                      value={modalItem.location?.additionalInformation}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              additionalInformation: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.locationAdditional ? (
                      <FormControl.ErrorMessage>
                        {errors.locationAdditional}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <Heading>Date</Heading>

                  <FormControl isRequired isInvalid={"startDate" in errors}>
                    <FormControl.Label
                      _text={{
                        bold: true,
                        color: "success.800",
                      }}
                    >
                      Start Date
                    </FormControl.Label>
                    <View>
                      <Pressable
                        onPress={() => {
                          setDateSelected("startDate");
                          toggleDatePicker();
                        }}
                      >
                        <TextInput
                          value={modalItem.duration?.startDate}
                          style={styles.input}
                          placeholderTextColor="black"
                          editable={false}
                        />
                      </Pressable>
                    </View>
                    {errors.startDate ? (
                      <FormControl.ErrorMessage>
                        {errors.startDate}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isRequired isInvalid={"endDate" in errors}>
                    <FormControl.Label
                      _text={{
                        bold: true,
                        color: "success.800",
                      }}
                    >
                      End Date
                    </FormControl.Label>
                    <View>
                      <Pressable
                        onPress={() => {
                          setDateSelected("endDate");
                          toggleDatePicker();
                        }}
                      >
                        <TextInput
                          value={modalItem.duration?.endDate}
                          style={styles.input}
                          placeholderTextColor="black"
                          editable={false}
                        />
                      </Pressable>
                    </View>
                    {errors.endDate ? (
                      <FormControl.ErrorMessage>
                        {errors.endDate}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  {showDatePicker && (
                    <DateTimePicker
                      minimumDate={new Date()}
                      mode="datetime"
                      display="spinner"
                      value={dob}
                      onChange={changeDate}
                    />
                  )}

                  <FormControl isInvalid={"price" in errors}>
                    <FormControl.Label>Ticket Price</FormControl.Label>
                    <Input
                      value={modalItem.price}
                      keyboardType="numeric"
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            price: itemValue,
                          };
                        })
                      }
                    />
                    {errors.price ? (
                      <FormControl.ErrorMessage>
                        {errors.price}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl isInvalid={"description" in errors}>
                    <FormControl.Label>Additional Info</FormControl.Label>
                    <TextArea
                      value={modalItem.location?.additionalInformation}
                      onChangeText={(itemValue) =>
                        setModalItem((prevState) => {
                          return {
                            ...prevState,
                            location: {
                              ...prevState.location,
                              description: itemValue,
                            },
                          };
                        })
                      }
                    />
                    {errors.description ? (
                      <FormControl.ErrorMessage>
                        {errors.description}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <Button
                    mt="3"
                    colorScheme="#14ae5c"
                    style={styles.button}
                    onPress={() =>
                      modalState === "Add" ? addEvent() : updateItem()
                    }
                    // onPress={handleValidation}
                    isLoading={formLoading}
                  >
                    {modalState}
                  </Button>
                </VStack>
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>

      {/* delete modal */}
      <Center>
        <Modal
          isOpen={false}
          onClose={closeModal}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content width={"90%"}>
            <Modal.CloseButton />
            <Modal.Header>{modalState} Event</Modal.Header>
            <Modal.Body size={"lg"} overflow="scroll"></Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
}
