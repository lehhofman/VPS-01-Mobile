import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, where, query, onSnapshot, addDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 

const storage = getStorage();

export default function EntriesListScreen({ navigation }) {
    const [entries, setEntries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: '',
        description: '',
        date: new Date(),
        location: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false); 

    useEffect(() => {
        if (auth.currentUser) {
            const q = query(
                collection(db, 'entries'),
                where('userId', '==', auth.currentUser.uid)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const entriesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEntries(entriesData);
            });
            return unsubscribe;
        }
    }, []);

    const handleAddEntry = async () => {
        if (!newEntry.title || !newEntry.description || !newEntry.date || !newEntry.location) {
            Alert.alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            setLoading(true);
            let imageUrl = newEntry.image;

            if (newEntry.image && !newEntry.image.startsWith('http')) {
                const storageRef = ref(storage, `images/${Date.now()}-${newEntry.title}.jpg`);
                const response = await fetch(newEntry.image);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                await uploadBytes(storageRef, blob);
                imageUrl = await getDownloadURL(storageRef);
            }

            const entryData = {
                title: newEntry.title,
                description: newEntry.description,
                date: newEntry.date.toISOString(),
                location: newEntry.location,
                userId: auth.currentUser.uid,
                image: imageUrl,
            };

            await addDoc(collection(db, 'entries'), entryData);
            Alert.alert('Entrada salva com sucesso!');
            setModalVisible(false);
            setNewEntry({ title: '', description: '', date: new Date(), location: '', image: null });
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert('Erro ao salvar a entrada. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const chooseImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Seleção de imagem cancelada');
            } else if (response.error) {
                console.log('Erro ao selecionar imagem: ', response.error);
            } else {
                const source = response.assets[0].uri;
                setNewEntry({ ...newEntry, image: source });
            }
        });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || newEntry.date;
        setShowDatePicker(false);
        setNewEntry({ ...newEntry, date: currentDate });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titlee}>Diary Travel</Text> 
            <FlatList
                data={entries}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Visualizar Entrada', { entry: item })}
                    >
                        {item.image && <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />}
                        <Text style={styles.title}>{item.title} - {item.location}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                )}
            />

            <Button title="Adicionar Viagem" onPress={() => setModalVisible(true)} color="#511c8c" />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <TextInput
                        placeholder="Title"
                        value={newEntry.title}
                        onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={newEntry.description}
                        onChangeText={(text) => setNewEntry({ ...newEntry, description: text })}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                        <Text>{newEntry.date.toLocaleDateString()}</Text> 
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={newEntry.date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput
                        placeholder="Location"
                        value={newEntry.location}
                        onChangeText={(text) => setNewEntry({ ...newEntry, location: text })}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.imageButton} onPress={chooseImage}>
                        <Text style={styles.imageButtonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    {newEntry.image && <Image source={{ uri: newEntry.image }} style={styles.previewImage} />}
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleAddEntry} disabled={loading}>
                            <Text style={styles.buttonText}>Save Entry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#333', 
    },
    title: { 
        fontSize: 24,
        fontWeight: 'bold',
        color: '#511c8c',
        textAlign: 'center',
        marginTop:10,
    },
    titlee: { 
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop:10,
    },
    card: {
        backgroundColor: '#f5edf0', 
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center', 
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    description: {
        fontSize: 14,
        color: '#555', 
        marginVertical: 5,
        textAlign: 'center', 
    },
    date: {
        fontSize: 14,
        color: '#555',
    },
    location: {
        fontSize: 16,
        color: '#1e1a84', 
    },
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#333',
        borderColor: '#333',
        borderWidth: 1,
    },
    input: {
        backgroundColor: '#f5edf0',
        borderBottomWidth: 1,
        borderBottomColor: '#201c6d', 
        padding: 8,
        marginBottom: 10,
        fontSize: 16,
        color: '#333', 
    },
    previewImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginVertical: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#511c8c',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    imageButton: {
        backgroundColor: '#511c8c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    imageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
