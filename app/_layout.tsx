import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { AuthContext } from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user: null }}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
        </SafeAreaProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
