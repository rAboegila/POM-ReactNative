import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../pages/Landing/Screen";
import Index from "../pages";

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true }}
        name="Landing"
        component={Landing}
      />
      {/* <Stack.Screen
          options={{ headerShown: true }}
          name="SignIn"
         // component={}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="SignUp"
          // component={}
        /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Index"
        component={Index}
      />
    </Stack.Navigator>
  );
};

export default Router;
