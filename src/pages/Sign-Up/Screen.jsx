import React, { useState, useCallback } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Select,
  Text,
  Button,
  Center,
  View,
  CheckIcon,
  ScrollView,
  useToast,
} from "native-base";

//Import Library Objects
import { INTERESTS, GOVERNMENTS } from "../../lib/enums";
import { toSentenceCase } from "../../lib/helpers";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import axios from "axios";
import api from "../../lib/api";

export default SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState(new Date());
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([
    { label: toSentenceCase(GOVERNMENTS.CAIRO), value: GOVERNMENTS.CAIRO },
    { label: toSentenceCase(GOVERNMENTS.GIZA), value: GOVERNMENTS.GIZA },
    {
      label: toSentenceCase(GOVERNMENTS.ALEXANDRIA),
      value: GOVERNMENTS.ALEXANDRIA,
    },
    { label: toSentenceCase(GOVERNMENTS.LUXOR), value: GOVERNMENTS.LUXOR },
    { label: toSentenceCase(GOVERNMENTS.ASWAN), value: GOVERNMENTS.ASWAN },
    { label: toSentenceCase(GOVERNMENTS.SUEZ), value: GOVERNMENTS.SUEZ },
    {
      label: toSentenceCase(GOVERNMENTS.ISMAILIA),
      value: GOVERNMENTS.ISMAILIA,
    },
    {
      label: toSentenceCase(GOVERNMENTS.PORT_SAID),
      value: GOVERNMENTS.PORT_SAID,
    },
    {
      label: toSentenceCase(GOVERNMENTS.DAMIETTA),
      value: GOVERNMENTS.DAMIETTA,
    },
    {
      label: toSentenceCase(GOVERNMENTS.DAKAHLIA),
      value: GOVERNMENTS.DAKAHLIA,
    },
    { label: toSentenceCase(GOVERNMENTS.SHARQIA), value: GOVERNMENTS.SHARQIA },
    {
      label: toSentenceCase(GOVERNMENTS.QALYUBIA),
      value: GOVERNMENTS.QALYUBIA,
    },
    { label: toSentenceCase(GOVERNMENTS.GHARBIA), value: GOVERNMENTS.GHARBIA },
    {
      label: toSentenceCase(GOVERNMENTS.KAFR_ELSHEIKH),
      value: GOVERNMENTS.KAFR_EL_SHEIKH,
    },
    { label: toSentenceCase(GOVERNMENTS.MONUFIA), value: GOVERNMENTS.MONUFIA },
    { label: toSentenceCase(GOVERNMENTS.BEHEIRA), value: GOVERNMENTS.BEHEIRA },
    { label: toSentenceCase(GOVERNMENTS.MINYA), value: GOVERNMENTS.MINYA },
    {
      label: toSentenceCase(GOVERNMENTS.BENI_SUEF),
      value: GOVERNMENTS.BENI_SUEF,
    },
    { label: toSentenceCase(GOVERNMENTS.FAIYUM), value: GOVERNMENTS.FAIYUM },
    {
      label: toSentenceCase(GOVERNMENTS.NEW_VALLEY),
      value: GOVERNMENTS.NEW_VALLEY,
    },
    { label: toSentenceCase(GOVERNMENTS.ASYUT), value: GOVERNMENTS.ASYUT },
    { label: toSentenceCase(GOVERNMENTS.RED_SEA), value: GOVERNMENTS.RED_SEA },
    { label: toSentenceCase(GOVERNMENTS.SOHAG), value: GOVERNMENTS.SOHAG },
    { label: toSentenceCase(GOVERNMENTS.QENA), value: GOVERNMENTS.QENA },
    { label: toSentenceCase(GOVERNMENTS.MATRUH), value: GOVERNMENTS.MATRUH },
    {
      label: toSentenceCase(GOVERNMENTS.NORTH_SINAI),
      value: GOVERNMENTS.NORTH_SINAI,
    },
    {
      label: toSentenceCase(GOVERNMENTS.SOUTH_SINAI),
      value: GOVERNMENTS.SOUTH_SINAI,
    },
    { label: toSentenceCase(GOVERNMENTS.HELWAN), value: GOVERNMENTS.HELWAN },
  ]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [interestsValue, setInterestsValue] = useState(null);
  const [interests, setInterests] = useState([
    { label: toSentenceCase(INTERESTS.PARKOUR), value: INTERESTS.PARKOUR },
    { label: toSentenceCase(INTERESTS.SKATE), value: INTERESTS.SKATE },
    { label: toSentenceCase(INTERESTS.BOTH), value: INTERESTS.BOTH },
  ]);
  const toast = useToast();

  const onInterestsOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setInterestsOpen(false);
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const changeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      toggleDatePicker();
      setDob(currentDate);
      setDate(currentDate.toISOString().slice(0, 10));
    } else {
      toggleDatePicker();
    }
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // First name validation
    if (!firstName) {
      formIsValid = false;
      errors["firstName"] = "First name cannot be empty";
    } else if (firstName.length < 3 || firstName.length > 10) {
      formIsValid = false;
      errors["firstName"] = "First name must be between 3 and 10 characters";
    }

    // Last name validation
    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "Last name cannot be empty";
    } else if (lastName.length < 3 || lastName.length > 10) {
      formIsValid = false;
      errors["lastName"] = "Last name must be between 3 and 10 characters";
    }

    // Username validation
    if (!username) {
      formIsValid = false;
      errors["username"] = "Username cannot be empty";
    } else if (username.length < 3 || username.length > 10) {
      formIsValid = false;
      errors["username"] = "Username must be between 3 and 10 characters";
    }

    // Email validation (optional)
    if (!email) {
      formIsValid = false;
      errors["email"] = "Email is Required";
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formIsValid = false;
      errors["email"] = "Invalid email address";
    }

    // Phone number validation
    if (!phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number is required";
    } else if (
      phoneNumber.length !== 11 &&
      !/^(010|011|015|012)\d{8}$/.test(phoneNumber)
    ) {
      formIsValid = false;
      errors["phoneNumber"] = "Invalid phone number";
    }

    // City validation
    if (!city) {
      formIsValid = false;
      errors["city"] = "City cannot be empty";
    }

    // Password validation
    if (!password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    } else if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Password must be at least 8 characters long";
    } else if (!/^(?=.*[@_#$&])[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(password)) {
      formIsValid = false;
      errors["password"] =
        "Password must contain at least one of the following characters: @, _, #, $, or &";
    }

    // Confirm password validation
    if (!confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Please confirm your password";
    } else if (password !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Passwords do not match";
    }

    //interests Validation
    if (interestsValue === null) {
      formIsValid = false;
      errors["interests"] = "Please select interests";
    }

    if (city === null) {
      formIsValid = false;
      errors["city"] = "Please select city";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (handleValidation()) {
      // const formData = new FormData();
      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);
      // formData.append("email", email);
      // formData.append("password", password);
      // formData.append("phoneNumber", phoneNumber);
      // formData.append("dob",dob.toISOString().slice(0, 10))
      // formData.append("city", city);
      // formData.append("interests", interestsValue);
      await api
        .post("auth/register", {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          dob: dob.toISOString().slice(0, 10),
          interests: interestsValue,
          city,
          password,
        })
        .then(() => {
          toast.show({ title: "Registered Successfully", placement: "top" });
          navigation.navigate("SignIn");
        })
        .catch((error) => console.log(error));
    }
    setLoading(false);
  };
  DropDownPicker.setListMode("SCROLLVIEW");
  return (
    <ScrollView w="100%">
      <Center>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Register
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
              />
              {errors.firstName ? (
                <Text style={{ color: "red" }}>{errors.firstName}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                value={lastName}
                onChangeText={(value) => setLastName(value)}
              />
              {errors.lastName ? (
                <Text style={{ color: "red" }}>{errors.lastName}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>User Name</FormControl.Label>
              <Input onChangeText={(value) => setUsername(value)} />
              {errors.username ? (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={(value) => setEmail(value)} />
              {errors.email ? (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setPassword(value)}
              />
              {errors.password ? (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setConfirmPassword(value)}
              />
              {errors.confirmPassword ? (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
              />
              {errors.phoneNumber ? (
                <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Interests</FormControl.Label>
              <View>
                <DropDownPicker
                  style={styles.dropdown}
                  open={interestsOpen}
                  value={interestsValue}
                  items={interests}
                  setOpen={setInterestsOpen}
                  setValue={setInterestsValue}
                  setItems={setInterests}
                  onOpen={onInterestsOpen}
                  placeholder="Select Interests"
                  placeholderStyle={styles.placeholderStyles}
                  dropDownDirection="TOP"
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </View>
              {errors.interests ? (
                <Text style={{ color: "red" }}>{errors.interests}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Government</FormControl.Label>
              <DropDownPicker
                style={styles.dropdown}
                open={cityOpen}
                value={city}
                items={cities}
                setOpen={setCityOpen}
                setValue={setCity}
                setItems={setCities}
                onOpen={onCityOpen}
                placeholder="Select Government"
                placeholderStyle={styles.placeholderStyles}
                dropDownDirection="TOP"
                zIndex={1000}
                zIndexInverse={3000}
                searchable={true}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
              />

              {errors.city ? (
                <Text style={{ color: "red" }}>{errors.city}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Date Of Birth</FormControl.Label>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={dob}
                  onChange={changeDate}
                />
              )}
              <View>
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    value={date}
                    style={styles.input}
                    placeholderTextColor="black"
                    editable={false}
                  />
                </Pressable>
              </View>
            </FormControl>

            <Button mt="2" style={styles.button} onPress={handleSubmit}>
              {loading ? (
                <Feather name="loader" color="black" size={24} />
              ) : (
                <Text>Sign Up</Text>
              )}
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
