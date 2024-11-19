import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, Image, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome6';

const App = () => {
  const [answers, setAnswers] = useState({});

  const data = [
    {
      title: 'Easy',
      bgColor: 'skyblue',
      icon: 'feather',
      data: [
        {
          question: 'What is the name of this object in Chinese?',
          image: 'https://tse3.mm.bing.net/th?id=OIP.pDdiPCoxwzqNRQV7b2lmXgHaEu&pid=Api&P=0&h=180',
          options: [
            { label: '苹果', value: '1' },
            { label: '橙子', value: '2' },
            { label: '西瓜', value: '3' },
          ],
          correctAnswer: '1',
          id: 'easy1',
        },
        {
          question: 'What is the name of this object in Chinese?',
          image: 'https://tse3.mm.bing.net/th?id=OIP.uIhwlZZiVPIh9nfUDRZk0wHaEK&pid=Api&P=0&h=180',
          options: [
            { label: '巴士', value: '4' },
            { label: '地铁', value: '5' },
            { label: '脚踏车', value: '6' },
          ],
          correctAnswer: '6',
          id: 'easy2',
        },
      ],
    },
    {
      title: 'Moderate',
      bgColor: 'green',
      icon: 'cloudflare',
      data: [
        {
          question: 'What is the name of this object in Chinese?',
          image: 'https://tse2.mm.bing.net/th?id=OIP.TDfQpX7oEOKBT-8ZPIkHlgHaEK&pid=Api&P=0&h=180',
          options: [
            { label: '电话', value: '7' },
            { label: '智能手机', value: '8' },
            { label: '手机', value: '9' },
          ],
          correctAnswer: '8',
          id: 'moderate1',
        },
        {
          question: 'What is the correct translation of "takeaway" in Chinese?',
          image: 'https://tse1.mm.bing.net/th?id=OIP.Qh-xHzv_Y1jNcLK4S32IxwHaEE&pid=Api&P=0&h=180',
          options: [
            { label: '打包', value: '9' },
            { label: '回家吃', value: '10' },
            { label: '拿走', value: '11' },
          ],
          correctAnswer: '9',
          id: 'moderate2',
        },
      ],
    },
    {
      title: 'Hard',
      bgColor: 'purple',
      icon: 'sun',
      data: [
        {
          question: 'What is the name of this object in Chinese?',
          image: 'https://img.alicdn.com/bao/uploaded/i4/897609396/TB2JmDvbcD85uJjSZFpXXXz3VXa_!!897609396.jpg',
          options: [
            { label: '充电宝', value: '12' },
            { label: '电池', value: '13' },
            { label: '电量银行', value: '14' },
          ],
          correctAnswer: '12',
          id: 'hard1',
        },
        {
          question: 'What is the name of this animal in Chinese?',
          image: 'https://tse4.mm.bing.net/th?id=OIP.fGLrIwMyt3rE4-UTMySRjwHaHS&pid=Api&P=0&h=180',
          options: [
            { label: '海豚', value: '15' },
            { label: '海狮', value: '16' },
            { label: '海豹', value: '17' },
          ],
          correctAnswer: '17',
          id: 'hard2',
        },
      ],
    },
  ];

  // Handle answer selection
  const handleAnswerChange = (value, questionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Validate answers
  const handleSubmit = () => {
    let score = 0;
    data.forEach((section) => {
      section.data.forEach((item) => {
        if (answers[item.id] === item.correctAnswer) {
          score++;
        }
      });
    });

    Alert.alert(`You scored ${score} out of ${data.flatMap((s) => s.data).length}`);
  };

  return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="school" size={24} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerText}>Chinese Challenge</Text>
        </View>

        {/* Question List */}
        <SectionList
            sections={data}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title, bgColor, icon } }) => (
                <View style={[styles.sectionHeader, { backgroundColor: bgColor }]}>
                  <Icon name={icon} size={20} color="#fff" style={styles.sectionIcon} />
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <View style={styles.questionContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.questionText}>{item.question}</Text>
                  <RNPickerSelect
                      onValueChange={(value) => handleAnswerChange(value, item.id)}
                      items={item.options}
                      style={pickerSelectStyles}
                  />
                </View>
            )}
        />

        {/* Submit Button */}
        <View style={styles.submitButton}>
          <Button title="Submit" onPress={handleSubmit} color="#FF6347" />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#4C956C',
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF5E1',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  submitButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
};

export default App;
