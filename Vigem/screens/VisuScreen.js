import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ViewEntryScreen({ route }) {
  const { entry } = route.params;

  return (
    <View style={styles.container}>
      {entry.image && ( 
        <Image source={{ uri: entry.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text> 
      <Text style={styles.description}>{entry.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#333', 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f5edf0', 
  },
  date: {
    fontSize: 16,
    color: '#888', 
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#f5edf0', 
  },
});
