import { View, Text } from 'react-native'
import React from 'react'
import { Marker ,MapView} from 'react-native-maps';
import { MaterialIcons,MaterialCommunityIcons ,FontAwesome5,Feather} from "@expo/vector-icons";

import { styles } from './styles';
import { HStack, VStack,Button,Icon, Box } from 'native-base';

export default function EventDetails({navigation,route}) {
    const event = route.params.event;
    // const region =  {
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }

    //   const onRegionChange=(region)=> {
    //     setState({ region });
    //   }
  return (
    <Box safeArea style={styles.container}>
        {/* <MapView style={styles.map}
          initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 37.78825,
            longitude: -122.4324}}
            title={"title"}
            description={"description"}
         />
      </MapView> */}
      
      <Text style={styles.description}>{event.description}</Text>
      <HStack space="3" justifyContent="space-between" width="90%" padding="3">
          <VStack space="2">
            <HStack space="1">
              <MaterialIcons name="date-range" size={24} color="#14ae5c" />
              <Text style={styles.text}>{event.date}</Text>
            </HStack>
            <HStack space="1">
            <MaterialCommunityIcons name="ticket" size={24} color="#14ae5c" />
              <Text style={styles.text}>{event.price}</Text>
            </HStack><HStack space="1">
            <FontAwesome5 name="running" size={24} color="#14ae5c" />
              <Text style={styles.text}>{event.type}</Text>
            </HStack>
          </VStack>
            <Button rightIcon={<Icon
            as={<FontAwesome5 name="shopping-basket" size={24} color="black" />}
            />}
            style={styles.buyTicket}
            >
                Buy Ticket
            </Button>
        </HStack>
    </Box>
  )
}