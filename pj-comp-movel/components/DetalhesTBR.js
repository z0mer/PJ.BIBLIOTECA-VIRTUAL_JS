import React from 'react';
import { Text, View } from 'react-native';

const DetalhesLivro = ({ route }) => {
    const { livro } = route.params;

    return (
        <View>
            <Text>Detalhes do Livro:</Text>
            <Text>Nome: {livro.nome}</Text>
            <Text>Autor: {livro.autor}</Text>
            <Text>Qtde. Páginas: {livro.paginas}</Text>
            <Text>Gênero: {livro.genero}</Text>
        </View>
    );
};

export default DetalhesLivro;
