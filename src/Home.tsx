import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function App() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Only good coffee here!</Text>
      <View style={styles.payment}>
        <Button icon="credit-card-outline" mode="contained" onPress={() => {}}>
          Pay
        </Button>
      </View>
    </View>
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
