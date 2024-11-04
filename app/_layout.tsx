import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AnimatedSplash } from '../components/Animation';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const handleAnimationComplete = () => {
    setShowSplash(false);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ flex: 1 }}>
        {showSplash && (
          <AnimatedSplash onAnimationComplete={handleAnimationComplete} />
        )}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}