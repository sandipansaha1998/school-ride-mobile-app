import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, Region, LatLng } from "react-native-maps";

// Dummy path to simulate child movement
const mockPath: Region[] = [
  {
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
  {
    latitude: 28.6145,
    longitude: 77.2105,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
  {
    latitude: 28.6155,
    longitude: 77.2115,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
  {
    latitude: 28.6165,
    longitude: 77.213,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
];

export default function App() {
  const [location, setLocation] = useState<Region>(mockPath[0]);
  const [path, setPath] = useState<LatLng[]>([
    {
      latitude: mockPath[0].latitude,
      longitude: mockPath[0].longitude,
    },
  ]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i = (i + 1) % mockPath.length;
      setLocation(mockPath[i]);
      setPath((prev) => [
        ...prev,
        {
          latitude: mockPath[i].latitude,
          longitude: mockPath[i].longitude,
        },
      ]);
      mapRef.current?.animateToRegion(mockPath[i], 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={styles.container}
      className="bg-blue-500 border border-black w-full"
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        provider={undefined}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        <Polyline coordinates={path} strokeColor="#FF0000" strokeWidth={4} />
        <Marker
          coordinate={location}
          title="Live Location"
          pinColor="green" // Green marker for live location
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "blue" },
  map: { flex: 1 },
});
