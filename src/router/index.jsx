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
import ForgotPassword from "../pages/Forgot-Password/Screen";
import ResetPassword from "../pages/Reset-Password/Screen";
import { useSelector } from "react-redux";
import { getLoggedIn, isAppLoading } from "../redux/features/auth/authSlice";
import EventDetails from "../pages/Event-Details/Screen";
import Payment from "../pages/Payment/Screen";
import EventAdminCRUD from "../pages/EventAdminCRUD/component";
import BuyTicket from "../pages/BuyTicket/Screen";

const Router = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const isLoading = useSelector(isAppLoading);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
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
        options={{ headerShown: false }}
        name="Events"
        component={Events}
      /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Payment"
            component={Payment}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Buy Ticket"
            component={BuyTicket}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Event Details"
            component={EventDetails}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ResetPassword"
            component={ResetPassword}
          />
        </>
      ) : (
        <>
          <>
            {isLoading && (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Landing"
                component={Landing}
              />
            )}
          </>
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="ForgotPassword"
            component={ForgotPassword}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ResetPassword"
            component={ResetPassword}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
