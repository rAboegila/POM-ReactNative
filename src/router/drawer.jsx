import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
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
import About from "../pages/AboutUs/Screen";
import SignIn from "../pages/Sign-In/Screen";

//Import Components
import DrawerIcon from "../components/DrawerIcon/component";

//Variables
const username = "johnDoeUsername";
const name = "John";
const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "My Scores":
      return <MaterialIcons name="leaderboard" />;
    case "My Profile":
      return <AntDesign name="user" />;
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
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
              {username}
            </Text>
          </Box>
        </HStack>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => {
              const length = props.state.routeNames.length - 3;

              if (name !== "Dashboard" && index < length) {
                return (
                  <Pressable
                    key={name}
                    px="5"
                    py="3"
                    rounded="md"
                    bg={
                      index === props.state.index
                        ? "rgba(6, 182, 212, 0.1)"
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
                            ? "primary.500"
                            : "gray.500"
                        }
                        size="5"
                        as={getIcon(name)}
                      />
                      <Text
                        fontWeight="500"
                        color={
                          index === props.state.index
                            ? "primary.500"
                            : "gray.700"
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
          <VStack space="5">
            <VStack space="3">
              <Pressable
                px="5"
                py="3"
                onPress={(event) => {
                  props.navigation.navigate("Contact Us");
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="phone-message" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Contact Us
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                px="5"
                py="2"
                onPress={(event) => {
                  props.navigation.navigate("About Us");
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="information" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    About Us
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                px="5"
                py="3"
                onPress={(event) => {
                  props.navigation.navigate("Sign Out");
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="logout" />}
                  />
                  <Text fontWeight="500" color="gray.700">
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
      <Drawer.Screen name="My Scores" component={MyScores} />
      {/*
        ////////
         Fixed Drawer Links! 
        ////////
        */}
      <Drawer.Screen name="Contact Us" component={Contact} />
      <Drawer.Screen name="About Us" component={About} />
      <Drawer.Screen name="Sign Out" component={SignIn} />
    </Drawer.Navigator>
  );
}
