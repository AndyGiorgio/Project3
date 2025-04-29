import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { decode } from 'html-entities';

const categoryLinks = {
    Math: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=19&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=19&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=19&difficulty=hard&type=multiple',
    },
    Science: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=17&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=17&difficulty=hard&type=multiple',
    },
    History: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=23&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=23&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=23&difficulty=hard&type=multiple',
    },
    Geography: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=22&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=22&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=22&difficulty=hard&type=multiple',
    },
    Sports: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=21&difficulty=hard&type=multiple',
    },
    General: {
      Easy: 'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple',
      Medium: 'https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple',
      Hard: 'https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple',
    }
  };

const Questions = ({ route, navigation }) => {
  const difficulty = route.params.difficulty || route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(route.params?.score || 0);
  const [highScore, setHighScore] = useState(route.params?.highScore);
  const [strikes, setStrikes] = useState(route.params?.strikes || 0);
  const [gameOver, setGameOver] = useState(false);

  const highScore1 = route.params?.highScore1;
  const highScore2 = route.params?.highScore2;
  const highScore3 = route.params?.highScore3;

  //fischer yates algorithm
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  async function getQuestion() {
    if (gameOver) return;

    setSelectedAnswer(null);

    const selectedDifficulty = route.params.difficulty || route.params;
    const selectedCategory = route.params.category || route.params;
    const url = categoryLinks[selectedCategory][selectedDifficulty];

    if (!url) {
      console.error('No URL for selected category:', selectedCategory);
      return;
    }

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.response_code !== 0 || !json.results || json.results.length === 0) {
        console.error('Error fetching question');
        return;
      }

      const data = json.results[0];
      setQuestion(decode(data.question));
      setAnswer(decode(data.correct_answer));

      const decodedIncorrect = data.incorrect_answers.map(ans => decode(ans));
      const combinedChoices = [...decodedIncorrect, decode(data.correct_answer)];
      const shuffledChoices = shuffleArray(combinedChoices);
      setChoices(shuffledChoices);

    } catch (error) {
      console.error('Error fetching question:', error);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    if (gameOver) {
      navigation.navigate('GameOver', {difficulty, highScore, highScore1, highScore2, highScore3,});
    }
  }, [gameOver]);

  function handleSelect(choice) {
    if (selectedAnswer !== null || gameOver) return;

    setSelectedAnswer(choice);

    if (choice === answer) {
      setScore(prev => prev + 1);
    } else {
      setStrikes(prev => {
        const newStrikes = prev + 1;
        if (newStrikes >= 3) {
          setGameOver(true);
        }
        return newStrikes;
      });
    }
  }

    if (score>highScore) {
      setHighScore(score)
    }

  const getButtonStyle = (choice) => {
    if (!selectedAnswer) {
      return styles.choiceButton;
    }
    if (choice === answer) {
      return [styles.choiceButton, styles.correctAnswer];
    }
    if (choice === selectedAnswer) {
      return [styles.choiceButton, styles.wrongAnswer];
    }
    return styles.choiceButton;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.scoreText}>Score: {score} | Strikes: {strikes}</Text>
      <Text style={styles.questionText}>{gameOver ? "Game Over! 🛑" : question}</Text>

      <FlatList
        data={choices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={gameOver}
            onPress={() => handleSelect(item)}
            style={getButtonStyle(item)}
          >
            <Text style={styles.choiceText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedAnswer && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('ListOfCategories', { difficulty, highScore, highScore1, highScore2, highScore3, score, strikes })}
        >
          <Text style={styles.backButtonText}>Back to Categories</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  choiceButton: {
    backgroundColor: 'purple',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  choiceText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
  backButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Questions;
