import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Select,
  Text,
  Button,
  Center,
  View,
  ScrollView,
  useToast,
  Image,
} from "native-base";

//Import Library Objects
import api from "../../lib/api";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FormInput from "../FormInput/component";
import styles from "./styles";
import { governments, interests } from "../../lib/dropDownValues";

export default function RegisterForm({ navigation }) {
  // for user feedback
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //   form data states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [government, setGovernment] = useState(null);
  const [interestsValue, setInterestsValue] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // errors for form validation
  const [errors, setErrors] = useState({});

  //   for temp data
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(async () => {
//     if (hasGalleryPermission.granted) {
//       const result = await requestGalleryPermission;
//       console.log(result);
//     }
//   }, []);

// const [hasGalleryPermission, requestGalleryPermission] =
  //   ImagePicker.useMediaLibraryPermissions();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: false,
    });

    if (!result.canceled) {
      const fileType = result.assets[0].uri.split(".").pop();
      setProfilePicture({
        uri: result.assets[0].uri,
        type: `${result.assets[0].type}/${fileType}`,
        name: result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf("/") + 1
        ),
      });
    }
  };

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
    }else if(" " in firstName){
      formIsValid = false;
      errors["firstName"] = "No Empty Spaces Allowed"
    }

    // Last name validation
    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "Last name cannot be empty";
    } else if (lastName.length < 3 || lastName.length > 10) {
      formIsValid = false;
      errors["lastName"] = "Last name must be between 3 and 10 characters";
    }else if(" " in lastName){
      formIsValid = false;
      errors["lastName"] = "No Empty Spaces Allowed"
    }

    // Username validation
    if (!username) {
      formIsValid = false;
      errors["username"] = "Username cannot be empty";
    } else if (username.length < 3 || username.length > 10) {
      formIsValid = false;
      errors["username"] = "Username must be between 3 and 10 characters";
    }else if(" " in username){
      formIsValid = false;
      errors["username"] = "No Empty Spaces Allowed"
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

    if (government === null) {
      formIsValid = false;
      errors["government"] = "Please select government";
    }

    setErrors(errors);
    console.log(formIsValid);
    console.log(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    // console.log({
    //     firstName,lastName,phoneNumber,email,password,confirmPassword,interestsValue,government,dob
    // });
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("dob", dob.toISOString().slice(0, 10));
      formData.append("city", government);
      formData.append("interests", interestsValue);
      formData.append("profilePic", profilePicture);
      await api
        .post("auth/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.show({ title: "Registered Successfully", placement: "top" });
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          console.log(error);
          setErrors({
            request: error.response?.data?.error || "Invalid Register",
          });
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  };

  return (
    <ScrollView w="100%">
      <Center>
        <Box safeArea p="2" w="80%"  py="8">
          {errors.request ? (
            <Text style={styles.requestErorr}>{errors.request}</Text>
          ) : null}
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
            <FormInput
              defaultValue=""
              placeholder="First Name"
              changeHandler={setFirstName}
              label="First Name"
              isValid={"firstName" in errors}
              errorMessage={errors.firstName}
              defaultMessage=""
              inputConfig={{
                isRequired: true,
                isInvalid: "firstName" in errors,
                isDisabled: loading,
              }}
            />

            <FormInput
              defaultValue=""
              placeholder="Last Name"
              changeHandler={setLastName}
              label="Last Name"
              isValid={"lastName" in errors}
              errorMessage={errors.lastName}
              defaultMessage=""
              inputConfig={{
                isRequired: true,
                isInvalid: "lastName" in errors,
                isDisabled: loading,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="Username"
              changeHandler={setUsername}
              label="Username"
              isValid={"username" in errors}
              errorMessage={errors.userName}
              defaultMessage=""
              inputConfig={{
                isRequired: true,
                isInvalid: "username" in errors,
                isDisabled: loading,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="Email"
              changeHandler={setEmail}
              label="Email"
              isValid={"email" in errors}
              errorMessage={errors.email}
              defaultMessage=""
              inputConfig={{
                isRequired: true,
                isInvalid: "email" in errors,
                isDisabled: loading,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="Password"
              changeHandler={setPassword}
              label="Password"
              isValid={"password" in errors}
              errorMessage={errors.password}
              defaultMessage=""
              inputConfig={{
                type: "password",
                isRequired: true,
                isInvalid: "password" in errors,
                isDisabled: loading,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="Confirm Password"
              changeHandler={setConfirmPassword}
              label="Confirm Password"
              isValid={"confirmPassword" in errors}
              errorMessage={errors.confirmPassword}
              defaultMessage=""
              inputConfig={{
                type: "password",
                isRequired: true,
                isInvalid: "confirmPassword" in errors,
                isDisabled: loading,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="Phone Number"
              changeHandler={setPhoneNumber}
              label="Phone Number"
              isValid={"phoneNumber" in errors}
              errorMessage={errors.phoneNumber}
              defaultMessage=""
              inputConfig={{
                keyboardType: "numeric",
                isRequired: true,
                isInvalid: "phoneNumber" in errors,
                isDisabled: loading,
              }}
            />

            <FormControl isReadOnly isRequired isInvalid={errors.government}>
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
                selectedValue={government}
                onValueChange={(itemValue) => setGovernment(itemValue)}
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

            <FormControl isReadOnly isRequired isInvalid={errors.interests}>
              <FormControl.Label
                _text={{
                  bold: true,
                  color: "success.800",
                }}
              >
                Interests
              </FormControl.Label>
              <Select
                placeholder="Interests"
                selectedValue={interestsValue}
                onValueChange={(itemValue) => setInterestsValue(itemValue)}
              >
                {interests.map((interest, index) => (
                  <Select.Item
                    label={interest.label}
                    value={interest.value}
                    key={index}
                  />
                ))}
              </Select>
              {errors.interests ? (
                <FormControl.ErrorMessage>
                  {errors.interests}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>

            <FormControl isRequired >
              <FormControl.Label
                _text={{
                  bold: true,
                  color: "success.800",
                }}
              >
                Date Of Birth
              </FormControl.Label>
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

            <Button
              colorScheme="gray"
              onPress={pickImage}
              isDisabled={loading}
            >
              Pick a Profile Picture from camera roll
            </Button>
            {profilePicture && (
              <Image
                source={{ uri: profilePicture.uri }}
                alt="profile picture"
                style={{ width: "100%", height: 200 }}
              />
            )}
            <Button
              isLoading={loading}
              mt="2"
              colorScheme="green"
              onPress={handleSubmit}
            >
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}
