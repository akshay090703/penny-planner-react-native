import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SuperbaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseInfo from "../components/courseDetails/CourseInfo";
import { TouchableOpacity } from "react-native";
import CourseItemList from "../components/courseDetails/CourseItemList";
import { Colors } from "../constants/Colors";

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // console.log(categoryId);
    categoryId && getCategoryDetails();
  }, [categoryId]);

  const getCategoryDetails = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("id", categoryId);

    setCategoryData(data[0]);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />

      <CourseItemList categoryData={categoryData} />

      <Link
        style={styles.floatingBtn}
        href={{
          pathname: "/add-new-category-item",
          params: {
            categoryId: categoryData?.id,
          },
        }}
      >
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
