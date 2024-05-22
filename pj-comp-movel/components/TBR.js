import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TBR = ({ navigation }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => setHoveredButton(buttonName);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'TO BE READ'}</Text>
        </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/2.png')} style={styles.image} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            hoveredButton === 'CadastrarTBR' && styles.buttonHover,
          ]}
          onPress={() => navigation.navigate('CadastrarTBR')}
          onMouseEnter={() => handleMouseEnter('CadastrarTBR')}
          onMouseLeave={handleMouseLeave}>
          <Text style={styles.buttonText}>Cadastrar Leitura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            hoveredButton === 'EstanteTBR' && styles.buttonHover,
          ]}
          onPress={() => navigation.navigate('EstanteTBR')}
          onMouseEnter={() => handleMouseEnter('EstanteTBR')}
          onMouseLeave={handleMouseLeave}>
          <Text style={styles.buttonText}>Estante</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.backButton,
            hoveredButton === 'PaginaLogado' && styles.buttonHoverr,
          ]}
          onPress={() => navigation.navigate('PaginaLogado')}
          onMouseEnter={() => handleMouseEnter('PaginaLogado')}
          onMouseLeave={handleMouseLeave}>
          <Text style={[styles.buttonText, styles.backButtonText]}>
            Voltar - Menu
          </Text>
        </TouchableOpacity>
      </View>
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
  buttonsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#968ECC',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 330,
    height: 280,
    resizeMode: 'contain',
  },
});

export default TBR;
