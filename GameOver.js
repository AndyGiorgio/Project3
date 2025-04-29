import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GameOver = ({ navigation, route }) => {
    const HomePage = "Home Page";

    const difficulty = route.params.difficulty || route.params;

    highScore1 = route.params?.highScore1;
    highScore2 = route.params?.highScore2;
    highScore3 = route.params?.highScore3;
    highScore = route.params?.highScore;

    if(difficulty == 'Easy' && highScore > highScore1) {
        highScore1 = highScore;
    }
    if(difficulty == 'Medium' && highScore > highScore2) {
        highScore2 = highScore;
    }
    if(difficulty == 'Hard' && highScore > highScore3) {
        highScore3 = highScore;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.itemText}>Click below to return home:</Text>
      <TouchableOpacity
        style={styles.border}
        onPress={() => navigation.navigate('HomePage', {highScore1, highScore2, highScore3})}
    >
      <Text style={styles.itemText}>Home</Text>
    </TouchableOpacity>
    <Text style={styles.scoreText}></Text>
    <Text style={styles.scoreText}>High Scores:</Text>
    <Text style={styles.scoreText}>Easy: {highScore1}</Text>
    <Text style={styles.scoreText}>Medium: {highScore2}</Text>
    <Text style={styles.scoreText}>Hard: {highScore3}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
    textAlign: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: "red",
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
    color: 'white',
  },
  separator: {
    height: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default GameOver;