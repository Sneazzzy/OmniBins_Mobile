import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const PRIMARY_GREEN = '#00a63e';

const LoginPage = ({ onLogin }) => {

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.LoginLogo}>
        <Image
          source={require('../assets/omni.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.headerTitle}>OMNIBINS</Text>
      <Text style={styles.subTitle}>Please sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#000000"
      />

      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  LoginLogo: {
    width: 190,
    height: 190,
    backgroundColor: '#ffffff',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,


  },
  logoImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',

  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0c0c0c',
    marginBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#7f8fa6',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f6f6f2',
    color: '#000000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#191a1c',
    width: '100%',
  },
  loginButton: {
    backgroundColor: PRIMARY_GREEN,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default LoginPage;
