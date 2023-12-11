import { IPLOCAL } from "@env";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Button,
  ImageBackground,
  
} from "react-native";
import {
  Horse,
  ArrowLeft,
  DotsThreeOutline,
  Equals,
  TextAlignJustify,
} from "phosphor-react-native";

import LogoHorizontal from "../../assets/imgens/LogoHorizontal.png";
import overlay from "../../assets/overlay.png";
import Estetica from "../../assets/categorias/Estetica.png";
import { useLinkProps, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

export const PerfilLojas = ({ route }) => {
  const {id,banner} = route.params;
  const navigation = useNavigation();
  const [loja, SetLoja] = useState([]);

  const getLoja = async () => {
    try {
      const response = await axios.get(
        `http://${IPLOCAL}/estabelecimento/1/${id}`
      );
        
      const dados = response.data;
     

      SetLoja(dados);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getLoja();
  }, []);

  return (
    <View style={styles.container}>
    <ImageBackground style={styles.background} src={banner}>
    <View pointerEvents="none" style={styles.overlay}></View>
      <View style={styles.header}>
      
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeft style={styles.botoes} />
        </Pressable>
        <Image style={styles.logo} src={loja.logo} />
        <Pressable 
          onPress={() => {
            navigation.navigate("Perfil");
          }}
        >
          <TextAlignJustify style={styles.botoes} />
        </Pressable>
      </View>
     
      </ImageBackground>
      <ScrollView style={styles.caixaCategoria}>
      <View>
          <View style={styles.caixaNome}>
        <Text style={styles.nome}>{loja.nome}</Text>
        </View>
        
        <TouchableOpacity onPress={()=>{navigation.navigate('Cupons')}}>
          <Text style={styles.desconto}>Cupom de Desconto</Text>
        </TouchableOpacity>

        <Text style={styles.info}>Mais Informações</Text>
        <Text style={styles.title}>Descrição da Loja</Text>
        <Text style={[styles.maisinfos, styles.espaco]}>{loja.descricao}</Text>

        <Text style={styles.title}>Horários</Text>
        <View style={styles.horario}>
          <Text>Segunda-feira</Text>
          <Text>{loja.segunda}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Terça-feira </Text>
          <Text>{loja.terca}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Quarta-feira </Text>
          <Text>{loja.quarta}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Quinta-feira </Text>
          <Text> {loja.quinta}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Sexta-feira </Text>
          <Text>{loja.sexta}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Sabado </Text>
          <Text>{loja.sabado}</Text>
        </View>

        <View style={styles.horario}>
          <Text>Domingo </Text>
          <Text style={styles.espaco}>{loja.domingo}</Text>
        </View>

        <Text style={styles.title}>Telefone</Text>
        <Text style={[styles.telefone, styles.espaco]}>{loja.telefone}</Text>

        <Text style={[styles.title, {marginBottom: -10}]}>Forma de Pagamento:</Text>
          <View style={styles.pagviw}>
        <Image style={styles.formapag} src={loja.masterCardLogo} />
        <Image style={styles.formapag} src={loja.visaLogo} />
        <Image style={styles.formapag} src={loja.eloLogo} />
        </View>

        <Text style={styles.title}>Localização:</Text>
        <Text style={[styles.endereco, styles.espaco]}>{loja.endereco}</Text>

        <Text style={styles.title}>Outras Informações</Text>
        <Text style={styles.espaco}>CNPJ:{loja.cnpj}</Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  header: {
    flexDirection: 'row',
    width: "100 %",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 80,
  },

  background:{
    paddingBottom:110,
  },

  logo: {
    marginTop: 50,
    width: "50%",
    maxWidth:150,
     height: "400%",
     maxHeight:150,
    borderRadius: 200,
    borderWidth:2,
    borderColor:"#000",
  },
 
  caixaCategoria: {
    marginTop:-20,
    paddingBottom: 130,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    backgroundColor: "#73B6B6",
        
  },

  caixaNome:{
    paddingBottom: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingTop: 20,
  },

  listaCategoria: {
    margin: 0,
  },

  desconto:{
    backgroundColor: '#FF8A00',
    textAlign: 'center',
    borderRadius: 20,
    margin: 20,
    padding: 15,
    maxWidth: "60%",
   alignSelf:'center',
   fontSize:16,
  },

  info:{
    fontSize:20,
    textAlign:'center',
  },

  nome:{
    textAlign:'center',
    fontSize: 25,
    fontWeight:'bold',
    
  },
  
  title:{
    color:'#fff',
    fontSize:20,
    paddingTop:10,
    marginBottom: 10
  },

  overlay:{
    height:500,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  botoes:{
    color:'white',
  },

  maisinfos:
  {
    textAlign:'justify',
  },

  pagviw:{
    flexDirection: 'row',
    width: "100 %",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },

  formapag:{
    marginTop: 20,
    width: "30%",
    maxWidth:150,
     height: 100,
     maxHeight: 50,
  },

  espaco: {
    marginBottom: 15,
  },

  horario:{
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
