import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, TextInput, Button, Alert} from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoVertical from "../../assets/imgens/LogoVertical.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";
import { sha256 } from "react-native-sha256";
import MaskInput from 'react-native-mask-input';


export const Login = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaCripto, setSenhaCripto] = useState('');
  const [login,setLogin] = useState([]);
 
 
  const getLogin = async () => {
    try {
      const response = await axios.get(`http://${IPLOCAL}/login/${cpf}`)

      const dados = response.data;

      setLogin(dados)

    
    } catch (error) {
      console.log(error.message)
    }
  } 


  const logar =  (cpfUser, senhaUser, loginDb) =>{
    
    if (loginDb.cpf == cpfUser && loginDb.senha == senhaUser){
      Alert.alert("Logado com sucesso!")
      navigation.navigate('Home', {
        loginValidado: login
      })
    }else{
      Alert.alert("Login ou senha incorreta!");
    }
    
  }




  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.navigate('Home')}}>
        <ArrowLeft style={styles.botoes} />
        </Pressable>
        <Pressable>
        <TextAlignJustify style={styles.botoes} />
      </Pressable>
      </View>

      <Image style={styles.logo} source={LogoVertical}/>
      <Text style={styles.texto}>Faça seu login</Text>

      <View style={styles.caixaImput}>

      <MaskInput
       style={styles.input}
      value={cpf}
      onChangeText={(masked, unmasked) => {
        setCpf(masked); // you can use the unmasked value as well

        // assuming you typed "9" all the way:
        console.log(masked); // (99) 99999-9999
        console.log(unmasked); // 99999999999
      }}
      mask={[ /\d/,/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-' ,/\d/,/\d/]}
    />
      <TextInput
        style={styles.input}
        // onChangeText={setSenha}
        onChangeText={(senha) => {
          setSenha(senha)
          getLogin()
        }}
        value={senha}
        secureTextEntry={true}
        placeholder="SENHA"
      />
      </View>

      <View style={styles.entrar}>
        <Button
          fontSize= "50"
          title="Entrar"
          color="#DF8D2D"
          onPress={() => {
           logar(cpf, senha, login);
          }
          }
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
      flexDirection: 'row',
      width: "100 %",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 80,
      paddingHorizontal: 35
    },

    logo:{
      marginTop: 0,
      width: 200,
      height: 200,
      alignSelf:"center",
    },

    caixaImput:{
      paddingBottom: 40,
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
    },

    listaCategoria: {
      margin: 0,
    },

    botoes: {
      color: '#73B6B6',
    },

    texto: {
      color: "#fff",
      fontSize: 30,
      textAlign: "center",
      marginBottom: 15,
    },

    input:{
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    // borderWidth: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    },

    entrar:{
      alignSelf:"center",
      width: 200,
      borderRadius: 20,
    }
  });