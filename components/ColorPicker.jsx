import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function ColorPicker({ selectedColor, setSelectedColor }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        marginTop: 20,
      }}
    >
      {Colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            {
              height: 30,
              width: 30,
              borderRadius: 99,
              backgroundColor: color,
            },
            selectedColor == color && {
              borderWidth: 3,
              transform: [{ scale: 1.2 }],
            },
          ]}
          onPress={() => setSelectedColor(color)}
        ></TouchableOpacity>
      ))}
    </View>
  );
}
