import React from 'react';
import { Text, View } from 'react-native';

const DetalhesLivro = ({ route }) => {
    const { livro } = route.params;

    return (
        <View>
            <Text>Detalhes do Livro:</Text>
            <Text>Nome: {livro.nome}</Text>
            <Text>Autor: {livro.autor}</Text>
            <Text>Mês: {livro.mes}</Text>
            <Text>Qtde. Páginas: {livro.paginas}</Text>
            <Text>Nota: {livro.nota}</Text>
        </View>
    );
};

export default DetalhesLivro;
