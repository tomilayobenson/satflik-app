import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import MainScreen from "./screens/MainScreen";
import { store } from "./redux/store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </Provider>

  );
}
