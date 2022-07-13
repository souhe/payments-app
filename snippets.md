## test cards

4000 0000 0000 0002

## Publishable key

```tsx
export const PUBLISHABLE_KEY =
  "pk_test_51Ho4m5A51v44wNexXNFEg0MSAjZUzllhhJwiFmAmJ4tzbvsvuEgcMCaPEkgK7RpXO1YI5okHP08IUfJ6YS7ulqzk00O2I0D1rT";
```

## Fetch Intent

```tsx
export const API_URL = "https://shy-opalescent-bactrosaurus.glitch.me";

const fetchPaymentIntentClientSecret = async () => {
  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "usd",
      items: [{ id: "id" }],
    }),
  });
  const { clientSecret } = await response.json();

  return clientSecret;
};

export default fetchPaymentIntentClientSecret;
```

## Payment

```tsx
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
```

## Card and button

```tsx
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
```

## Styles

```tsx
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
```
