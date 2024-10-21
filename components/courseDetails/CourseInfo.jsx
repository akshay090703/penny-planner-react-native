import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function CourseInfo({ categoryData }) {
  const [totalCost, setTotalCost] = useState(1);
  const [totalPerc, setTotalPerc] = useState(0);

  useEffect(() => {
    calculateTotalPerc();
  }, [categoryData]);

  const calculateTotalPerc = () => {
    let total = 0;
    categoryData?.categoryItems?.forEach((item) => (total += item?.cost));

    setTotalCost(total);

    const perc = (total / categoryData?.assigned_budget) * 100;
    setTotalPerc(perc);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryData?.color }]}
          >
            {categoryData?.icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{categoryData?.name}</Text>
          <Text style={styles.categoryItemText}>
            Items: {categoryData?.categoryItems?.length}
          </Text>
        </View>
        <Ionicons name="trash" size={28} color="darkred" />
      </View>

      {/* Progess Bar */}
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: "outfit-bold" }}>Rs. {totalCost}</Text>
        <Text style={{ fontFamily: "outfit" }}>
          Total Budget: {categoryData?.assigned_budget}
        </Text>
      </View>
      <View style={styles.progessBarMainContainer}>
        <View
          style={[styles.progessBarSubcontainer, { width: totalPerc + "%" }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: {
    fontSize: 35,
    padding: 20,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
    fontFamily: "outfit",
  },
  categoryName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  categoryItemText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  progessBarMainContainer: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 7,
  },
  progessBarSubcontainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    height: 15,
  },
});
