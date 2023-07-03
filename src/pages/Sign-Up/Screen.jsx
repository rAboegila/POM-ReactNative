import React, { useState } from "react";
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
  Image,
} from "native-base";

//Import Library Objects
import { INTERESTS, GOVERNMENTS } from "../../lib/enums";
import { toSentenceCase } from "../../lib/helpers";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import api from "../../lib/api";

export default SignUp = ({ navigation }) => {
  const [hasGalleryPermission, requestGalleryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [profilePicture, setProfilePicture] = useState(null);
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
      label: toSentenceCase(GOVERNMENTS.PORTSAID),
      value: GOVERNMENTS.PORTSAID,
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
      label: toSentenceCase(GOVERNMENTS.KAFRELSHEIKH),
      value: GOVERNMENTS.KAFRELSHEIKH,
    },
    { label: toSentenceCase(GOVERNMENTS.MONUFIA), value: GOVERNMENTS.MONUFIA },
    { label: toSentenceCase(GOVERNMENTS.BEHEIRA), value: GOVERNMENTS.BEHEIRA },
    { label: toSentenceCase(GOVERNMENTS.MINYA), value: GOVERNMENTS.MINYA },
    {
      label: toSentenceCase(GOVERNMENTS.BENISUEF),
      value: GOVERNMENTS.BENISUEF,
    },
    { label: toSentenceCase(GOVERNMENTS.FAIYUM), value: GOVERNMENTS.FAIYUM },
    {
      label: toSentenceCase(GOVERNMENTS.NEWVALLEY),
      value: GOVERNMENTS.NEWVALLEY,
    },
    { label: toSentenceCase(GOVERNMENTS.ASYUT), value: GOVERNMENTS.ASYUT },
    { label: toSentenceCase(GOVERNMENTS.REDSEA), value: GOVERNMENTS.REDSEA },
    { label: toSentenceCase(GOVERNMENTS.SOHAG), value: GOVERNMENTS.SOHAG },
    { label: toSentenceCase(GOVERNMENTS.QENA), value: GOVERNMENTS.QENA },
    { label: toSentenceCase(GOVERNMENTS.MATRUH), value: GOVERNMENTS.MATRUH },
    {
      label: toSentenceCase(GOVERNMENTS.NORTHSINAI),
      value: GOVERNMENTS.NORTHSINAI,
    },
    {
      label: toSentenceCase(GOVERNMENTS.SOUTHSINAI),
      value: GOVERNMENTS.SOUTHSINAI,
    },
    { label: toSentenceCase(GOVERNMENTS.HELWAN), value: GOVERNMENTS.HELWAN },
  ]);
  const [interestsValue, setInterestsValue] = useState(null);
  const [interests, setInterests] = useState([
    { label: toSentenceCase(INTERESTS.PARKOUR), value: INTERESTS.PARKOUR },
    { label: toSentenceCase(INTERESTS.SKATE), value: INTERESTS.SKATE },
    { label: toSentenceCase(INTERESTS.BOTH), value: INTERESTS.BOTH },
  ]);
  const toast = useToast();

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
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("dob", dob.toISOString().slice(0, 10));
      formData.append("city", city);
      formData.append("interests", interestsValue);
      formData.append("profilePic", profilePicture);
      await api
        .post("auth/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          toast.show({ title: "Registered Successfully", placement: "top" });
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          setLoading(false);
          setErrors({ request: error.response.data.error });
        });
    }
    setLoading(false);
  };
  return (
    <ScrollView w="100%">
      <Center>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
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
            <FormControl isInvalid={errors.firstName}>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
              />
              {errors.firstName ? (
                <FormControl.ErrorMessage>
                  {errors.firstName}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                value={lastName}
                onChangeText={(value) => setLastName(value)}
              />
              {errors.lastName ? (
                <FormControl.ErrorMessage>
                  {errors.lastName}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.username}>
              <FormControl.Label>User Name</FormControl.Label>
              <Input onChangeText={(value) => setUsername(value)} />
              {errors.username ? (
                <FormControl.ErrorMessage>
                  {errors.username}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={(value) => setEmail(value)} />
              {errors.email ? (
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setPassword(value)}
              />
              {errors.password ? (
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setConfirmPassword(value)}
              />
              {errors.confirmPassword ? (
                <FormControl.ErrorMessage>
                  {errors.confirmPassword}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.phoneNumber}>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
              />
              {errors.phoneNumber ? (
                <FormControl.ErrorMessage>
                  {errors.phoneNumber}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.city}>
              <FormControl.Label>Government</FormControl.Label>
              <Select
                placeholder="Government"
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
              >
                {cities.map((city, index) => (
                  <Select.Item
                    label={city.label}
                    value={city.value}
                    key={index}
                  />
                ))}
              </Select>
              {errors.city ? (
                <FormControl.ErrorMessage>
                  {errors.city}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.interests}>
              <FormControl.Label>Interests</FormControl.Label>
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

            <Button onPress={pickImage}>
              Pick a Profile Picture from camera roll
            </Button>
            {profilePicture && (
              <Image
                source={{ uri: profilePicture.uri }}
                alt="profile picture"
                style={{ width: "100%", height: 200 }}
              />
            )}
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
