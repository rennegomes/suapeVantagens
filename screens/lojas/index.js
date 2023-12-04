import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoHorizontal from "../../assets/imgens/LogoHorizontal.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";

export const Lojas = () => {
  const navigation = useNavigation();
  const [lojas,SetLojas] = useState([]);
  const getAllLojas = async () => {
    try {
      const response = await axios.get(`http://${IPLOCAL}/categoria`)

      const dados = response.data;

      SetLojas(dados)


    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    getAllLojas();
   },[]);
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.goBack()}}>
        <ArrowLeft />
        </Pressable>
        <Image style={styles.logo} source={LogoHorizontal}/>
        <Pressable onPress={()=>{navigation.navigate('Perfil')}}>
        <TextAlignJustify  />
        </Pressable>
      </View>

      <View style={styles.caixaCategoria}>
      <FlatList
          data={lojas}
          kayExtrator={(item) => item.id}
          renderItem={({item}) => 
          <TouchableOpacity>
          <CardLojas logo={item.logo} nome={item.nome} />
          </TouchableOpacity>}
          // horizontal
          contentContainerStyle={styles.listaCategoria}
          showsVerticalScrollIndicator={false}
          />
      </View>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#73B6B6',
    },

    header: {
      flexDirection: "row",
      width: "100 %",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 80,
      
    },

    logo:{
      marginTop: 0,
      width: "50 %",
      height: "500 %",
    },

    caixaCategoria:{
      paddingBottom: 110,
      marginTop: 40,
      marginLeft: 10,
      marginRight: 10,
    },

    listaCategoria: {
      margin: 0,
    },
  });