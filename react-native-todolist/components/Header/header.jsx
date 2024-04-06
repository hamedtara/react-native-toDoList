import React from 'react';
import { Text } from 'react-native';
import { s } from './header.style';
import { Image } from 'react-native';
import logoImage from "../../assets/logo.png"
export function Header() {
    return<>
    <Image style = {s.image}  source={logoImage} resizeMode='contain'/>
    <Text style={s.subtitle}>You Have Something To Do!</Text>
    </>
  
}