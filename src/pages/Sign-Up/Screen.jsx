import React from "react";
import RegisterForm from "../../components/RegisterForm/component";
import GoBackButton from "../../components/GoBackButton/component";
import { Box } from "native-base";

export default function SignUp({ navigation }) {
  return (
    <Box safeArea>
      <GoBackButton navigation={navigation}/>
      <RegisterForm navigation={navigation} />
    </Box>
  );
}
