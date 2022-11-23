import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { AuthContextType, IUser } from '../types/auth'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { AuthContext } from '../context/authContext'
import { RootTabScreenProps } from '../types'
import { getMe } from '../api/spotify'
import { io } from "socket.io-client"
import { Card } from '../components/Card'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useHeaderHeight } from '@react-navigation/elements'


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const colorScheme = useColorScheme()
  const { auth } = useContext(AuthContext) as AuthContextType
  const insets = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  const cards = [
    {
      id: 0,
      title: 'Top songs',
      description: 'Check out your top songs',
      onPress: () => navigation.navigate('TopSongs'),
    },
    {
      id: 1,
      title: 'Top artists',
      description: 'Check out your top artists',
      onPress: () => navigation.navigate('TopArtists')
    },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 20,
      borderColor: Colors[colorScheme].primary,
      borderStyle: 'solid',
      borderWidth: 2,
    },
  })

  useEffect(() => {
    const socket = io('ws://localhost:5005', {
      transports: ["websocket"],
    })
    socket.emit('hey')
  }, [])

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 18, backgroundColor: Colors[colorScheme].background, paddingTop: 18 }} contentInsetAdjustmentBehavior="automatic">
      {cards.map(card => (
        <Card title={card.title} description={card.description} onPress={card.onPress} key={card.id} />
      ))}
      <Card title="Soundcheck" color="purple" description="Play the game!" onPress={() => navigation.navigate('Soundcheck')} />
    </ScrollView>


  )
}


