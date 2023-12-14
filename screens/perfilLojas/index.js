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
  PermissionsAndroid,
  Dimensions
  
} from "react-native";

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

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
  const {id,banner,latitude,longitude,nome, loginValido} = route.params;
 
console.log(loginValido)
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

  
 

  const numMin = 65, numMax = 90

  const numerosAletorios = (minimo, maximo) =>{
      return Math.floor(Math.random()*(maximo - minimo)+ minimo)
  }

  const transfDecParaCaract = (numeAleatorio) =>{
      return String.fromCharCode(numeAleatorio)
  }
  const criaCod = (min, max)=>{
    let numAleatorio, caracter, codCupom = ""
    for (let index = 0; index <= 5; index++) {
     numAleatorio = numerosAletorios(min, max)
     caracter = transfDecParaCaract(numAleatorio)
     codCupom = codCupom + caracter; 
    
  }
  
 return codCupom;
}
var codQr = criaCod(numMin,numMax)


  var latiLoja = parseFloat(latitude), longiLoja = parseFloat(longitude), nomeLoja = nome;
  

const [userLocation, setUserLocation] = useState(null);

  const [destinationPoints, setDestinationPoints] = useState([
    { id: 1, latitude:latiLoja, longitude:longiLoja, title: nomeLoja},
    // Adicione mais pontos conforme necessário
  ]);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    async function getLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permissão de localização negada');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Erro ao obter a localização:', error);
      }
    }

    getLocation();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2); // Distância em km com duas casas decimais
  };

  const onMapLayout = () => {
    if (userLocation) {
      // Calcular o novo bounds para incluir a localização do usuário e pontos de destino
      const bounds = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      destinationPoints.forEach(point => {
        bounds.latitude = Math.min(bounds.latitude, point.latitude);
        bounds.longitude = Math.min(bounds.longitude, point.longitude);
        bounds.latitudeDelta = Math.max(bounds.latitudeDelta, point.latitude - bounds.latitude);
        bounds.longitudeDelta = Math.max(bounds.longitudeDelta, point.longitude - bounds.longitude);
      });

      // Adicionar um pouco de espaço ao redor do bounds
      const padding = 0.1;
      bounds.latitude -= bounds.latitudeDelta * padding;
      bounds.longitude -= bounds.longitudeDelta * padding;
      bounds.latitudeDelta *= 1 + 2 * padding;
      bounds.longitudeDelta *= 1 + 2 * padding;

      setMapRegion(bounds);
    }
  };

  
  

 

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
            navigation.navigate("Perfil", {
              login:loginValido
            });
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
        
        <TouchableOpacity onPress={()=>{navigation.navigate('Cupons', {
          codCupom:codQr,
          logoLoja: loja.logo

        })
        }}>
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

        <View style={{ flex: 1 }}>
      {userLocation && (
        <View>
          <Text>
            {/* Sua localização - Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude} */}
          </Text>
          {/* height: Dimensions.get('window').height */}
          <View style={styles.caixaMapa}> 
          <MapView
            style={styles.mapa}
            initialRegion={mapRegion}
            onLayout={onMapLayout}
          >
            <Marker  coordinate={userLocation} title="Sua Localização" />
            {destinationPoints.map(point => (
              <Marker
                key={point.id}
                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                title={point.title}
              />
            ))}
          </MapView>
          </View> 
          <View>
            {/* <Text> {loja.latitude} e {loja.longetude}</Text> */}
            {/* <Text style={{maxWidth:150, marginLeft: 10, color: '#fff', fontSize: 15,}}>Distâncias para os pontos simulados:</Text> */}
            {destinationPoints.map(point => (
              <Text key={point.id} style={styles.mapaTexto}>
                {point.title} fica a: {calculateDistance(userLocation.latitude, userLocation.longitude, point.latitude, point.longitude)} km de você
              </Text>
            ))}
            </View>
        </View>
      )}
    </View>

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
  },

  caixaMapa:{
    Height:150,
    Width:220,
    borderColor: '#000',
    borderWidth: 2,
  },
  mapa:{
    height: 150
  },
  mapaTexto:{
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign:'center'
  }
});