import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import {
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
} from "native-base";

global.__reanimatedWorkletInit = () => {};

//Import Screens
import Dashboard from "../pages/Dashboard/Screen";
import MyScores from "../pages/MyScores/Screen";
import Profile from "../pages/Profile/Screen";
import Contact from "../pages/ContactUs/Screen";
// import About from "../pages/AboutUs/Screen";
import SignIn from "../pages/Sign-In/Screen";
import MyTickets from "../pages/MyTickets/Screen";
import News from "../pages/News/Screen";
import Events from "../pages/Events/Screen";
import Location from "../pages/Location/Screen";
import NotFound from "../pages/404/Screen";

//Import Components
import DrawerIcon from "../components/DrawerIcon/component";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../redux/features/auth/authSlice";
import {
  getMemoizedProfile,
  getFirstName,
  getUserName,
} from "../redux/features/profile/profileSlice";

//Variables

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "My Scores":
      return <MaterialIcons name="leaderboard" />;
    case "My Profile":
      return <AntDesign name="user" />;
    case "My Tickets":
      return <FontAwesome5 name="ticket-alt" />;
    case "Locations":
      return <Entypo name="location" />;
    case "News":
      return <FontAwesome5 name="newspaper" />;
    case "Events":
      return <Entypo name="sports-club" />;
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  // const profile = useSelector(getMemoizedProfile);
  const username = useSelector(getUserName);
  const name = useSelector(getFirstName);

  let renderLength;
  if (props.state.history[props.state.history.length - 1].status === "open") {
    if (
      /^Dashboard/.test(props.state.history[props.state.history.length - 2].key)
    ) {
      renderLength = props.state.routeNames.length - 6;
    } else {
      renderLength = props.state.routeNames.length - 2;
    }
  }
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <HStack space={2} mx="5">
          <DrawerIcon navigation={props.navigation} iconSize={"md"} />
          <Box px="4">
            <Text bold color="gray.700">
              Hello {name} !
            </Text>
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
              @{username}
            </Text>
          </Box>
        </HStack>
        <VStack divider={<Divider />} space="4">
          <VStack space="1">
            {props.state.routeNames.map((name, index) => {
              if (name !== "Dashboard" && index < renderLength) {
                return (
                  <Pressable
                    key={name}
                    px="5"
                    py="3"
                    rounded="md"
                    bg={
                      index === props.state.index
                        ? "rgba(187, 247, 208,0.4)"
                        : "transparent"
                    }
                    onPress={(event) => {
                      props.navigation.navigate(name);
                    }}
                  >
                    <HStack space="7" alignItems="center">
                      <Icon
                        color={
                          index === props.state.index
                            ? "green.500"
                            : "green.600"
                        }
                        size="5"
                        as={getIcon(name)}
                      />
                      <Text
                        fontWeight="500"
                        color={
                          index === props.state.index
                            ? "green.600"
                            : "green.900"
                        }
                      >
                        {name}
                      </Text>
                    </HStack>
                  </Pressable>
                );
              }
            })}
          </VStack>
          <VStack space="2">
            <VStack space="2">
              <Pressable
                px="5"
                py="3"
                onPress={(event) => {
                  props.navigation.navigate("Contact Us");
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color="green.600"
                    size="5"
                    as={<MaterialCommunityIcons name="phone-message" />}
                  />
                  <Text color="green.900" fontWeight="500">
                    Contact Us
                  </Text>
                </HStack>
              </Pressable>

              <Pressable
                px="5"
                py="3"
                onPress={(event) => {
                  dispatch(loggedOut());
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color="green.600"
                    size="5"
                    as={<MaterialCommunityIcons name="logout" />}
                  />
                  <Text fontWeight="500" color="green.900">
                    Sign Out
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

export default function DrawerRouter() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/*
        ////////
         Rendered Drawer Links! 
        ////////
        */}
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="My Profile" component={Profile} />
      {/* <Drawer.Screen name="My Scores" component={MyScores} />  */}
      {/* My Scores->Next Phase */}
      {/*
        ////////
         Dashboard Drawer Links! 
        ////////
        */}
      <Drawer.Screen name="My Tickets" component={MyTickets} />
      <Drawer.Screen
        options={{ headerShown: true }}
        name="Locations"
        component={Location}
      />
      <Drawer.Screen
        options={{ headerShown: true }}
        name="News"
        component={News}
      />
      <Drawer.Screen
        options={{ headerShown: true }}
        name="Events"
        component={Events}
      />

      {/*
        ////////
         Fixed Drawer Links! 
        ////////
        */}
      <Drawer.Screen name="Contact Us" component={Contact} />
      {/* <Drawer.Screen name="Sign Out" component={SignIn} /> */}
      <Drawer.Screen name="NotFound" component={NotFound} />
    </Drawer.Navigator>
  );
}
