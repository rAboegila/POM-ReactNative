import React from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Text, Pressable, VStack, Square, Icon } from "native-base";
export default function DashboardItem({
  navigation,
  title,
  IconType,
  IconName,
  Screen,
}) {
  return (
    <Square w="150px" h="250px" borderRadius="10" bg={"green.600"}>
      <Pressable onPress={() => navigation.navigate(Screen)}>
        <VStack alignItems="center" space={3}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color="white">
            {title}
          </Text>
          <Icon as={IconType} name={IconName} size="40px" color="white" />
        </VStack>
      </Pressable>
    </Square>
  );
}
