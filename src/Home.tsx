import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import fetchPaymentIntentClientSecret from "./fetchPaymentIntentClientSecret";

export const PUBLISHABLE_KEY =
  "pk_test_51Ho4m5A51v44wNexXNFEg0MSAjZUzllhhJwiFmAmJ4tzbvsvuEgcMCaPEkgK7RpXO1YI5okHP08IUfJ6YS7ulqzk00O2I0D1rT";

export default function App() {
  const { confirmPayment, loading } = useConfirmPayment();
  const handlePay = async () => {
    // 2. collect billing details
    const billingDetails = {
      email: "test@test.com",
      adressCity: "Wroclaw",
      adressCountry: "PL",
    };

    // 3. fetch payment intent secret
    const secret = await fetchPaymentIntentClientSecret(billingDetails.email);

    // 4. confirm a payment
    const { error, paymentIntent } = await confirmPayment(secret, {
      type: "Card",
      billingDetails,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Succes");
    }
  };

  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <Text variant="headlineLarge">Only good coffee here!</Text>
        <View style={styles.payment}>
          {/* 1. render card field and collect card data */}
          <CardField style={styles.cardField} postalCodeEnabled={false} />
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
  cardField: {
    width: "100%",
    height: 40,
  },
});
