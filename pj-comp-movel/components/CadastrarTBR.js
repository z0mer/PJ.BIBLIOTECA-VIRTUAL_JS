import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from '../config/config';

const CadastrarTBR = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [paginas, setPaginas] = useState('');
  const [genero, setGenero] = useState('');
  const [hoveredButton, setHoveredButton] = useState(null);

  const cadastrarLivro = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const database = firebase.database();
        const novoLivroRef = database.ref(`usuarios/${userId}/tbr`).push();
        await novoLivroRef.set({
          nome: nome,
          autor: autor,
          paginas: paginas,
          genero: genero,
        });
        Alert.alert('Livro cadastrado com sucesso!');
        setNome('');
        setAutor('');
        setPaginas('');
        setGenero('');
      } else {
        Alert.alert('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o livro: ', error);
      Alert.alert(
        'Erro ao cadastrar o livro. Por favor, tente novamente mais tarde.'
      );
    }
  };

  const handleMouseEnter = (buttonName) => setHoveredButton(buttonName);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do livro"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de páginas"
          keyboardType="numeric"
          value={paginas}
          onChangeText={setPaginas}
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />
        <TouchableOpacity
          style={[
            styles.button,
            hoveredButton === 'cadastrar' && styles.buttonHover,
          ]}
          onPress={cadastrarLivro}
          onMouseEnter={() => handleMouseEnter('cadastrar')}
          onMouseLeave={handleMouseLeave}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.backButton,
            hoveredButton === 'Biblioteca' && styles.buttonHoverr,
          ]}
          onPress={() => navigation.navigate('Biblioteca')}
          onMouseEnter={() => handleMouseEnter('Biblioteca')}
          onMouseLeave={handleMouseLeave}>
          <Text style={[styles.buttonText, styles.backButtonText]}>Voltar para Biblioteca</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#968ECC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf:'center',
  },
  button: {
    backgroundColor: '#968ECC',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '95%',
    alignSelf:'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  buttonHover: {
    backgroundColor: '#8A9FD4',
  },
  backButton: {
    backgroundColor: '#1E1740',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonHoverr: {
    backgroundColor: '#555B7E',
  },
});

export default CadastrarTBR;
