import React, { useState } from "react";
import {
  Input,
  Center,
  Box,
  Heading,
  VStack,
  Link,
  HStack,
  FormControl,
  Button,
  Pressable,
  Icon,
  Text,
} from "native-base";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "./styles";
import axios from "axios";
import { loggedInUpdated ,getLoggedIn} from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleValidation = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is Required";
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "password is Required";
    } else if (password.length < 8) {
      errors.password = "password must be at least 8 characters";
    }
    setErrors(errors);
    if (errors.password || errors.email) return false;

    return true;
  };

  const SignIn = async () => {
    setLoading(true);
    if (handleValidation()) {
      await axios
        .post("http://192.168.1.8:5000/pom/auth/login", { email, password })
        .then(() => {
          setLoading(false);
          // dispatch(loggedInUpdated(true));
          // console.log(getLoggedIn());
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Sign In
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={email}
              onChangeText={(value) => {
                setEmail(value);
              }}
            />
            {errors.email ? (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              onChangeText={(value) => {
                setPassword(value);
              }}
            />
            {errors.password ? (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            ) : null}
          </FormControl>
          <Button
            mt="3"
            colorScheme="#14ae5c"
            style={styles.button}
            onPress={SignIn}
          >
            {loading ? (
              <Feather name="loader" color="black" size={24} />
            ) : (
              <Text>Sign In</Text>
            )}
          </Button>
          <HStack justifyContent="space-between">
            <Link
              _text={{
                color: "#14ae5c",
                fontSize: "sm",
                fontWeight: "500",
                textDecoration: "none",
              }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Link>
            <Link
              _text={{
                color: "muted.400",
                fontSize: "sm",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Forgot Password
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}