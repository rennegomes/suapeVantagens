import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, Pressable } from 'react-native';
import LogoVertical from "../assets/imgens/LogoVertical.png";
import LogoHorizontal from "../assets/imgens/LogoHorizontal.png";
import { CATEGORIAS } from '../utils/categorias';
import { CardCategoria } from '../utils/cardCategoria';
import { Perfil } from './perfil';
import { Dados } from './dados';
import { Horse, ArrowLeft, DotsThreeOutline, Equals, TextAlignJustify } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useState, useEffect } from "react";
import {IPLOCAL} from "@env";


export const Home = ({route}) => {
  const navigation = useNavigation();
  const {loginValidado} = route.params

  const [banners, SetBanners, loja] = useState([]);
  const getAllBanners = async () => {
    try {
      const response = await axios.get(`http://${IPLOCAL}/banner`)

      const dados = response.data;

      SetBanners(dados)


    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    getAllBanners();
   },[]);

  // onPress={()=>{navigation.navigate('Outro')}}
    return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text ㅤ/><Text ㅤ/>
        <Image style={styles.logo} source={LogoHorizontal}/>
        <Pressable onPress={()=>{navigation.navigate('Perfil', {
          login: loginValidado,
        })}}>
        <TextAlignJustify  />
        </Pressable>
      </View>

      <View style={styles.caixaCategoria}>
        
          <FlatList
          numColumns={2}
          data={banners}
          kayExtrator={(item) => item._id}
          renderItem={({item}) => 
          <TouchableOpacity>
          <CardCategoria banner={item.banner} titulo={item.titulo} login={loginValidado}/>
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
      flex: 4,
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
      marginTop: "30%",
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',    
    },

    listaCategoria: {
      margin: 0,
    },
  });