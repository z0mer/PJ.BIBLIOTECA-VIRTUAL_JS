import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import firebase from '../config/config';

const Estante = ({ navigation }) => {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userId = user.uid;
          const database = firebase.database();
          const livrosRef = database.ref(`usuarios/${userId}/tbr`);
          livrosRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const livros = Object.values(data);
              setLivros(livros);
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar os livros: ', error);
      }
    };

    carregarLivros();

    return () => {};
  }, []);

  const verDetalhesLivro = (livro) => {
    setLivroSelecionado(livro);
  };

  const fecharDetalhesLivro = () => {
    setLivroSelecionado(null);
  };

  const handleMouseEnter = (buttonName) => setHoveredButton(buttonName);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'Estante:'}</Text>
        </View>
      <FlatList
        data={livros}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => verDetalhesLivro(item)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.nome} - {item.autor}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal
        visible={livroSelecionado !== null}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={fecharDetalhesLivro}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
            {livroSelecionado && (
              <View style={styles.detalhesContainer}>
                <Text style={styles.detalhesTitle}>Detalhes do Livro:</Text>
                <Text>Nome: {livroSelecionado.nome}</Text>
                <Text>Autor: {livroSelecionado.autor}</Text>
                <Text>Quantidade de páginas: {livroSelecionado.paginas}</Text>
                <Text>Gênero: {livroSelecionado.genero}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={[
          styles.button,
          styles.backButton,
          hoveredButton === 'TBR' && styles.buttonHoverr,
        ]}
        onPress={() => navigation.navigate('TBR')}
        onHideUnderlay={handleMouseLeave}
        onShowUnderlay={() => handleMouseEnter('TBR')}>
        <Text style={[styles.buttonText, styles.backButtonText]}>
          Voltar - Menu
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '10%', 
    backgroundColor: '#E0D4F8',
  },
  title: {
    fontSize: 22,
    color: 'black',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  detalhesContainer: {
    marginTop: 10,
  },
  detalhesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#024053',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonHoverr: {
    backgroundColor: '#012A39',
  },
});

export default Estante;
