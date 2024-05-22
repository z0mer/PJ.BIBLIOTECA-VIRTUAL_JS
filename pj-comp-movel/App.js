import * as React from 'react';
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaLogado from './components/PaginaLogado';
import Biblioteca from './components/Biblioteca';
import TBR from './components/TBR';
import CadastrarLeitura from './components/CadastrarLeitura';
import Estante from './components/Estante';
import EstanteTBR from './components/EstanteTBR';
import CadastrarTBR from './components/CadastrarTBR';
//import ListarItens from './components/ListarItens';
import firebase from './config/config';

const Navegacao1 = createBottomTabNavigator();
const Navegacao2 = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navegacao2.Navigator>
        <Navegacao2.Screen
          name="Login"
          component={NavTab}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="PaginaLogado"
          component={PaginaLogado}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="Biblioteca"
          component={Biblioteca}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="TBR"
          component={TBR}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="CadastrarLeitura"
          component={CadastrarLeitura}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="Estante"
          component={Estante}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="CadastrarTBR"
          component={CadastrarTBR}
          options={{ headerShown: false }}
        />
        <Navegacao2.Screen
          name="EstanteTBR"
          component={EstanteTBR}
          options={{ headerShown: false }}
        />
      </Navegacao2.Navigator>
    </NavigationContainer>
  );
}

function NavTab() {
  return (
    <Navegacao1.Navigator>
      <Navegacao1.Screen
        name="Login"
        component={Principal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Navegacao1.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-details"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Navegacao1.Navigator>
  );
}

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
    };
  }

  gravar() {
    const email = this.state.mail.toLowerCase();
    const password = this.state.password.toLowerCase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        Vibration.vibrate(100);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          console.log('Esse email já está em uso');
          Alert.alert('Erro', 'Esse email já está em uso');
        } else if (errorCode === 'auth/weak-password') {
          console.log('Senha fraca');
          Alert.alert('Erro', 'Senha fraca, digite outra senha');
        } else if (errorCode === 'auth/invalid-email') {
          console.log('Formato do email invalido');
          Alert.alert('Erro', 'Formato do email invalido');
        } else {
          console.log('Erro Desconhecido');
          Alert.alert('Erro', 'Ocorreu um erro' + error);
        }
      });
  }

  render() {
    return (
      <View>
        <Text style={styles.texto}>E-mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ mail: texto })}
        />
        <Text style={styles.texto}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ password: texto })}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.gravar()}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      senha: '',
    };
  }

  ler() {
    const email = this.state.mail.toLowerCase();
    const password = this.state.senha.toLowerCase();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Vibration.vibrate(100);
        Alert.alert('Logado!!!', 'Login realizado com sucesso!');
        this.props.navigation.navigate('PaginaLogado', {
          email: this.state.mail,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          console.log('Formato do email invalido');
          alert('Formato do email invalido');
        } else {
          console.log('Erro Desconhecido');
          alert('Ocorreu um erro');
        }
      });
  }

  render() {
    return (
      <View>
        <Text style={styles.texto}>E-mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ mail: texto })}
        />
        <Text style={styles.texto}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ senha: texto })}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.ler()}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  texto: {
    color: '#968ECC',
    fontSize: 20,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 20,
    borderColor: '#968ECC',
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#8A9FD4',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});