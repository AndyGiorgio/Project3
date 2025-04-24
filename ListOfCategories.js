import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';

const ListOfCategories = ({ route, navigation }) => {

const startingDataSource = [
    { category: "Math" },
    { category: "Science" },
    { category: "History" },
    { category: "Geography" },
  ];

  const [categories, setCategory] = useState("");
         
  return (
    <View style={styles.container}>
                <FlatList
                data={startingDataSource}
                renderItem={({item}) => 
                <TouchableOpacity onPress={() => navigation.navigate('Questions', item.category)}>
                  <View style={styles.border}>
                    <Text style={styles.item}>{item.category}</Text>
                  </View>
                </TouchableOpacity>
                } />
            </View>
  );
}


const styles = StyleSheet.create({
    container: {
     paddingTop: 50,
     flex: 1,
     backgroundColor: "white",
    },
    item: {
      padding: 10,
      fontSize: 24,
      height: 54,
    },
    border: {
      borderWidth: 1,
      borderColor: "gray",
    }
  });  

export default ListOfCategories;
