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
