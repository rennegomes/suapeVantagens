import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify, EnvelopeSimple, Phone } from 'phosphor-react-native';
import fotoPerfil from "../../assets/categorias/Alessandro-Henrique.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import { Login } from '../login';
import { Dados } from '../dados';
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";


export const Perfil = ({route}) => {
  const navigation = useNavigation();
  const {login} = route.params;
  const {cpf,nome, foto, telefone, email} = login
  const [perfil,SetPerfils] = useState([]);
  
const sairLogin = () =>{
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
  navigation.navigate('Login')
}
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
      <View style={styles.caixaPrincipal}>
        <Image style={styles.fotoPerfil} src={foto} />
        <View style={styles.caixaDireita}>
        <Text style={[styles.texto, styles.negrito, {marginBottom: 10}]}>{nome}</Text>
        <Text style={styles.texto}>CPF: {cpf}</Text>
        </View>
      </View>

      <View style={styles.caixaSegundario}>
        <EnvelopeSimple color='#fff' />
        <Text style={[styles.texto, {marginLeft: 20}]}>{email}</Text>
      </View>
      <View style={styles.caixaSegundario}>
        <Phone color='#fff' />
        <Text style={[styles.texto, {marginLeft: 20}]}>{telefone}</Text>
      </View>
      </View>

      <View style={styles.caixaOpcoes}>
        <Pressable style={styles.opcoes} onPress={()=>{navigation.navigate('Dados',{
          loginUser:login
        })}} >
          <Text style={[styles.negrito, {fontSize: 20}]}>Atualizar dados</Text>
        </Pressable>
        <Pressable style={styles.opcoes} onPress={sairLogin}>
          <Text style={[styles.negrito, {fontSize: 20}]} >Sair</Text>
        </Pressable>
      </View>

{/*  
      <View style={styles.caixaPerfil}>
      <Image style={styles.fotoPerfil} src={foto} />
      <Text style={[styles.texto, styles.negrito]}>{nome}</Text>
      <Text style={styles.texto}>CPF: {cpf}</Text>
      <Text style={styles.texto}>EMAIL: {email}</Text>
      <Text style={styles.texto}>TELEFONE: {telefone}</Text>
      </View>

      <View>
        <Pressable style={styles.opcoes} onPress={()=>{navigation.navigate('Dados',{
          loginUser:login
        })}} >
          <Text style={[styles.negrito, {fontSize: 20}]}>Atualizar dados</Text>
        </Pressable>
        <Pressable style={styles.opcoes} onPress={sairLogin}>
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
    marginTop: 20,
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

  caixaPrincipal:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#fff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: 20
  },

  caixaDireita:{
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  fotoPerfil: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius:200,
  },

  caixaSegundario:{
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 5
  },

  texto:{
    // textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },

  negrito: {
    fontWeight: "bold",
    fontSize: 35,
    maxWidth: 250,
    textAlign: "center",
  },

  caixaOpcoes: {
    marginTop: 40
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