import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../config/config';

const ListarItens = ({ navigation }) => {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const user = firebase.auth().currentUser;
                if (user) {
                    const userId = user.uid;
                    const database = firebase.database();
                    const livrosRef = database.ref(`usuarios/${userId}/livros`);
                    livrosRef.on('value', (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            const listaLivros = Object.values(data);
                            setLivros(listaLivros);
                        }
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar os livros: ', error);
            }
        };

        carregarLivros();

        return () => {
            // Cleanup logic, if necessary
        };
    }, []);

    const verDetalhesLivro = (livro) => {
        navigation.navigate('DetalhesLivro', { livro });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Livros:</Text>
            <FlatList
                data={livros}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => verDetalhesLivro(item)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.nome} - {item.autor}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
    },
});

export default ListarItens;
