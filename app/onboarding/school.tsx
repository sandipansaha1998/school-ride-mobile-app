import Selection from "@/components/onboarding/selection";
import { School } from "@/types/school";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SchoolOnboarding: React.FC = () => {
  let [selectedSchool, setselectedSchool] = useState<School | undefined>();
  let router = useRouter();
  return (
    <Selection
      type="school"
      onSelect={(item) => {
        setselectedSchool(item as School);
      }}
      onNextCallback={() => {
        router.push("/onboarding/student");
      }}
      selectedItem={selectedSchool}
      getItems={async () => {
        // import { getSchools } from "@/api/services/school";TODO

        // Simulate fetching schools
        return new Promise((res, rej) => {
          setTimeout(() => {
            // Simulated data
            res([
              { id: "1", name: "Greenwood High", code: "GH123" },
              { id: "2", name: "Riverdale Academy", code: "RA456" },
              { id: "3", name: "Sunnydale School", code: "SS789" },
            ]);
          }, 5000);
        });
      }}
      IllustrationImage={
        <Image
          source={require("@/assets/images/school.png")}
          alt="School Illustration"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
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

export default SchoolOnboarding;
