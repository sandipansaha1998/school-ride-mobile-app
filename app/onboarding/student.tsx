import Selection from "@/components/onboarding/selection";
import { School } from "@/types/school";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

const StudentOnboarding: React.FC = () => {
  let [selectedSchool, setselectedSchool] = useState<School | undefined>();
  const params = useLocalSearchParams();
  const renderSelectedSchool = () => {
    if (!selectedSchool) return null;
    return (
      <View style={{ marginVertical: 16, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Selected Student:
        </Text>
        <Text style={{ fontSize: 15, marginTop: 4 }}>
          {selectedSchool.name} ({selectedSchool.code})
        </Text>
      </View>
    );
  };

  return (
    <Selection
      type="student"
      onSelect={(item) => {
        setselectedSchool(item as School);
      }}
      selectedItem={selectedSchool}
      getItems={async () => {
        // import { getStudents } from "@/api/services/school";TODO

        // Simulate fetching schools
        return new Promise((res, rej) => {
          setTimeout(() => {
            // Simulated data
            res([
              { id: "1", name: "Ananya Reddy", code: "STU001" },
              { id: "2", name: "Vikram Nair", code: "STU002" },
              { id: "3", name: "Sourav Chatterjee", code: "STU003" },
              { id: "4", name: "Moumita Banerjee", code: "STU004" },
              { id: "5", name: "Aman Singh", code: "STU005" },
              { id: "6", name: "Simran Kaur", code: "STU006" },
            ]);
          }, 5000);
        });
      }}
      IllustrationImage={
        <View className="w-[80%] h-[80%] bg-slate-200 rounded-md flex justify-center items-center border p-3 mx-auto mt-4">
          <Image
            source={require("@/assets/images/student-id-card.png")}
            alt="School Illustration"
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default StudentOnboarding;
