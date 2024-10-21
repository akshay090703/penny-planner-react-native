import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CourseItemList({ categoryData }) {
  const handleOpenURL = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't open URL:", err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items List</Text>

      <View style={{ marginTop: 15 }}>
        {categoryData?.categoryItems?.length > 0 ? (
          categoryData?.categoryItems?.map((item, index) => (
            <View key={index}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item?.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item?.name}</Text>
                  <TouchableOpacity onPress={() => handleOpenURL(item?.url)}>
                    <Text style={styles.urlText}>Visit Item Site</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cost}>Rs. {item.cost}</Text>
              </View>
              {categoryData?.categoryItems?.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: 10,
                    borderColor: Colors.GRAY,
                  }}
                ></View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No Items Found!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  urlText: {
    color: Colors.PRIMARY,
    textDecorationLine: "underline",
    fontFamily: "outfit",
    fontSize: 14,
  },
  name: { fontSize: 20, fontFamily: "outfit-bold" },
  cost: {
    fontSize: 17,
    fontFamily: "outfit-bold",
    marginLeft: 10,
  },
  noItemsText: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    color: Colors.GRAY,
  },
});
