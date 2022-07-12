import { Provider, MD3LightTheme } from "react-native-paper";
import Home from "./src/Home";

export default function App() {
  return (
    <Provider theme={{ ...MD3LightTheme, version: 3 }}>
      <Home />
    </Provider>
  );
}
