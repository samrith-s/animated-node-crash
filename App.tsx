import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Entry } from "./src/Entry";
import { Frame } from "./src/Frame";

import { globals } from "./src/styles";
import { STACK_SCREEN_OPTIONS } from "./src/screen-options";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={globals.container}>
      <SafeAreaProvider>
        <SafeAreaView style={globals.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: true,
              }}
            >
              <Stack.Group screenOptions={STACK_SCREEN_OPTIONS}>
                <Stack.Screen
                  component={Entry}
                  name="entry"
                  options={{
                    headerTitle: "Animated Node Crash Test",
                  }}
                />
                <Stack.Screen component={Frame} name="frame" />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
