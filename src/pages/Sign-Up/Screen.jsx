import { View, Text } from "react-native";
import React from "react";
import RegisterForm from "../../components/RegisterForm/component";

export default function SignUp({ navigation }) {
  return (
    <View>
      <RegisterForm navigation={navigation} />
    </View>
  );
}
