import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Reminder {
  id: string;
  date: string;
  text: string;
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reminderText, setReminderText] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [markedDates, setMarkedDates] = useState({});

  const loadReminders = async (date: string) => {
    try {
      const storedReminders = await AsyncStorage.getItem(`reminders_${date}`);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      } else {
        setReminders([]);
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const saveReminder = async () => {
    if (!selectedDate || !reminderText.trim()) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      date: selectedDate,
      text: reminderText.trim(),
    };

    const updatedReminders = [...reminders, newReminder];
    try {
      await AsyncStorage.setItem(
        `reminders_${selectedDate}`,
        JSON.stringify(updatedReminders)
      );
      setReminders(updatedReminders);
      setReminderText('');

      // Actualizar días marcados
      setMarkedDates({
        ...markedDates,
        [selectedDate]: { marked: true, dotColor: '#4CAF50' }
      });
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const deleteReminder = async (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    try {
      await AsyncStorage.setItem(
        `reminders_${selectedDate}`,
        JSON.stringify(updatedReminders)
      );
      setReminders(updatedReminders);

      // Actualizar días marcados si no hay más recordatorios
      if (updatedReminders.length === 0) {
        const newMarkedDates = { ...markedDates };
        delete newMarkedDates[selectedDate];
        setMarkedDates(newMarkedDates);
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="calendar" size={40} color="#4CAF50" />
        <Text style={styles.title}>Calendario de Recordatorios</Text>
      </View>

      <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
          loadReminders(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...(markedDates[selectedDate] || {}),
            selected: true,
            selectedColor: '#4CAF50',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#4CAF50',
          todayTextColor: '#4CAF50',
          arrowColor: '#4CAF50',
        }}
      />

      {selectedDate && (
        <View style={styles.reminderContainer}>
          <Text style={styles.dateText}>
            Recordatorios para: {selectedDate}
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nuevo recordatorio"
              value={reminderText}
              onChangeText={setReminderText}
              multiline
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={saveReminder}
            >
              <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.remindersList}>
            {reminders.map(reminder => (
              <View key={reminder.id} style={styles.reminderItem}>
                <Text style={styles.reminderText}>{reminder.text}</Text>
                <TouchableOpacity
                  onPress={() => deleteReminder(reminder.id)}
                  style={styles.deleteButton}
                >
                  <Icon name="delete" size={24} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginTop: 10,
  },
  reminderContainer: {
    padding: 15,
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  remindersList: {
    flex: 1,
  },
  reminderItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reminderText: {
    flex: 1,
    fontSize: 16,
    color: '#4a4a4a',
  },
  deleteButton: {
    padding: 5,
  },
});

export default CalendarScreen;