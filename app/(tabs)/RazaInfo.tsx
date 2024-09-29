import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface RazaInfo {
  [key: string]: {
    descripcion: string;
    caracteristicas: string[];
  };
}

const infoPeRazas: RazaInfo = {
  'Labrador': {
    descripcion: 'El Labrador Retriever es una raza de perro amigable y versátil, conocida por su inteligencia y disposición para complacer.',
    caracteristicas: ['Amigable', 'Inteligente', 'Activo', 'Buen nadador', 'Excelente con niños']
  },
  'Golden Retriever': {
    descripcion: 'El Golden Retriever es un perro leal y cariñoso, famoso por su pelaje dorado y su naturaleza gentil.',
    caracteristicas: ['Afectuoso', 'Inteligente', 'Paciente', 'Buen con familias', 'Fácil de entrenar']
  },
  'Pastor Alemán': {
    descripcion: 'El Pastor Alemán es una raza de perro de trabajo, conocida por su inteligencia, lealtad y versatilidad.',
    caracteristicas: ['Inteligente', 'Leal', 'Valiente', 'Protector', 'Versátil']
  },
  'Bulldog': {
    descripcion: 'El Bulldog es una raza de perro de aspecto distintivo, conocida por su temperamento amigable y su apariencia arrugada.',
    caracteristicas: ['Amigable', 'Valiente', 'Calmado', 'Leal', 'Bueno con niños']
  },
  'Poodle': {
    descripcion: 'El Poodle es una raza de perro inteligente y elegante, conocida por su pelaje rizado y su versatilidad en diferentes tamaños.',
    caracteristicas: ['Inteligente', 'Activo', 'Fácil de entrenar', 'Hipoalergénico', 'Elegante']
  },
};

const infoGaRazas: RazaInfo = {
  'Siamés': {
    descripcion: 'El gato Siamés es conocido por su cuerpo esbelto, cara distintiva y personalidad vocal y afectuosa.',
    caracteristicas: ['Vocal', 'Inteligente', 'Afectuoso', 'Activo', 'Social']
  },
  'Persa': {
    descripcion: 'El gato Persa es famoso por su pelaje largo y lujoso, cara achatada y temperamento tranquilo.',
    caracteristicas: ['Tranquilo', 'Afectuoso', 'Pelaje largo', 'Cara achatada', 'Poco activo']
  },
  'Maine Coon': {
    descripcion: 'El Maine Coon es una de las razas de gatos más grandes, conocida por su pelaje abundante y personalidad amigable.',
    caracteristicas: ['Grande', 'Amigable', 'Inteligente', 'Pelaje largo', 'Bueno con familias']
  },
  'Bengalí': {
    descripcion: 'El gato Bengalí es conocido por su apariencia salvaje que recuerda a un leopardo en miniatura y su personalidad activa.',
    caracteristicas: ['Activo', 'Inteligente', 'Juguetón', 'Apariencia salvaje', 'Amante del agua']
  },
  'Sphynx': {
    descripcion: 'El Sphynx es famoso por su falta de pelaje, piel arrugada y personalidad cariñosa y enérgica.',
    caracteristicas: ['Sin pelo', 'Cariñoso', 'Enérgico', 'Inteligente', 'Necesita cuidados especiales']
  },
};

const RazaInfo: React.FC = () => {
  const { tipo, raza } = useLocalSearchParams<{ tipo: string; raza: string }>();

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
      <Text style={styles.title}>{raza}</Text>
      <Text style={styles.description}>{razaInfo.descripcion}</Text>
      <Text style={styles.subtitle}>Características principales:</Text>
      {razaInfo.caracteristicas.map((caracteristica, index) => (
        <Text key={index} style={styles.caracteristica}>• {caracteristica}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  caracteristica: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default RazaInfo;