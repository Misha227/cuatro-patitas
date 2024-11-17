import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Pet {
  created_at: string;
  edad: string;
  id: number;
  nombre: string;
  peso: string;
  raza: string;
  tipo: string;
  tipo_comida: string;
}

interface RazaInfo {
  [key: string]: {
    descripcion: string;
    caracteristicas: string[];
    imagen: string;
  };
}

const infoPeRazas: RazaInfo = {
  'Labrador': {
    descripcion: 'El Labrador Retriever es una raza de perro amigable y versátil, conocida por su inteligencia y disposición para complacer.',
    caracteristicas: ['Amigable', 'Inteligente', 'Activo', 'Buen nadador', 'Excelente con niños'],
    imagen: 'https://example.com/labrador.jpg',
  },
};

const RazaInfo: React.FC = () => {
  const route = useRoute();
  const { petId } = route.params as { petId: number };
  const [pet, setPet] = useState<Pet | null>(null);
  const [razaInfo, setRazaInfo] = useState<typeof infoPeRazas[keyof typeof infoPeRazas] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/mascotas/${petId}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug log

        // Check if data is directly the pet object
        const petData = data.pet || data;
        console.log('Pet Data:', petData); // Debug log

        if (!petData || !petData.raza) {
          throw new Error('Invalid pet data structure');
        }

        setPet(petData);
        
        // Get the breed info based on the pet's breed
        if (petData.raza in infoPeRazas) {
          setRazaInfo(infoPeRazas[petData.raza]);
        } else {
          console.log(`Breed ${petData.raza} not found in infoPeRazas`); // Debug log
        }
      } catch (err: any) {
        console.error('Error:', err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPetData();
  }, [petId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: {error}</Text>
      </View>
    );
  }

  if (!pet || !razaInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Información no disponible para esta raza</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: razaInfo.imagen }} style={styles.petImage} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{pet.nombre} - {pet.raza}</Text>
        <View style={styles.premiumFeatures}>
          <Text style={styles.premiumTitle}>Características:</Text>
          {razaInfo.caracteristicas.map((caracteristica, index) => (
            <Text key={index} style={styles.caracteristica}>• {caracteristica}</Text>
          ))}
        </View>
        <View style={styles.exportData}>
          <Text style={styles.exportTitle}>¿Cómo es esta raza?</Text>
          <Text style={styles.description}>{razaInfo.descripcion}</Text>
        </View>
        <Button title="Siguiente" onPress={() => {/* Handle next action */}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#dcdcdc',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 10,
  },
  premiumFeatures: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 10,
  },
  caracteristica: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  exportData: {
    marginBottom: 15,
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
});

export default RazaInfo;