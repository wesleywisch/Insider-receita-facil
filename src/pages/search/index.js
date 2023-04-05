import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'

import { FoodList } from '../../components/FoodList'

import { api } from '../../services/api'

export function Search() {
  const route = useRoute()

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    (async function fetchRecipe() {
      const response = await api.get(`/foods?name_like=${route.params?.name}`)
      setRecipes(response.data)
    })()
  }, [route.params?.name])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <FoodList data={item} />
        )}
        ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o que está buscando...</Text>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9ff',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16,
    justifyContent: "center",
    marginTop: 8,
  }
})