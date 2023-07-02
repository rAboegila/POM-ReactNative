import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../pages/Sign-Up/Screen";
import Landing from "../pages/Landing/Screen";
import Home from "../pages/Home/Screen";
// import MyTickets from "../pages/MyTickets/Screen";
// import News from "../pages/News/Screen";
// import Events from "../pages/Events/Screen";
// import Location from "../pages/Location/Screen";
// import NotFound from "../pages/404/Screen";
import SignIn from "../pages/Sign-In/Screen";
import { useSelector } from "react-redux";
import { getLoggedIn } from "../redux/features/auth/authSlice";

const Router = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const Stack = createNativeStackNavigator();
  return isLoggedIn ? (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      {/* <Stack.Screen
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
      /> */}


    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Landing"
        component={Landing}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default Router;
