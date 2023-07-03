import { View, Text } from "react-native";
import React, { useState } from "react";
import { Center, Input, FormControl, Button, Box } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles";
import CountDown from "react-native-countdown-component";
import api from "../../lib/api";

export default function ForgotPassword({navigation}) {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // Username validation
    if (!username) {
      formIsValid = false;
      errors["username"] = "Username cannot be empty";
    } else if (username.length < 3 || username.length > 10) {
      formIsValid = false;
      errors["username"] = "Username must be between 3 and 10 characters";
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

    setErrors(errors);
    return formIsValid;
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (handleValidation()) {
      await api
        .post("auth/forgotpassword/user", {
          phoneNumber,
          username,
        })
        .then((res) => {
          navigation.navigate("ResetPassword",{
            reqToken:res.data.token
          });
        })
        .catch((error) => {
          setErrors({ request: error.response.data || "Invalid Credentials" });
        });
    }
    setLoading(false);
  };
  return (
    <Center>
      {/* <CountDown
      until={180}
      /> */}
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        {errors.request ? (
          <Text style={styles.requestErorr}>{errors.request}</Text>
        ) : null}
        <FormControl>
          <FormControl.Label>User Name</FormControl.Label>
          <Input
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          {errors.username ? (
            <Text style={{ color: "red" }}>{errors.username}</Text>
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

        <Button mt="2" style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <Feather name="loader" color="black" size={24} />
          ) : (
            <Text>Retrieve Password</Text>
          )}
        </Button>
      </Box>
    </Center>
  );
}
