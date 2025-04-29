import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomePage = ({ navigation, route }) => {
  const difficulties = [
    {difficulty: "Easy"},
    {difficulty: "Medium"},
    {difficulty: "Hard"}
  ];

  const highScore1 = route.params?.highScore1 || 0;
  const highScore2 = route.params?.highScore2 || 0;
  const highScore3 = route.params?.highScore3 || 0;

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Trivia Central</Text>
      <Text style={styles.itemText}>Choose your difficulty:</Text>
      <FlatList
        data={difficulties}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <View style={styles.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListOfCategories', { difficulty: item.difficulty, highScore1, highScore2, highScore3 })}
            >
              <Text style={styles.itemText}>{item.difficulty}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.scoreText}>Easy Highscore: {highScore1}</Text>
      <Text style={styles.scoreText}>Medium Highscore: {highScore2}</Text>
      <Text style={styles.scoreText}>Hard Highscore: {highScore3}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
    textAlign: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 20,
    padding: 10,
    width: 300,
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    margin: 10,
  },
  separator: {
    height: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomePage;