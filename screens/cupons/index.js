import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, ImageBackground, TextInput } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import LogoHorizontal from "../../assets/imgens/LogoHorizontal.png";
import { useLinkProps, useNavigation} from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react'
import { CardLojas } from '../../utils/cardLojas';
import {IPLOCAL} from "@env";
import QRCode from 'react-native-qrcode-svg';


export const Cupons = ({route}) => {
    const navigation = useNavigation();
    const {codCupom} = route.params;
    const [cod, setCod] = useState('');

      useEffect(()=>{
    setCod(codCupom);
   },[]);
  

  // console.log(String.fromCharCode(72, 69, 76, 76, 79))


//   const { titulo,banner} = route.params;
//   const [lojas,SetLojas] = useState([]);
  
//   const getAllLojas = async () => {
//     try {
//       const response = await axios.get(`http://${IPLOCAL}/estabelecimento/${titulo}`)

//       const dados = response.data;

//       SetLojas(dados)


//     } catch (error) {
//       console.log(error.message)
//     }
//   } 

//   useEffect(()=>{
//     getAllLojas();
//    },[]);

  return (
    <View style={styles.container}>
      <ImageBackground imageStyle={{borderRadius:20}} style={styles.background}>
    <View pointerEvents="none" style={styles.overlay}></View>
      <View style={styles.header}>
      
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeft style={styles.botoes} />
        </Pressable>
        <Pressable 
          onPress={() => {
            navigation.goBack();
          }}
        >
          <TextAlignJustify style={[styles.botoes, {color: 'rgba(0, 0, 0, 0.5)'} ]} />
        </Pressable>
      </View>
      {/* <Text style={styles.titulo}>{titulo}</Text> */}
      </ImageBackground>


      <View style={styles.caixaQrCode}>
        <QRCode 
        value={codCupom}
        size={250}
        color='black'
        backgroundColor='#73B6B6'
        logo={LogoHorizontal}
        logoSize={30}
        logoMargin={5}
        logoBorderRadius={15}
        logoBackgroundColor='#DF8D2D'
        />

       <Text>{cod}</Text>
      
          
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

    background:{
      paddingBottom:60,
      borderEndEndRadius: 200,
    },

    logo:{
      marginTop: 0,
      width: "50 %",
      height: "500 %",
    },

    caixaQrCode:{
      paddingBottom: 110,
      marginTop: 40,
      marginLeft: 10,
      marginRight: 10,
    },

    listaCategoria: {
      margin: 0,
    },
    titulo: {
      fontSize: 30,
      textAlign: 'center',
      alignSelf: "center",
      fontWeight: "bold",
      color: "#fff"
    },

    botoes: {
      color: "#fff"
    },

    overlay:{
      height:197,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius:20
    },

  });