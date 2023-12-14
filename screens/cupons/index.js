import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable, ImageBackground, TextInput, Share, Alert } from 'react-native';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify, ShareNetwork} from 'phosphor-react-native';
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
    const {codCupom,logoLoja} = route.params;
    const [cod, setCod] = useState('');

      useEffect(()=>{
    setCod(codCupom);
   },[]);
  

   const onShare = async () => {
    try {
      const result = await Share.share({
        message:cod

      });
    }catch (error) {
      Alert.alert(error.message);
    }
  }

 

  return (
    <View style={styles.container}>
      <ImageBackground imageStyle={{borderRadius:20}} style={styles.background} src={logoLoja} >
    <View pointerEvents="none" style={styles.overlay}></View>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeft style={styles.botoes} />
        </Pressable>
        <Pressable >
          <TextAlignJustify style={[styles.botoes, {color: 'rgba(0, 0, 0, 0)'} ]} />
        </Pressable>
      </View>
      {/* <Text style={styles.titulo}>{titulo}</Text> */}
      </ImageBackground>


      <View style={styles.caixaQrCode}>
        <QRCode 
        value={codCupom}
        size={250}
        color='black'
        logo={LogoHorizontal}
        logoSize={30}
        logoMargin={5}
        logoBorderRadius={15}
        logoBackgroundColor='#DF8D2D'
        />
      </View>
      <Text style={[styles.codigoQrCodeTexto, {marginTop: 15, fontWeight:'bold',}]} >Seu código:</Text>
      <View style={styles.codigoQrCode}>
     
      <Text style={styles.codigoQrCodeTexto} >{cod}</Text>
      
      
      </View>

      <Pressable onPress={onShare} style={{alignSelf: "center", marginTop: 15, backgroundColor:"#73B6B6", borderRadius: 20,padding:10 }}>
      <ShareNetwork size={50} style={{color: "#fff" }} />
      </Pressable>
      

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

    background:{
      paddingBottom:90,
      borderEndEndRadius: 200,
    },

    logo:{
      marginTop: 0,
      width: "50 %",
      height: "500 %",
    },

    caixaQrCode:{
      marginTop: 70,
      alignSelf: 'center',
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 20
    },

    codigoQrCode:{
      marginTop:15,
      backgroundColor: '#73B6B6',
    },
    codigoQrCodeTexto:{
      margin:5,
      fontSize: 30,
      textAlign: 'center',
      color: '#fff',
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