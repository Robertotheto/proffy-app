import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const [week_day, setWeekDay] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handlerFiltersSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              value={subject}
              onChangeText={text => setSubject(text)}
              style={styles.input} 
              placeholder="Qual a matéria?" 
              placeholderTextColor="#C1BCCC"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  style={styles.input} 
                  placeholder="Qual o dia?" 
                  placeholderTextColor="#C1BCCC"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  value={time}
                  onChangeText={text => setTime(text)}
                  style={styles.input} 
                  placeholder="Qual horário?" 
                  placeholderTextColor="#C1BCCC"
                />
              </View>
            </View>

            <RectButton onPress={handlerFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 130,
        }}
      >
        {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
      </ScrollView>
    </View>
  );
}

export default TeacherList;