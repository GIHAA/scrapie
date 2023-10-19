import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { View } from 'react-native-animatable'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <View style={{ marginTop: 20 , height: 20}}> 

      </View>
      <Header>Welcome Scrapie</Header>
      <Paragraph>
      Empowering Eco-Warriors, One Recycle at a Time.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login')}
      >
        Get started
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
      >
        Sign Up
      </Button> */}
    </Background>
  )
}
