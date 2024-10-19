import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { client } from "../utils/kindeConfig";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthenticate();
  }, []);

  // const checkUserAuth = async () => {
  //   const result = await services.getData("login");
  //   if (!result) {
  //     router.replace("/login");
  //   }
  // };

  const checkAuthenticate = async () => {
    if (await client.isAuthenticated) {
      // Need to implement, e.g: call an api, etc..
    } else {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const loggedOut = await client.logout(true);

      checkAuthenticate();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
