//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import { AntDesign, WarningOutlineIcon } from "@expo/vector-icons";
import {
  Box,
  Text,
  Icon,
  HStack,
  Center,
  VStack,
  Avatar,
  FormControl,
  Stack,
  Input,
  Button,
  Circle,
  Image,
  ScrollView,
} from "native-base";

//Components Imports
import DrawerIcon from "../../components/DrawerIcon/component";
import DashboardItem from "../../components/DashboardItem/component";
import logo from "../../../assets/POM_Logo.jpg";

// External Style Sheet Import
// import styles from "./styles";

export default function ProfileInformationForm() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    setErrors({});
    console.log(formData);
    console.log("before valid", errors);

    valid = true;
    console.log(formData.name);

    if (formData.name == undefined) {
      console.log("undefined name");
      setErrors({ ...errors, name: "Name is required" });
      //   console.log("undefined name error");
      valid = false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      valid = false;
    }
    // if (formData.email === undefined) {
    //   setErrors({ ...errors, email: "Email is required" });
    //   valid = false;
    // } else if (formData.email.length < 5) {
    //   setErrors({ ...errors, email: "Email is too short" });
    //   valid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   setErrors({ ...errors, email: "Email is invalid" });
    //   valid = false;
    // }
    //  return ;
    if (valid) {
      setErrors({});
    }
    console.log("after valid", errors);

    return valid;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <Center>
      <VStack width="90%" mx="3" maxW="300px">
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Name
          </FormControl.Label>
          <Input
            placeholder="John"
            onChangeText={(value) => {
              if (value != "") setData({ ...formData, name: value });
            }}
          />
          {"name" in errors ? (
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={"email" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Email
          </FormControl.Label>
          <Input                                           
            placeholder="john@example.com"
            onChangeText={(value) => {
              console.log("email value", value);
              if (value !== "") setData({ ...formData, email: value });
            }}
          />
          {"email" in errors ? (
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              {/* Name should contain atleast 3 character. */}
            </FormControl.HelperText>
          )}
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button>
      </VStack>
    </Center>
  );
}
