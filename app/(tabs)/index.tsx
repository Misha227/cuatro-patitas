import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import IngresoMascota from './PetCreator';
import RazaInfo from './RazaInfo'

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  return (
    <Stack.Navigator>
      <Stack.Screen name="ingreso" component={IngresoMascota} />
      <Stack.Screen name="razainfo" component={RazaInfo}/>
    </Stack.Navigator>


  );
}