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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import axios from "axios";

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
    { label: "Cairo", value: "Cairo" },
    { label: "Giza", value: "Giza" },
    { label: "Alexandria", value: "Alexandria" },
    { label: "Luxor", value: "Luxor" },
    { label: "Aswan", value: "Aswan" },
    { label: "Suez", value: "Suez" },
    { label: "Ismailia", value: "Ismailia" },
    { label: "Port Said", value: "Port Said" },
    { label: "Damietta", value: "Damietta" },
    { label: "Dakahlia", value: "Dakahlia" },
    { label: "Sharqia", value: "Sharqia" },
    { label: "Qalyubia", value: "Qalyubia" },
    { label: "Gharbia", value: "Gharbia" },
    { label: "Kafr El Sheikh", value: "Kafr El Sheikh" },
    { label: "Monufia", value: "Monufia" },
    { label: "Beheira", value: "Beheira" },
    { label: "Minya", value: "Minya" },
    { label: "Beni Suef", value: "Beni Suef" },
    { label: "Faiyum", value: "Faiyum" },
    { label: "New Valley", value: "New Valley" },
    { label: "Asyut", value: "Asyut" },
    { label: "Red Sea", value: "Red Sea" },
    { label: "Sohag", value: "Sohag" },
    { label: "Qena", value: "Qena" },
    { label: "Matruh", value: "Matruh" },
    { label: "North Sinai", value: "North Sinai" },
    { label: "South Sinai", value: "South Sinai" },
    { label: "Helwan", value: "Helwan" },
  ]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [interestsValue, setInterestsValue] = useState(null);
  const [interests, setInterests] = useState([
    { label: "Parkour", value: "parkour" },
    { label: "Skate", value: "skate" },
    { label: "Both", value: "both" },
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
      await axios
        .post("http://192.168.1.8:5000/pom/auth/register", {
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
    <ScrollView w="100%" nestedScrollEnabled>
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
              <FormControl.Label>City</FormControl.Label>
              <View>
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
                />
              </View>

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
