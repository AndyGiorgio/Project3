import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';

const ListOfCategories = ({ route, navigation }) => {

const startingDataSource = [
    { category: "Math" },
    { category: "Science" },
    { categroy: "History" },
    { category: "Geography" },
  ];

  const [categories, setCategory] = useState(startingDataSource);
  useEffect(()=>{
        if(route.params){
          setCategory(categories.concat(json.categories));
        }
      }, [route.params]);
         
  return (
    <View style={styles.container}>
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={categories}
                renderItem={({item}) => 
                <TouchableOpacity onPress={() => navigation.navigate('Questions')}>
                  <View style={styles.border}>
                    <Text style={styles.item}>{item.title}</Text>
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
