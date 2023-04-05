import { useLayoutEffect } from 'react';
import { ScrollView, Text, StyleSheet, Pressable, Image, View, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { Ingredients } from '../../components/Ingredients'

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#fafafa" />
        </View>
        <Image
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>Ingredientes: ({route.params?.data.total_ingredients})</Text>
        </View>

        <Pressable>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {route.params?.data.ingredients.map((item) => (
        <Ingredients key={String(item.id)} data={item} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9ff',
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  ingredientsText: {
    marginBottom: 14,
    fontSize: 16,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
})