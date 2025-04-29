import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ListOfCategories = ({ navigation, route }) => {
  const { difficulty } = route.params;

  const categorys = [
    {category: "Math"},
    {category: "Science"},
    {category: "History"},
    {category: "Geography"},
    {category: "Sports"},
    {category: "General"}
  ];

  const highScore1 = route.params?.highScore1;
  const highScore2 = route.params?.highScore2;
  const highScore3 = route.params?.highScore3;

  const score = route.params?.score || 0;
  const highScore = route.params?.highScore || 0;
  const strikes = route.params?.strikes || 0;

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score} | Strikes: {strikes}</Text>
      <Text style={styles.title}>Choose a Category</Text>

      <FlatList
        data={categorys}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <View style={styles.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Questions', { category: item.category, difficulty, highScore, highScore1, highScore2, highScore3, score, strikes })}
            >
              <Text style={styles.itemText}>{item.category}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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

export default ListOfCategories;
