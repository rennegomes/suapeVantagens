import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoVertical from "../../assets/imgens/LogoVertical.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import { Login } from '../login';
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";

export const Dados = () => {
  const navigation = useNavigation();
  const [perfil,SetPerfils] = useState([]);
  // const getAllPerfils = async () => {
  //   try {
  //     const response = await axios.get(`http://${IPLOCAL}/categoria`)

  //     const dados = response.data;

  //     SetPerfils(dados)


  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // } 

  // useEffect(()=>{
  //   getAllPerfils();
  //  },[]);
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
      
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowLeft />
      </Pressable>
      <Pressable>
        <TextAlignJustify style={styles.botoes} />
      </Pressable>
    </View>

      <View style={styles.caixaPerfil}>
      {/* <FlatList
          data={perfil}
          kayExtrator={(item) => item.id}
          renderItem={({item}) => 
          <TouchableOpacity>
          <CardLojas logo={item.logo} nome={item.nome} />
          </TouchableOpacity>}
          // horizontal
          contentContainerStyle={styles.listaCategoria}
          showsVerticalScrollIndicator={false}
          /> */}
      <Image style={styles.fotoPerfil} source={LogoVertical} />
      <Text style={[styles.texto, styles.negrito]}>Márcio Milet</Text>
      <Text style={styles.texto}>707070-70</Text>
      </View>

      {/* <View>
        <Pressable style={styles.opcoes} >
          <Text style={[styles.negrito, {fontSize: 20}]}>Meus dados</Text>
        </Pressable>
        <Pressable style={styles.opcoes} onPress={()=>{navigation.navigate('Login')}}>
          <Text style={[styles.negrito, {fontSize: 20}]}>Sair</Text>
        </Pressable>
      </View> */}
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DF8D2D',
    },

    header: {
      flexDirection: 'row',
      width: "100 %",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 80,
      paddingHorizontal: 35
    },

    logo:{
      marginTop: 0,
      width: "50 %",
      height: "500 %",
    },

    caixaPerfil:{
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
    },

    listaCategoria: {
      margin: 0,
    },

    botoes: {
      color: '#DF8D2D',
    },

    fotoPerfil: {
      width: 200,
      height: 200,
      alignSelf: "center",
      borderRadius:200,
    },

    texto:{
      textAlign: "center",
      color: "#fff",
      fontSize: 20,
    },
    
    negrito: {
      fontWeight: "bold",
      fontSize: 35,
    },

    opcoes: {
      backgroundColor: "#fff",
      alignItems:"center",
      alignSelf: "center",
      marginBottom: 20,
      height: 50,
      width: "50 %",
      borderRadius:20,
      justifyContent: "center",
    },
  });