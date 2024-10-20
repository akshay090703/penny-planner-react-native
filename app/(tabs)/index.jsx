import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { client } from "../../utils/kindeConfig";
import { supabase } from "../../utils/SuperbaseConfig";
import Header from "../../components/Header";
import { Colors } from "@/constants/Colors";
import CircularChart from "../../components/CircularChart";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthenticate();
    getCategoryList();
  }, []);

  const checkAuthenticate = async () => {
    if (await client.isAuthenticated) {
      return;
    } else {
      router.replace("/login");
    }
  };

  // const checkUserAuth = async () => {
  //   const result = await services.getData("login");
  //   if (!result) {
  //     router.replace("/login");
  //   }
  // };

  const handleLogout = async () => {
    try {
      const loggedOut = await client.logout(true);

      await checkAuthenticate();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getCategoryList = async () => {
    const userProfile = await client.getUserDetails();

    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("created_by", userProfile.email);

    // console.log("Data: ", data);
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 170,
        }}
      >
        <Header />

        <CircularChart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
