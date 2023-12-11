import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, TextInput, Button, Alert} from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoVertical from "../../assets/imgens/LogoVertical.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";

export const Login = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [login,SetLogins] = useState([]);
  const getAllLogins = async () => {
    try {
      const response = await axios.get(`http://${IPLOCAL}/login`)

      const dados = response.data;

      SetLogins(dados)


    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    getAllLogins();
   },[]);
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.navigate('Home')}}>
        <ArrowLeft />
        </Pressable>
        <Pressable>
        <TextAlignJustify style={styles.botoes} />
      </Pressable>
      </View>

      <Image style={styles.logo} source={LogoVertical}/>
      <Text style={styles.texto}>Faça seu login</Text>

      <View style={styles.caixaImput}>

      <TextInput
        id='cpf'
        style={styles.input}
        // onChangeText={setCpf}
        onChangeText={(cpf) => setCpf(cpf)}
        maxLength={8}
        value={cpf}
        placeholder="CPF"
        keyboardType="numeric"
      />

      <TextInput
        id='senha'
        style={styles.input}
        // onChangeText={setSenha}
        onChangeText={(senha) => setSenha(senha)}
        value={senha}
        secureTextEntry={true}
        placeholder="SENHA"
        keyboardType="numeric"
      />
      {/* <FlatList
          data={login}
          kayExtrator={(item) => item.id}
          renderItem={({item}) => 
          <TouchableOpacity>
          <CardLojas logo={item.logo} nome={item.nome} />
          </TouchableOpacity>}
          // horizontal
          contentContainerStyle={styles.listaCategoria}
          showsVerticalScrollIndicator={false}
          /> */}
      </View>

      <View style={styles.entrar}>
        <Button
          id='entrar'
          fontSize= "50"
          title="Entrar"
          color="#DF8D2D"
          onPress={() => Alert.alert(`${cpf} ${senha} Entrou!`)}
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