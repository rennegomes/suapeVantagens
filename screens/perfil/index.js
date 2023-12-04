import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoHorizontal from "../../assets/imgens/LogoHorizontal.png";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react'
import { CardLojas } from '../../utils/cardCategoria';
import {IPLOCAL} from "@env";

export const Perfil = () => {
  const navigation = useNavigation();
  const [perfil,SetPerfils] = useState([]);
  const getAllPerfils = async () => {
    try {
      const response = await axios.get(`http://${IPLOCAL}/categoria`)

      const dados = response.data;

      SetPerfils(dados)


    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    getAllPerfils();
   },[]);
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.goBack()}}>
        <ArrowLeft />
        </Pressable>
        {/* <Image style={styles.logo} source={LogoHorizontal}/> */}
        <Text ㅤ/><Text ㅤ/><Text ㅤ/><Text ㅤ/><Text ㅤ/><Text ㅤ/>
      </View>

      <View style={styles.caixaCategoria}>
      <FlatList
          data={perfil}
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
      backgroundColor: '#DF8D2D',
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