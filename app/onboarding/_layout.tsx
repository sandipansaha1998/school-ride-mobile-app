import React from "react";
import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { useRouter, useSegments } from "expo-router";

export default function Layout() {
  const segments = useSegments();
  const currentRoute = segments.join("/").split("/").pop();

  let progress = 1;
  if (currentRoute === "school") {
    progress = 1;
  } else if (currentRoute === "student") {
    progress = 2;
  } else if (currentRoute === "pickupLocation") {
    progress = 3;
  } else {
    progress = 1; // Default to 1 if no match
  }
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <LinearBackground />
      <View className="flex flex-row gap-5 mt-auto mb-[5vh] mx-auto">
        {[...Array(3)].map((_, idx) => (
          <View
            key={idx}
            className={`rounded-full   w-[12px] h-[12px] ${
              idx <= progress - 1
                ? "bg-yellowSecondary"
                : "border border-yellow-600"
            } `}
          />
        ))}
      </View>
    </SafeAreaProvider>
  );
}

function LinearBackground() {
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
