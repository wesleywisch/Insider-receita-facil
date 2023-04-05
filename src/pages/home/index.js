import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Text as MotiText } from 'moti'

import { Logo } from '../../components/Logo';
import { FoodList } from '../../components/FoodList';

import { api } from '../../services/api'

export function Home() {
  const navigate = useNavigation()

  const [inputValue, setInputValue] = useState('')
  const [foods, setFoods] = useState([])

  function handleSearch() {
    if (!inputValue.trim()) return

    setInputValue('')
    navigate.navigate('Search', { name: inputValue })
  }

  useEffect(() => {
    (function fetchApi() {
      const response = api.get('/foods')

      setFoods(response.data)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 100,
          type: "timing",
          duration: 650,
        }}
      >
        Encontre a receita
      </MotiText>

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 18,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 200,
          type: "timing",
          duration: 850,
        }}
      >
        que combina com você
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida..."
          style={styles.input}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4cbe6c" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FoodList data={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9ff',
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    backgroundColor: "#fff",
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: "90%",
    maxWidth: '90%',
    height: 54,
  },
})