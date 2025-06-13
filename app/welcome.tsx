import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/auth");
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <LinearGradient
        colors={["#FFF3B0", "#FFE27A"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 24,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Brand Logo */}
        <View className="w-full h-[20vh] items-center justify-center ">
          <Image
            source={require("../assets/images/brand.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <Text className="text-center text-3xl font-light text-gray-800 ">
          Your Child’s Journey, Always in Sight.
        </Text>

        {/* Illustration */}
        <View className="w-full h-[40vh] rounded-2xl  shadow-lg">
          <Image
            source={require("../assets/images/parent-tracking.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          activeOpacity={0.8}
          className="bg-black py-4 w-[95%] rounded-lg mt-6 shadow-lg"
        >
          <Text className="text-center text-white text-lg font-bold">
            Get Started
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}
