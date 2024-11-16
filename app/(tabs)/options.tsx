import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

interface OptionCardProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Icon name={icon} size={32} color="white" />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const Options: React.FC = () => {
  const router = useRouter();

  const options = [
    {
      title: 'Calendario',
      icon: 'calendar-month',
      color: '#4CAF50',
      onPress: () => router.push('/calendar'),
    },
    {
      title: 'Vacunas',
      icon: 'needle',
      color: '#2196F3',
      onPress: () => router.push('/vaccines'),
    },
    {
      title: 'Baño',
      icon: 'shower',
      color: '#9C27B0',
      onPress: () => router.push('/bath'),
    },
    {
      title: 'Cómo bañar a tu mascota',
      icon: 'dog-service',
      color: '#FF9800',
      onPress: () => router.push('/bath-guide'),
    },
    {
      title: 'Entrenamiento',
      icon: 'school',
      color: '#E91E63',
      onPress: () => router.push('/training-guide'),
    },
    {
      title: 'Salud',
      icon: 'heart-pulse',
  
      onPress: () => router.push('/health'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="paw" size={40} color="#4CAF50" />
        <Text style={styles.title}>Cuatro Patitas</Text>
        <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <OptionCard
            key={index}
            title={option.title}
            icon={option.icon}
            color={option.color}
            onPress={option.onPress}
          />
        ))}
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
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6a6a6a',
    marginTop: 5,
  },
  optionsContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a4a4a',
    textAlign: 'center',
  },
});

export default Options;