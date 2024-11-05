import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Registro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'paw' : 'paw-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: 'Opciones',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}