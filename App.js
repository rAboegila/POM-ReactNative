import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider, Text, Box } from "native-base";
import Router from "./src/router";
import SignIn from "./src/pages/Sign-In/Screen";
// const Drawer = createDrawerNavigator();
// function HomeScreen({ navigation }) {
//   return (
//     // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//     //   <Button
//     //     onPress={() => navigation.navigate("Notifications")}
//     //     title="Go to notifications"
//     //   />
//     // </View>
//     <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
//       <Text>Open up App.js to start working on your app!</Text>
//       <Button
//         onPress={() => navigation.navigate("Notifications")}
//         title="Go to notifications"
//       />
//     </Box>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator> */}
        {/* <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View> */}
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
