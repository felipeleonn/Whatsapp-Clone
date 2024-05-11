import { Link } from 'expo-router'
import React from 'react'
import { View,Text, StyleSheet,Image, TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'


const Page = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/welcome.png")} style={styles.welcome} />
      <Text style={styles.headline}>Welcome to WhatsApp Clone</Text>
      <Text style={styles.description}>
        Read Our{' '}
        <Text style={styles.link}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the '}
        <Text style={styles.link}>
          Terms of Service
        </Text>
      </Text>
      {/* replace hace que no puedas ir para atras */}
      <Link  href="/otp" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },
    welcome: {
      width: "100%",
      height: 300,
      marginBottom: 80,
    },
    headline: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 80,
      color: Colors.gray
    },
    link: {
      color: Colors.primary
    },
    button: {
      width: "100%",
      alignItems: "center", 
    },
    buttonText: {
      fontSize: 22,
      color: Colors.primary,
      fontWeight: "bold"
    }
  }
);