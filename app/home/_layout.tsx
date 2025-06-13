import BottomBar from "@/components/home/BottomBar";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#FFF3B0", "#FFE27A"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <StatusBar translucent backgroundColor="red" barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Slot />
          </View>
          <BottomBar />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
