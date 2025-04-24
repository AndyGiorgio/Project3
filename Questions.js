import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button} from 'react-native';

const Questions = ({ route, navigation }) => {
    //const { title, releaseYear } = route.params;
    console.log(route.params);


  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");    
  const [wrongAns, setWrong] = useState("");

  
  function getMathQuestion() {
       
  fetch('https://opentdb.com/api.php?amount=1&category=19&type=multiple')
    .then((response) => response.json())
    .then((json) => {  

      console.log(json);      

      const data = json.results[0]; 
      setQuestion(data.question);
      setAnswer(data.correct_answer);
      setWrong(data.incorrect_answers);

    })
    .catch((error) => {
       console.error(error);
    });
  };
  
  return (
    <View style={styles.container}>
      <Text>{question}</Text>
      <Text>{answer}</Text>
      <Text>{wrongAns}</Text>
      <Button title="Submit" onPress={()=>getMathQuestion()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Questions;