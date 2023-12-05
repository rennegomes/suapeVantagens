import { Image, TouchableOpacity, StyleSheet, ScrollView, Text, ImageBackground, View } from "react-native"
import { useNavigation } from '@react-navigation/native'

export const CardLojas = (props) => {
    const navigation = useNavigation();
    return(<View>
        <TouchableOpacity style={styles.caixaListaCategoria} onPress={()=>{navigation.navigate('PerfilLojas',{
            id:props.id
            
        })}}>
            <ImageBackground style={styles.listaCategoria2} src={props.logo}>
                <View style={styles.caixaTexto}>
                <Text style={styles.texto}>
                {props.nome}
                </Text>
                   
                </View>
            </ImageBackground>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listaCategoria: {
        maxWidth:"100 %",
        height: 150,
        borderRadius: 20,
        objectFit: "fill",
    },
    listaCategoria2: {
        maxWidth:"100 %",
        height: 150,
        borderRadius: 20,
        objectFit: "fill",
        // opacity: 0.5
    },
    caixaListaCategoria: {
        marginBottom:0,
        marginBottom: 5,
    },
    caixaTexto: {
        display: "flex",
        alignItems: "flex-start",
        paddingTop: 100,
        paddingLeft: 10
    },
    texto: {
        color: "#FFF",
        fontSize: 25,
        // opacity: 1
    },
  });