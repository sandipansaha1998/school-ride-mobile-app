import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const toggleX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const toggleLogin = () => {
    toggleX.value = withTiming(isLoginPage ? 1 : 0, { duration: 300 });
    setIsLoginPage((prev) => !prev);
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: toggleX.value * 175 }],
  }));
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: insets.top + 50,
      }}
      className="flex-1 bg-transparent px-6"
    >
      <Text className="text-black text-3xl font-semibold mb-2">
        {isLoginPage ? "Log in to your account" : "Register to start"}
      </Text>
      <Text className="text-gray-500 mb-6">
        Manage your school rides effortlessly with our app
      </Text>

      <View className="flex-row rounded-full p-1 mb-6 relative bg-gray-200 overflow-hidden">
        {/* Animated Indicator */}
        <Animated.View
          className="absolute top-1 h-full w-1/2 bg-gray-100 rounded-full "
          style={indicatorStyle}
        />

        {/* Tabs */}
        <Pressable
          className="flex-1 items-center justify-center py-4 z-10"
          onPress={() => !isLoginPage && toggleLogin()}
        >
          <Text
            className={`font-semibold ${
              isLoginPage ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center justify-center py-4 z-10"
          onPress={() => isLoginPage && toggleLogin()}
        >
          <Text
            className={`font-semibold ${
              !isLoginPage ? "text-white" : "text-gray-500"
            }`}
          >
            Register
          </Text>
        </Pressable>
      </View>

      {/*  Input */}
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-4">
        <Feather name="phone" size={20} color="#888" />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          className="ml-3 flex-1 text-black"
        />
      </View>

      {/* Password Input */}
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-2">
        <Feather name="lock" size={20} color="#888" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
          className="ml-3 flex-1 text-black"
        />
        <Feather name="eye" size={20} color="#888" />
      </View>

      {/* Main Button */}
      <TouchableOpacity className="bg-green-600 py-4 rounded-xl mb-4">
        <Text className="text-white text-center text-base font-semibold">
          {isLoginPage ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>

      {/* Or login with */}
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-3 text-gray-400">Or login with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Social Login */}
      <View className="flex-row justify-center space-x-6 gap-2">
        <TouchableOpacity className="flex-row items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg">
          <FontAwesome name="google" size={20} color="#EA4335" />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg"
          onPress={() => {
            // Replace with your navigation logic
            // For example, using React Navigation:
            // router.push("/onboarding");
          }}
        >
          <FontAwesome name="user" size={20} color="#1877F2" />
          <Text>Test user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
