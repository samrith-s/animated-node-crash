import React from "react";

import {
  TouchableOpacity as RNTouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function TouchableOpacity() {
  return (
    <RNTouchableOpacity style={styles.btn}>
      <Text>Tap here!</Text>
    </RNTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 200,
    height: 100,
    backgroundColor: "lightgray",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
});
