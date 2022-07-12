import { Alert, StyleSheet, View } from "react-native";
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Button, Text } from "react-native-paper";
import fetchPaymentIntentClientSecret from "./fetchPaymentIntentClientSecret";

export const PUBLISHABLE_KEY =
  "pk_test_51Ho4m5A51v44wNexXNFEg0MSAjZUzllhhJwiFmAmJ4tzbvsvuEgcMCaPEkgK7RpXO1YI5okHP08IUfJ6YS7ulqzk00O2I0D1rT";

export default function App() {
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePay = async () => {
    // 1. fetch PaymentIntent
    const secret = await fetchPaymentIntentClientSecret();
    // 2. billing details
    const billingDetails = {
      email: "test@test.com",
      addressCity: "Wroclaw",
      addressCountry: "PL",
    };
    // 3. Confirm payment intent with card details
    const { error, paymentIntent } = await confirmPayment(secret, {
      type: "Card",
      billingDetails,
    });
    // 4. error handling
    if (error) {
      Alert.alert("Error occured", error.message);
    } else {
      Alert.alert("Success!", paymentIntent.status);
    }
  };

  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <Text variant="headlineLarge">Only good coffee here!</Text>
        <View style={styles.payment}>
          <CardField
            postalCodeEnabled={false}
            style={{ height: 40, width: "100%", margin: 10 }}
          />
          <Button
            icon="credit-card-outline"
            mode="contained"
            onPress={handlePay}
            loading={loading}
          >
            Pay
          </Button>
        </View>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 8,
    paddingTop: 80,
  },
  payment: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
