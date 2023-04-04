import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

export function Detail() {
  const route = useRoute()
  const navigate = useNavigation()

  useLayoutEffect(() => {
    navigate.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable>
          <Entypo name="heart" size={28} color="#ff4141" />
        </Pressable>
      )
    })
  }, [route.params?.data, navigate])

  return (
    <View style={styles.container}>
      <Text>Página Detail</Text>
      <Text>{route.params?.data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  }
})