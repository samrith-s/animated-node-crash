import React, { useEffect, useRef } from "react";
import { Animated, Button, StyleSheet } from "react-native";

export function CustomAnimation() {
  const ctx = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ctx, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(ctx, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 4,
      }
    ).start();
  }

  useEffect(() => {
    runAnimation()  
  }, []);

  const translateY = ctx.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150],
  })

  const backgroundColor = ctx.interpolate({
    inputRange: [0, 1],
    outputRange: ["lightgray", "black"],
  })

  return (
    <>
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [{ translateY }],
            backgroundColor,
          },
        ]}
      />
      <Button title="Replay" onPress={runAnimation} />
    </>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 150,
    height: 150,
    borderRadius: 999,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
});
