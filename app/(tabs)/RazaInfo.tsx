import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface RazaInfo {
  [key: string]: {
    descripcion: string;
    caracteristicas: string[];
    imagen: string; // Add an image URL for each breed
  };
}

const infoPeRazas: RazaInfo = {
  'Labrador': {
    descripcion: 'El Labrador Retriever es una raza de perro amigable y versátil, conocida por su inteligencia y disposición para complacer.',
    caracteristicas: ['Amigable', 'Inteligente', 'Activo', 'Buen nadador', 'Excelente con niños'],
    imagen: 'https://example.com/labrador.jpg', // Replace with actual image URL
  },
  'Golden Retriever': {
    descripcion: 'El Golden Retriever es un perro leal y cariñoso, famoso por su pelaje dorado y su naturaleza gentil.',
    caracteristicas: ['Afectuoso', 'Inteligente', 'Paciente', 'Buen con familias', 'Fácil de entrenar'],
    imagen: require('../../assets/golden.jpg'), // Replace with actual image URL
  },
  // Add other breeds with images...
};

const infoGaRazas: RazaInfo = {
  'Siamés': {
    descripcion: 'El gato Siamés es conocido por su cuerpo esbelto, cara distintiva y personalidad vocal y afectuosa.',
    caracteristicas: ['Vocal', 'Inteligente', 'Afectuoso', 'Activo', 'Social'],
    imagen: 'https://example.com/siames.jpg', // Replace with actual image URL
  },
  'Persa': {
    descripcion: 'El gato Persa es famoso por su pelaje largo y lujoso, cara achatada y temperamento tranquilo.',
    caracteristicas: ['Tranquilo', 'Afectuoso', 'Pelaje largo', 'Cara achatada', 'Poco activo'],
    imagen: 'https://example.com/persa.jpg', // Replace with actual image URL
  },
  // Add other breeds with images...
};

const RazaInfo: React.FC = () => {


  const route = useRoute();
  const { tipo, raza } = route.params as { tipo: string; raza: string };

  const razaInfo = tipo === 'perro' ? infoPeRazas[raza] : infoGaRazas[raza];



  if (!razaInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Información no disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/golden.jpg')} style={styles.petImage} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{raza}</Text>
        <View style={styles.premiumFeatures}>
          <Text style={styles.premiumTitle}>Caracteristicas:</Text>
          {razaInfo.caracteristicas.map((caracteristica, index) => (
          <Text key={index} style={styles.caracteristica}>• {caracteristica}</Text>
        ))}
   
        </View>
        <View style={styles.exportData}>
          <Text style={styles.exportTitle}>Como es esta raza?</Text>
          <Text style={styles.description}>{razaInfo.descripcion}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    color: '#4a4a4a',
    marginBottom: 10,
    textAlign: 'center',
  },
  premiumFeatures: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  premiumTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  premiumItem: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4a4a4a',
    marginBottom: 5,
  },
  exportData: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  exportTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  exportDescription: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4a4a4a',
  },
  pricing: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  pricingText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4a4a4a',
    marginBottom: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  caracteristica: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4a4a4a',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default RazaInfo;
