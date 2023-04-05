import { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { FoodList } from '../../components/FoodList'

import { KEY_FAVORITES, getFavorites } from '../../utils/storage'

export function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    let isActive = true

    if (isActive) {
      (async function getRecipes() {
        const results = await getFavorites(KEY_FAVORITES)
        setRecipes(results)
      })()
    }

    return () => {
      isActive = false
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas favoritas</Text>

      {recipes.length === 0 && (
        <Text style={styles.notRecipe}>Você ainda não possui nenhuma receita salva.</Text>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={recipes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <FoodList data={item} />
        )}
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
    paddingTop: 36,
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
  notRecipe: {
    color: "#000",
    fontSize: 18,
    marginTop: 28,
    justifyContent: "center",
  },
})