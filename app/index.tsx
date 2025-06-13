// app/index.tsx
import { AuthContext } from "@/context/authContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

export default function Index() {
  // Entry point for the app
  // Check if user is logged in
  // If logged in, redirect to the home screen
  // If not logged in, redirect to the welcome screen
  let authContext = useContext(AuthContext);
  if (authContext?.user) {
    // User is logged in, redirect to home
    return <Redirect href="/home" />;
  } else {
    // User is not logged in, redirect to welcome
    // return <Redirect href="/welcome" />;
    // return <Redirect href="/home" />;
    return <Redirect href="/onboarding/student" />;
  }
}
