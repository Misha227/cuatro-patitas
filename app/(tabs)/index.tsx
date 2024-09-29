import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TipoMascota = 'perro' | 'gato';
type TipoComida = 'seca' | 'humeda' | 'mixta';

interface Mascota {
  id: number;
  nombre: string;
  tipo: TipoMascota;
  raza: string;
  peso: string;
  edad: string;
  tipoComida: TipoComida;
}

const IngresoMascota: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<TipoMascota>('perro');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [tipoComida, setTipoComida] = useState<TipoComida>('seca');
  const router = useRouter();

  const handleSubmit = async () => {
    if (nombre.trim() === '' || raza === '' || peso === '' || edad === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const newPet: Mascota = {
      id: Date.now(),
      nombre: nombre.trim(),
      tipo,
      raza,
      peso,
      edad,
      tipoComida,
    };

    try {
      const existingPetsJson = await AsyncStorage.getItem('mascotas');
      let existingPets: Mascota[] = existingPetsJson ? JSON.parse(existingPetsJson) : [];
      existingPets.push(newPet);
      await AsyncStorage.setItem('mascotas', JSON.stringify(existingPets));

      Alert.alert('Éxito', 'Mascota guardada correctamente', [
        { text: 'OK', onPress: () => router.push(`/RazaInfo?tipo=${newPet.tipo}&raza=${newPet.raza}`) }
      ]);
    } catch (error) {
      console.error('Error al guardar la mascota:', error);
      Alert.alert('Error', 'No se pudo guardar la mascota. Por favor, intente de nuevo.');
    }
  };

  const razas = {
    perro: ['Labrador', 'Golden Retriever', 'Pastor Alemán', 'Bulldog', 'Poodle'],
    gato: ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'Sphynx'],
  };

  const pesos = ['<5', '5-10', '10-20', '>20'];
  const comidas: TipoComida[] = ['seca', 'humeda', 'mixta'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="paw" size={100} color="#4CAF50" style={styles.icon} />
      <Text style={styles.title}>Cuatro Patitas</Text>
      <Text style={styles.subtitle}>Ingreso de Mascota</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#888"
      />

      <Text style={styles.sectionTitle}>Tipo de mascota</Text>
      <RadioButton.Group onValueChange={value => setTipo(value as TipoMascota)} value={tipo}>
        <View style={styles.radioGroup}>
          <RadioButton.Item label="Perro 🐶" value="perro" />
          <RadioButton.Item label="Gato 🐱" value="gato" />
        </View>
      </RadioButton.Group>

      <Text style={styles.sectionTitle}>Raza</Text>
      <RadioButton.Group onValueChange={setRaza} value={raza}>
        <View style={styles.radioGroup}>
          {razas[tipo].map((raza) => (
            <RadioButton.Item key={raza} label={raza} value={raza} />
          ))}
        </View>
      </RadioButton.Group>

      <Text style={styles.sectionTitle}>Peso (kg)</Text>
      <RadioButton.Group onValueChange={setPeso} value={peso}>
        <View style={styles.radioGroup}>
          {pesos.map((peso) => (
            <RadioButton.Item key={peso} label={peso} value={peso} />
          ))}
        </View>
      </RadioButton.Group>

      <Text style={styles.sectionTitle}>Edad</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad (años)"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <Text style={styles.sectionTitle}>Tipo de comida</Text>
      <RadioButton.Group onValueChange={value => setTipoComida(value as TipoComida)} value={tipoComida}>
        <View style={styles.radioGroup}>
          {comidas.map((comida) => (
            <RadioButton.Item key={comida} label={comida.charAt(0).toUpperCase() + comida.slice(1)} value={comida} />
          ))}
        </View>
      </RadioButton.Group>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6a6a6a',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginTop: 10,
    marginBottom: 5,
  },
  radioGroup: {
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IngresoMascota;