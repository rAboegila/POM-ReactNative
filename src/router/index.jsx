import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../pages/Sign-Up/Screen";
import Landing from "../pages/Landing/Screen";
import Index from "../pages";
import SignIn from "../pages/Sign-In/Screen";

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true }}
        name="Landing"
        component={Landing}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
          options={{ headerShown: true }}
          name="SignUp"
          component={SignUp}
        />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Index"
        component={Index}
      />
    </Stack.Navigator>
  );
};

export default Router;
