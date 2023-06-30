import { View, Text } from "react-native";
import React, { useState } from "react";
import { Center, Input, FormControl, Button, Box ,useToast} from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles";

export default function ResetPassword({ navigation,route }) {
  
  const reqToken = route.params.reqToken;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
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
    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (handleValidation()) {
      await axios
        .post(`http://192.168.1.8:5000/pom/auth/resetpassword/${reqToken}`, {
          password,
          confirmPassword,
        })
        .then(() => {
          toast.show({title:"Password Updated Successfully",description:"Please Sign In Again",duration:3000})
          navigation.navigate("SignIn");
        })
        .catch(() => {
          setErrors({ request: "Reset Denied" });
          toast.show({title: "Could't Reset Password",duration:3000});
        });
    }
    setLoading(false);
  };

  return (
    <Center>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Text style={styles.warninngText}>
        You Have 10 minutes To Reset Password
      </Text>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={(value) => setPassword(value)} />
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

        <Button mt="2" style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <Feather name="loader" color="black" size={24} />
          ) : (
            <Text>Reset Password</Text>
          )}
        </Button>
      </Box>
    </Center>
  );
}
