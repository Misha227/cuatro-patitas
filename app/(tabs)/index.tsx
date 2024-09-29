import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalSelector from 'react-native-modal-selector';

type TipoMascota = 'perro' | 'gato';
type TipoComida = 'seca' | 'humeda' | 'mixta';

const IngresoMascota: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [esPerro, setEsPerro] = useState(true);
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [tipoComida, setTipoComida] = useState<TipoComida>('seca');

  const handleSubmit = () => {
    const tipo: TipoMascota = esPerro ? 'perro' : 'gato';
    console.log({ nombre, tipo, peso, edad, tipoComida });
  };

  const pesoOptions = [
    { key: '0', label: 'Menos de 5 kg', value: '<5' },
    { key: '1', label: '5-10 kg', value: '5-10' },
    { key: '2', label: '10-20 kg', value: '10-20' },
    { key: '3', label: 'Más de 20 kg', value: '>20' },
  ];

  const tipoComidaOptions = [
    { key: '0', label: 'Comida seca', value: 'seca' },
    { key: '1', label: 'Comida húmeda', value: 'humeda' },
    { key: '2', label: 'Comida mixta', value: 'mixta' },
  ];

  return (
    <View style={styles.container}>
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

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>🐱 Gato</Text>
        <Switch
          value={esPerro}
          onValueChange={setEsPerro}
          thumbColor={esPerro ? "#4CAF50" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
        <Text style={styles.switchLabel}>🐶 Perro</Text>
      </View>

      <ModalSelector
        data={pesoOptions}
        initValue="Selecciona el peso"
        onChange={(option) => setPeso(option.value)}
        style={styles.modalSelector}
        selectStyle={styles.selector}
        selectTextStyle={styles.selectorText}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad (años)"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <ModalSelector
        data={tipoComidaOptions}
        initValue="Selecciona el tipo de comida"
        onChange={(option) => setTipoComida(option.value)}
        style={styles.modalSelector}
        selectStyle={styles.selector}
        selectTextStyle={styles.selectorText}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6a6a6a',
    marginBottom: 20,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  modalSelector: {
    width: '100%',
    marginBottom: 15,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 10,
    backgroundColor: 'white',
  },
  selectorText: {
    color: '#000',
    fontSize: 16,
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