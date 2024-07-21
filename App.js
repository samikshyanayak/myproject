//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';

//export default function App() 
import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [currentPage, setCurrentPage] = useState('GettingStarted');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Implement your signup logic here
    setError('');
    setCurrentPage('Login');
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Implement your login logic here
    setError('');
    setIsAuthenticated(true);
    setCurrentPage('Dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setCurrentPage('GettingStarted');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'GettingStarted':
        return (
          <View style={styles.container}>
            <Button title="Sign Up" onPress={() => setCurrentPage('Signup')} />
            <TouchableOpacity onPress={() => setCurrentPage('Login')}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Signup':
      case 'Login':
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button
              title={currentPage === 'Signup' ? 'Sign Up' : 'Login'}
              onPress={currentPage === 'Signup' ? handleSignup : handleLogin}
            />
            <TouchableOpacity onPress={() => setCurrentPage(currentPage === 'Signup' ? 'Login' : 'Signup')}>
              <Text style={styles.link}>
                {currentPage === 'Signup' ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'Dashboard':
        return (
          <View style={styles.container}>
            <Text>Welcome to the Dashboard!</Text>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        );
      default:
        return null;
    }
  };

  return renderPage();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    color: 'black',
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default App;