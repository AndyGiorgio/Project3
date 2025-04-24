import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';

const ListOfCategories = ({ route, navigation }) => {

const categorys = [
    { category: "Math" },
    { category: "Science" },
    { category: "History" },
    { category: "Geography" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={categorys}
        renderItem={({item}) =>   
          <View style = {styles.border}>
            <TouchableOpacity onPress={()=>navigation.navigate("Questions",item.category)}>
            <Text style={styles.itemText}>{item.category} </Text>
            </TouchableOpacity>
          </View> 
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
     paddingTop: 50,
     flex: 1,
     backgroundColor: "white",
     marginVertical: 100
    },
    item: {
      padding: 10,
      fontSize: 24,
      height: 54,
    },
    border: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 40
    },
    itemText: {
      fontSize: 40,
      color: '#333',
      textAlign: 'center',
      margin: 20,
    }
  });  

export default ListOfCategories;
