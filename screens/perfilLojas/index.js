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
} from "react-native";
import {
  Horse,
  ArrowLeft,
  DotsThreeOutline,
  Equals,
  TextAlignJustify,
} from "phosphor-react-native";
import LogoHorizontal from "../../assets/imgens/LogoHorizontal.png";
import { useLinkProps, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

export const PerfilLojas = ({ route }) => {
    const {id} = route.params;
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
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeft />
        </Pressable>
        <Image style={styles.logo} src={loja.logo} />
        <Pressable
          onPress={() => {
            navigation.navigate("Perfil");
          }}
        >
          <TextAlignJustify />
        </Pressable>
      </View>

      <View style={styles.caixaCategoria}>
          <View style={styles.caixaNome}>
        <Text style={styles.nome}>{loja.nome}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.desconto}>Cupom de Desconto</Text>
        </TouchableOpacity>
        <Text style={styles.info}>Mais Informações</Text>
        <Text style={styles.title}>Descrição da Loja:</Text>
        <Text>A loja é bonita</Text>
        <Text style={styles.title}>Horário:</Text>
        <Text>18:30</Text>
        <Text style={styles.title}>Telefone:</Text>
        <Text style={styles.telefone}>{loja.telefone}</Text>
        <Text style={styles.title}>Forma de Pagamento:</Text>
        <Text>as formas estarão aqui!!!!!!!</Text>
        <Text style={styles.title}>Localização:</Text>
        <Text style={styles.endereco}>{loja.endereco}</Text>
        <Text style={styles.title}>Outras Informações</Text>
        <Text>CNPJ:4564564-65</Text>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    width: "100 %",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 80,
  },

  logo: {
    marginTop: 50,
    width: "50%",
    height: "500 %",
  },

  caixaCategoria: {
    paddingBottom: 110,
    marginTop: 80,
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
    fontSize:16,
    paddingTop:10,

  },
});
