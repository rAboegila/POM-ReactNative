import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Center,
  Button,
  VStack,
  FormControl,
  Heading,
  Select,
} from "native-base";
import { useSelector } from "react-redux";
import { getUserID } from "../../redux/features/profile/profileSlice";
import { apiToken } from "../../lib/api";
import styles from "./styles";
export default function BuyTicket({ navigation, route }) {
  function handleValidation() {
    let formIsValid = true;
    let errors = {};

    if (!role) {
      formIsValid = false;
      errors.role = "Role is required";
    }

    if (!tShirtSize) {
      formIsValid = false;
      errors.shirtSize = "Shirt Size is required";
    }
    setErrors(errors);
    return formIsValid;
  }

  const shirtSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const userId = useSelector(getUserID);
  const eventId = route.params.event._id;
  const eventName = route.params.event.name;
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState(null);
  const [tShirtSize, setTShirtSize] = useState(null);

  const [loading, setLoading] = useState(false);

  async function Submit() {
    setLoading(true);
    console.log(eventId);
    if (handleValidation()) {
      const tokenInstance = await apiToken();
      await tokenInstance
        .post("Ticket/ticket", {
          user: userId,
          event: eventId,
          role,
          tshirtSize: tShirtSize,
          paymentStatus: "paid",
          barCode: {
            code: "ABC123",
            entryStatus: false,
          },
          type: "earlyBird",
          earlyBird: {
            discount: 0.2,
            endDate: "2023-07-31T00:00:00.000Z",
            freeTshirt: true,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigation.navigate("Payment", {
            ticketId:res.data.data._id,
          });
        })
        .catch((err) => console.log(err.response?.data))
        .finally(() => setLoading(false));
    }
  }
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          {eventName + " Ticket"}
        </Heading>
        <VStack space={3} mt="5">
          {errors.request ? (
            <Text style={styles.requestErorr}>{errors.request}</Text>
          ) : null}
          <FormControl isReadOnly isRequired isInvalid={errors.government}>
            <FormControl.Label
              _text={{
                bold: true,
                color: "success.800",
              }}
            >
              Role
            </FormControl.Label>
            <Select
              placeholder="Role"
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Select.Item
                label={"Participant"}
                value={"participant"}
                key={"participant"}
              />
              <Select.Item label={"Guest"} value={"guest"} key={"guest"} />
            </Select>
            {errors.guest ? (
              <FormControl.ErrorMessage>
                {errors.guest}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isReadOnly isRequired isInvalid={errors.shirtSize}>
            <FormControl.Label
              _text={{
                bold: true,
                color: "success.800",
              }}
            >
              T-Shirt Size
            </FormControl.Label>
            <Select
              placeholder="T-Shirt Size"
              selectedValue={tShirtSize}
              onValueChange={(itemValue) => setTShirtSize(itemValue)}
            >
              {shirtSizes.map((size, index) => (
                <Select.Item label={size} value={size} key={index} />
              ))}
            </Select>
            {errors.shirtSize ? (
              <FormControl.ErrorMessage>
                {errors.shirtSize}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <Button
            mt="3"
            colorScheme="#14ae5c"
            style={styles.button}
            onPress={Submit}
            isLoading={loading}
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
