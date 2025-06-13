import React from "react";
import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <LinearBackgroundWithBrand />
    </SafeAreaProvider>
  );
}

function LinearBackgroundWithBrand() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#FFF3B0", "#FFE27A"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: insets.top + 20,
        alignItems: "center",
        zIndex: -1,
        height: "100%",
      }}
    ></LinearGradient>
  );
}
