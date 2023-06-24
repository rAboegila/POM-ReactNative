import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../pages/Landing/Screen";
import Home from "../pages/Home/Screen";
import MyTickets from "../pages/MyTickets/Screen";
import News from "../pages/News/Screen";
import Events from "../pages/Events/Screen";
import Location from "../pages/Location/Screen";

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
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="My Tickets"
        component={MyTickets}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Locations"
        component={Location}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="News"
        component={News}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Events"
        component={Events}
      />
    </Stack.Navigator>
  );
};

export default Router;
