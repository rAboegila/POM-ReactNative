import { View, Text } from "react-native";
import React, { useState } from "react";
import { Box, Button, useToast } from "native-base";
import {
  CardField,
  CardForm,
  StripeProvider,
  createToken,
  useStripe,
} from "@stripe/stripe-react-native";
import { apiToken } from "../../lib/api";

export default function Payment({ navigation, route }) {
  const { createPaymentMethod } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const ticketId = route.params.ticketId;
  const toast = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: "Card",
        card: {
          number: cardDetails.number,
          expMonth: cardDetails.expMonth,
          expYear: cardDetails.expYear,
          cvc: cardDetails.cvc,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        const tokenInstance = await apiToken();
        tokenInstance
          .post(`TicketPayment/create-payment-intent/ticket/${ticketId}`, {
            amount: 1000,
            token: "tok_visa",
          })
          .then((response) => {
            toast.show({ title: "Payemnt Success", placement: "top" });
            navigation.navigate("My Tickets");
          })
          .catch((err) => {
            console.log(err);
            toast.show({ title: "Payemnt Failed", placement: "top" });
            setIsLoading(false);
          });
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <Box safeArea>
      <StripeProvider publishableKey="pk_test_51NPMu0C2DJLtLtEWGcHUq4DW5nUPr0eXdHrZtBqcGaApE9uyWosBRfNu9xLvFvZpWJSzBOyFGx89VJJIzoHaHY5600KZWQYdIS">
        <View style={{ padding: 20 }}>
          <CardForm
            style={{ height: "90%" }}
            onFormComplete={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />

          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

          <Button
            onPress={handlePayment}
            isLoading={isLoading}
            isDisabled={!cardDetails}
            colorScheme={"green"}
          >
            Submit
          </Button>
        </View>
      </StripeProvider>
    </Box>
  );
}
