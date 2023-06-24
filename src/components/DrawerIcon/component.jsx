import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { HStack, Pressable, Icon } from "native-base";
import { useDrawerStatus } from "@react-navigation/drawer";

export default function DrawerIcon({ navigation, iconSize }) {
  const isDrawerOpen = useDrawerStatus() === "open";

  return (
    <HStack>
      <Pressable onPress={() => navigation.toggleDrawer()}>
        {isDrawerOpen ? (
          <Icon
            as={AntDesign}
            name="menu-unfold"
            size={iconSize}
            color="green.700"
          />
        ) : (
          <Icon
            as={AntDesign}
            name="menu-fold"
            size={iconSize}
            color="green.700"
          />
        )}
      </Pressable>
    </HStack>
  );
}
