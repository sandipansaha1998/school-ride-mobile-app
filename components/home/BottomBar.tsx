import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomBar() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Get the safe area insets

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60 + insets.bottom,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center", // Center vertically
          alignItems: "center",
          height: 60 + insets.bottom,
          gap: 5, // Center horizontally
        }}
        onPress={() => router.push("/home")}
      >
        <Ionicons name="home-outline" size={24} color="darkyellow" />
        <Text style={{ color: "red" }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          gap: 5, // Center horizontally
        }}
        onPress={() => router.push("/welcome")}
      >
        <Ionicons name="bus-outline" size={24} color="black" />
        <Text>My Bus</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          gap: 5, // Center horizontally
        }}
      >
        <Ionicons name="call-outline" size={24} color="black" />
        <Text>Contacts</Text>
      </TouchableOpacity>
    </View>
  );
}
