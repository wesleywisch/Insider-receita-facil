import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Pressable, Image, View, Modal, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { Ingredients } from '../../components/Ingredients'
import { Instructions } from '../../components/Instructions'
import { VideoView } from '../../components/VideoView';

import { isFavorite, saveFavorite, deleteFavorite, KEY_FAVORITES } from '../../utils/storage'

export function Detail() {
  const route = useRoute()
  const navigate = useNavigation()

  const [showVideo, setShowVideo] = useState(false)
  const [favorite, setFavorite] = useState(false)

  function handleOpenVideo() {
    setShowVideo(true)
  }

  async function handleShareRecipe() {
    try {
      await Share.share({
        url: route.params?.data.video,
        message: `Receita: ${route.params?.data.name}\nLink: ${route.params?.data.video}`,
      })
    } catch (err) {
      return alert('Não foi possível copiar o link para compartilhar. Tente novamente!')
    }
  }

  async function handleFavoritesRecipe(recipe) {
    if (favorite) {
      await deleteFavorite(KEY_FAVORITES, recipe.id)
      setFavorite(false);
      return;
    }

    await saveFavorite(KEY_FAVORITES, recipe)
    setFavorite(true)
  }

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const recipeFavorites = await isFavorite(KEY_FAVORITES, route.params?.data)
      setFavorite(recipeFavorites)
    }

    getStatusFavorites()

    navigate.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={() => handleFavoritesRecipe(route.params?.data)}>
          {favorite ? (
            <Entypo name="heart" size={28} color="#ff4141" />
          ) : (
            <Entypo name="heart-outlined" size={28} color="#ff4141" />
          )}
        </Pressable>
      )
    })
  }, [route.params?.data, navigate, favorite])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenVideo}>
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

        <Pressable onPress={handleShareRecipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {route.params?.data.ingredients.map((item) => (
        <Ingredients key={String(item.id)} data={item} />
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
        <Feather name="arrow-down" size={24} color="#fff" />
      </View>

      {route.params?.data.instructions.map((item, key) => (
        <Instructions key={String(item.id)} data={item} index={key} />
      ))}

      <Modal visible={showVideo} animationType='slide'>
        <VideoView
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>
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
  instructionsArea: {
    backgroundColor: "#4cbe6c",
    flexDirection: "row",
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#fff",
    marginRight: 8,
  },
})