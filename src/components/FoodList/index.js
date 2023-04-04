import { View, Text, StyleSheet } from "react-native";

export function FoodList({ data }) {
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  )
}