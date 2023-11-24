import React from "react";
import { Button, StyleSheet, View } from "react-native";

import { StackActions, useNavigation } from "@react-navigation/native";
import { Scenarios } from "../interface";
import { globals } from "./styles";

export function Entry() {
  const navigation = useNavigation();

  const handleNavigation = (scenario: Scenarios) => {
    navigation.dispatch(
      StackActions.push("frame", {
        scenario,
      })
    );
  };

  return (
    <View style={[globals.container, globals.center]}>
      <View style={styles.button}>
        <Button
          title="Touchable Opacity"
          onPress={() => {
            handleNavigation(Scenarios.TOUCHABLE_OPACITY);
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Section List"
          onPress={() => {
            handleNavigation(Scenarios.SECTION_LIST);
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Custom animation"
          onPress={() => {
            handleNavigation(Scenarios.CUSTOM);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    marginTop: 10,
  },
});
