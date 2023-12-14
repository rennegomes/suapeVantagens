import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, TextInput, Button, Alert } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify, EnvelopeSimple, Phone } from 'phosphor-react-native';
import fotoPerfil from "../../assets/categorias/Alessandro-Henrique.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import { Login } from '../login';
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";

export const Dados = ({route}) => {
  const navigation = useNavigation();
  const {loginUser} = route.params;
  const {_id,cpf, senha, status, nome, foto, email, telefone,} = loginUser;
  const [dados, setDados] = useState('')
  const [emailAtual, setEmailAtual] = useState('')
 const [telefoneAtual, setTelefoneAtual] = useState('')

  const updatePerfil = async (req, res) => {
    try {

      var reqBody = {nome, emailAtual, cpf, telefoneAtual, senha, status}

       axios.patch(`http://${IPLOCAL}/login/${_id}`, reqBody).then((res)=>{
        Alert.alert("Atualizado com sucesso! Faça o seu login novamente...")
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });

        navigation.navigate("Login")
       }).catch((err)=>{
        Alert.alert("Algo deu errado...")
       })

    } catch (error) {
      console.log(error.message)
    }
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

      <Text style={[styles.texto, {marginBottom: 30, fontWeight: "bold", fontSize: 30}]}>Atualize seu email e telefone:</Text>

      <View style={{justifyContent:'center'}}>
      <View style={styles.caixaSegundario}>
        <EnvelopeSimple color='#fff' />
        <TextInput style={[styles.texto, styles.textoImput, {marginLeft: 20}]} defaultValue={email} onChangeText={(text)=>{
          setEmailAtual(text)
      }}/>
      </View>
      <View style={styles.caixaSegundario}>
        <Phone color='#fff' />
        <TextInput style={[styles.texto, styles.textoImput, {marginLeft: 20, marginBottom: 50}]} defaultValue={telefone} onChangeText={(text)=>{
        setTelefoneAtual(text)
      }}/>
      </View>
      </View>



      <Button fontSize= "50"
          title= "Atualizar Perfil"
          color= "#73B6B6"
          onPress={()=>{
            updatePerfil()
          }}
          />

      </View>

      
  
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
    flexDirection: 'row',
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
    marginTop: 5,
  },

  texto:{
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },

  textoImput:{
    textAlign: "center",
    color: "#000",
    fontSize: 22,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 300,
  },

  negrito: {
    fontWeight: "bold",
    fontSize: 35,
    maxWidth: 250,
    textAlign: "center",
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