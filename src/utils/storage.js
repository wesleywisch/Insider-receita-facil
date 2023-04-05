import AsyncStorage from '@react-native-async-storage/async-storage'

export const KEY_FAVORITES = '@favorites'

export async function getFavorites(key) {
  const favorites = await AsyncStorage.getItem(key);
  return JSON.parse(favorites) || [];
}

export async function saveFavorite(key, newItem) {
  let myFavorites = await getFavorites(key);

  let hasItem = myFavorites.some(item => item.id === newItem.id)

  if (hasItem) {
    return;
  }

  myFavorites.push(newItem)

  await AsyncStorage.setItem(key, JSON.stringify(myFavorites))
}

export async function deleteFavorite(key, id) {
  let favorites = await getFavorites(key);

  let myFavorites = favorites.filter(item => item.id !== id)

  await AsyncStorage.setItem(key, JSON.stringify(myFavorites))
  return myFavorites
}

export async function isFavorite(key, recipe) {
  let myFavorites = await getFavorites(key)

  const favorites = myFavorites.find(item => item.id === recipe.id)

  if (favorites) {
    return true;
  }

  return false;
}