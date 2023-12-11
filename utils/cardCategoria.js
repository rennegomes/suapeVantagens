import { Image, TouchableOpacity, StyleSheet, ScrollView, Text, ImageBackground, View } from "react-native"
import { useNavigation } from '@react-navigation/native'


export const CardCategoria = (props) => {
   
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.caixaListaCategoria}  onPress={()=>{navigation.navigate('Lojas',{
            titulo: props.titulo,
            banner: props.banner
        })
       
    }
        }>
            
            <ImageBackground imageStyle={{borderRadius:20}} style={styles.listaCategoria2} src={props.banner}>
            <View pointerEvents="none" style={styles.overlay}></View>
                <View style={styles.caixaTexto}>
                <Text style={styles.texto}>
                {props.titulo}
                </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>

        
       
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

    overlay:{
        height:150,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius:20
    },
  });