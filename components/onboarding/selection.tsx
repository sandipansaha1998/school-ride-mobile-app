import { ActivityIndicator, Image, Modal, Text } from "react-native";
import React, { ReactNode, use, useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entity } from "@/types/misc";
import { useQuery } from "@tanstack/react-query";
type SelectionProps = {
  type: "school" | "student";
  getItems: () => Promise<Entity[]>;
  onSelect: (item: Entity) => void;
  selectedItem?: Entity | null;
  IllustrationImage?: ReactNode;
  onNextCallback?: () => void;
};
const Selection: React.FC<SelectionProps> = ({
  type,
  getItems,
  onSelect,
  selectedItem,
  IllustrationImage,
  onNextCallback,
}) => {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<Entity[]>([]);
  const [searchCode, setSearchCode] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItemState, setSelectedItemState] = useState<Entity | null>();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [],
    queryFn: getItems,
  });
  useEffect(() => {
    if (data) {
      console.log("Fetched items:", data);
      setItems(data);
    }
  }, [data]);
  console.log("Items:", items);
  console.log("isLoading:", isLoading);
  const filteredItems = searchCode
    ? items.filter((item) =>
        item.code.toLowerCase().includes(searchCode.toLowerCase())
      )
    : items;

  const selectionParams = (() => {
    switch (type) {
      case "school":
        return {
          label: "Select your child’s ",
          highlightLabel: "school",
          placeholder: "Search by school code",
        };
      case "student":
      default:
        return {
          label: "Select your ",
          highlightLabel: "Select your student",
          placeholder: "Search by student code",
        };
    }
  })();

  const { label, highlightLabel, placeholder } = selectionParams;

  return (
    <View className={`w-full   `} style={{ marginTop: insets.top + 20 }}>
      <View>
        <Text
          className="ms-10 relative w-[75vw] text-yellowSecondary"
          style={{
            fontSize: 32,
            fontWeight: "600",
            textAlign: "auto",
          }}
        >
          {label}{" "}
          <Text className="text-[#DC3E26] font-bold">
            {type === "school" ? "school" : "student"}
          </Text>
        </Text>

        <View className="w-[100vw] h-[30vh] ">{IllustrationImage}</View>

        <View className="mt-1">
          <View
            className="w-full flex items-center"
            onTouchStart={() => {
              setShowModal(true);
              setSearchCode("");
            }}
          >
            <View className="bg-gray-300 rounded-lg w-[90vw] h-[60px] shadow-lg px-3 py-4 flex-row justify-between items-center mx-10">
              <Text className="text-gray-600 font-light text-xl ms-2 mr-2">
                {!selectedItem
                  ? `Tap here to search your ${type}`
                  : `Edit your ${type}`}
              </Text>
              <Text>
                <AntDesign name="rightcircle" size={24} color="#f7f7f7" />
              </Text>
            </View>
          </View>
          {selectedItem && (
            <View className="mt-4 bg-white rounded-lg w-[90vw] h-[60px] shadow-lg px-3 py-4 flex-row justify-between items-center mx-auto border border-[#F28705]">
              <View>
                <Text className="text-yellowSecondary font-bold text-lg">
                  {selectedItem.name}
                </Text>
                <Text className="text-gray-600 text-xs">
                  Code: {selectedItem.code}
                </Text>
              </View>
              <Text>
                <AntDesign name="checkcircle" size={28} color="#6dc174" />
              </Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={onNextCallback} className="mt-4 ">
        <View
          className={`w-full items-center ${selectedItem ? "flex" : "hidden"}`}
        >
          <View className="bg-yellowSecondary rounded-lg w-[90vw] h-[60px] shadow-lg px-4 py-4 flex-row justify-between items-center opacity-50 mx-10">
            <Text className="text-white font-bold text-xl tracking-wider mr-2">
              Next
            </Text>
            <Text>
              <AntDesign name="rightcircle" size={24} color="white" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        style={{ height: "100%" }}
        onDismiss={() => setShowModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 50, color: "black" }}
              placeholder={placeholder}
              value={searchCode}
              onChangeText={setSearchCode}
              placeholderTextColor={"gray"}
            />
            <View
              className="flex"
              style={{
                position: "absolute",
                left: 38,
                top: 40,
              }}
            >
              <Text>
                <MaterialIcons name="search" size={22} color="gray" />
              </Text>
            </View>
            <View
              style={{
                padding: 16,
                backgroundColor: selectedItem ? "#6dc174" : "",
                borderRadius: 8,
                marginBottom: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                className={`rounded-lg py-2 shadow-sm font-semibold ${
                  !selectedItem
                    ? " text-md ms-auto "
                    : " px-4 text-black text-xs mr-4"
                }`}
              >
                {!selectedItem ? `No ${type} selected` : selectedItem.code}
              </Text>
              <Text
                className="ms-auto"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {selectedItem?.name}
              </Text>
            </View>
            {data && (
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 16,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      onSelect(item);
                    }}
                  >
                    <Text className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-xs font-semibold mr-4">
                      {item.code}
                    </Text>
                    <Text
                      className="ms-auto"
                      style={{
                        color: "black",
                        fontWeight:
                          selectedItem?.id === item.id ? "bold" : "normal",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                    {selectedItem?.id === item.id && (
                      <Text style={{ marginLeft: 12 }}>
                        <AntDesign name="check" size={20} color="#73c479" />
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#888",
                      marginTop: 20,
                    }}
                  >
                    No {type}s found.
                  </Text>
                }
              />
            )}
            {isLoading && (
              <View className="flex items-center justify-center ">
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <TouchableOpacity
              className={`rounded-lg py-4 items-center mt-4 ${
                selectedItem
                  ? "bg-yellowSecondary opacity-100"
                  : "bg-gray-400 opacity-60"
              }`}
              disabled={!selectedItem}
              onPress={() => setShowModal(false)}
            >
              <Text className="text-white font-bold text-lg tracking-wider">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  dialog: {
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    height: "50%",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e8e8e8",
    borderRadius: 14,
    marginBottom: 8,
    height: 60,
    fontSize: 17,
    width: "100%",
  },
});

export default Selection;
