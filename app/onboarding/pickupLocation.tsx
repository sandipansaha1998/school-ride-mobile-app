import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
// Plan it like a UI pakcage to be used in multiple places
//Get Desired location for action on a entity
const PickupLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // On iOS, permissions are handled by the library and Info.plist
        return true;
      }
    };

    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError("Location permission denied");
        return;
      }
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => setError(err.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Location</Text>
      {location ? (
        <Text style={styles.location}>
          Latitude: {location.latitude}
          {"\n"}
          Longitude: {location.longitude}
        </Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  location: { fontSize: 16 },
  error: { color: "red", fontSize: 16 },
});

export default PickupLocation;
