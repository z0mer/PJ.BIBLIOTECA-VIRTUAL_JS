import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Image,
} from 'react-native';

class PaginaLogado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      hoveredButton: null,
    };
  }

  handlePress = (screen) => {
    Vibration.vibrate(100); // Vibra por 100ms
    this.props.navigation.navigate(screen);
  };

  handleMouseEnter = (buttonName) => {
    this.setState({ hoveredButton: buttonName });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredButton: null });
  };

  render() {
    const { hoveredButton } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'BIBLIOTECA CARAVAL'}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/3.png')} style={styles.image} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              hoveredButton === 'Biblioteca' && styles.buttonHover,
            ]}
            onPress={() => this.handlePress('Biblioteca')}
            onMouseEnter={() => this.handleMouseEnter('Biblioteca')}
            onMouseLeave={this.handleMouseLeave}>
            <Text style={styles.buttonText}>Biblioteca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              hoveredButton === 'TBR' && styles.buttonHover,
            ]}
            onPress={() => this.handlePress('TBR')}
            onMouseEnter={() => this.handleMouseEnter('TBR')}
            onMouseLeave={this.handleMouseLeave}>
            <Text style={styles.buttonText}>TBR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.backButton,
              hoveredButton === 'Sair' && styles.buttonHoverr,
            ]}
            onPress={() => this.handlePress('Login')}
            onMouseEnter={() => this.handleMouseEnter('Sair')}
            onMouseLeave={this.handleMouseLeave}>
            <Text style={[styles.buttonText, styles.backButtonText]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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

export default PaginaLogado;
