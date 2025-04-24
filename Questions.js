import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button} from 'react-native';


export default function MathQuestions() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");    
  const [wrongAns, setWrong] = useState("");

  function getMathQuestion() {
       
  fetch('https://opentdb.com/api.php?amount=1&category=19&type=multiple')
    .then((response) => response.json())
    .then((json) => {  
      /* view the JSON that's returned in the server log */ 
      console.log(json);      
      /* use dot notation to get the setup and punchline and update the state variables */
      const data = json.results[0]; // Access the first item in the results array
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