import React, {useState, useEffect, useRef, useContext} from 'react'
import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator, AppState} from "react-native";
import { colors } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNPickerSelect from "react-native-picker-select";
import DetPedidos from './DetPedidos';
import { AuthContext } from "../components/Context"
import Picker from '@ouroboros/react-native-picker';

function defaultValueRegister(){
    return{
        cb_codigo: '',
        cb_coddocumento: '',
        cb_cliente: '',
        cb_vendedor: '',
        cb_accion: '',
        cb_valortotal: 0
    }
}

function defaultValueUser(){
    return{
        us_codigo: "",
        us_nombre: "",
        us_usuario: "",
        us_clave: "",
        us_estatus: "",
        us_codusuario: ""
    }
}

const STORAGE_KEY = '@save_data'
const STORAGE_DB = '@login_data'


const STORAGE_CAD = '@save_cadena'




export default function Productos(props){

    const [tpedido, setTpedido] = useState(-1);
    const {navigation, route} = props;
    const [registro, setRegistro] = useState(defaultValueRegister);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [data, setData] = useState([])
    const [dataUser, setdataUser] = useState(defaultValueUser());
    const {signOut, signUp} = React.useContext(AuthContext);
    const [usuario, setUsuario] = useState(false);
    const [consta, setConsta] = useState("");
    const [cadena, setCadena] = useState("");
    var cont = 0;
    const inactiveTime = useRef(null);
    let [picker, setPicker] = useState(-1);

    /* FUNCIONES RECURSIVAS */
    const getDataUser = async () => {
        
        try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        console.log("si entrego : " + jsonValue);
        setdataUser(JSON.parse(jsonValue));
        setUsuario(true);
        console.log("INGRSA A PRODUCTO: " + dataUser.us_nombre);
        } catch(e) {
            console.log("Error al coger el usuario")
         console.log(e)
        }
    }

    const getCadenaDB = async () => {
        
        try {
        const valu = await AsyncStorage.getItem(STORAGE_CAD)
        setConsta(valu);
        console.log("constant : " + valu);
        const response = await fetch(
            "https://app.cotzul.com/Pedidos/getAllPedidosN.php?idestatus=-1&usuario="+dataUser.us_usuario+"&cadena="+valu
          );
          console.log("https://app.cotzul.com/Pedidos/getAllPedidosN.php?idestatus=-1&usuario="+dataUser.us_usuario+"&cadena="+valu);
          const jsonResponse = await response.json();

        } catch(e) {
            console.log("Error cadena")
            console.log(e)
        }
    }

    useEffect(()=>{
        actualizaPedido(picker);
    },[picker])


    const setCad = async (value) => {
        try {
            await AsyncStorage.setItem(STORAGE_CAD, value)
          } catch(e) {
             console.log(e)
          }
    }

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);


  useEffect(() => {
        if(dataUser){
            if(!usuario){
                getDataUser();
                console.log("Carga de nuevo el pedido");
                listarPedidos(-1);
                const subscription = AppState.addEventListener("change", nextAppState => {
                    console.log("ingresando nueva");
                    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                        console.log("aplicacion esta activa");
        
                      if (inactiveTime.current) {
                        const elapsedTime = new Date() - inactiveTime.current;
                        const inactiveMinutes = Math.floor(elapsedTime / 60000);
                        
                        if (inactiveMinutes >= 3) {
                          // Han pasado 3 minutos de inactividad, realizar el deslogueo
                          // Llama a la función de deslogueo aquí
                            console.log("Pantalla inactiva");
                            signOut();
                            getCadenaDB();
                        }
                      }
        
                    } else {
                        inactiveTime.current = new Date();
                        console.log("aplicacion esta en el fondo:"+inactiveTime.current);
                    }
              
                    appState.current = nextAppState;
                   // setAppStateVisible(appState.current);
                  /*  console.log("AppState", appState.current);
                    if(appState.current == "inactive"){
                       // actualizaPedido(-1);
                        console.log("Pantalla inactiva");
                        signOut();
                        getCadenaDB();
                    }*/
                        
                  });
        
        
        
                return () => {
                    signOut();
                    getCadenaDB();
                    subscription.remove();
                }
            }
        }

       

        
        
    },[]);


 



    const listarPedidos = async (estatus) => {
        try {
           
            console.log("entro prueba item");
          const response = await fetch(
            "https://app.cotzul.com/Pedidos/getAllPedidosN.php?idestatus="+estatus+"&usuario="+dataUser.us_usuario+"&cadena="+cadena
          );
          console.log("https://app.cotzul.com/Pedidos/getAllPedidosN.php?idestatus="+estatus+"&usuario="+dataUser.us_usuario+"&cadena="+cadena);
          const jsonResponse = await response.json();
          console.log("entro prueba item1");
          
          
          setData(jsonResponse?.cabpedidos);
          cargarDetalles(jsonResponse?.cabpedidos);

          if(estatus != -1){
            listarDetPedidos();
          }else
            setLoading(true);

          
        } catch (error) {
         setLoading(false)
          console.log("un error cachado listar pedidos");
          console.log(error);
        }
    };


    const listarPedidos2 = async () => {
        try {
           
          console.log("entro prueba item");
          const response = await fetch(
            "https://app.cotzul.com/Pedidos/getAllPedidosN2.php?usuario="+dataUser.us_usuario+"&cadena="+cadena
          );
          console.log("https://app.cotzul.com/Pedidos/getAllPedidosN2.php?usuario="+dataUser.us_usuario+"&cadena="+cadena);
          const jsonResponse = await response.json();
          console.log("entro prueba item2");
          setLoading(true);
          setLoading2(true);
          setData(jsonResponse?.cabpedidos);
          cargarDetalles(jsonResponse?.cabpedidos);
          
        } catch (error) {
         setLoading(false)
          console.log("un error cachado listar pedidos");
          console.log(error);
        }
    };


    const listarDetPedidos = async () => {
        try {

            console.log("entro a listar deta pedidos");
         
          const response2 = await fetch(
            "https://app.cotzul.com/Pedidos/getAllDetallesN.php?usuario="+dataUser.us_usuario
          );
          console.log("https://app.cotzul.com/Pedidos/getAllDetallesN.php?usuario=***"+dataUser.us_usuario);
          const jsonResponse2 = await response2.json();
          console.log(jsonResponse2?.detpedidos[0].dt_respuesta);
          setLoading(true);
        } catch (error) {
          console.log("un error cachado listar pedidos");
          console.log(error);
        }
    };


    const cargarDetalles = (pedidos) =>{
        console.log(" data: "+ pedidos);
        var cont = 0;
        var texto = "vacio";
        
        if(pedidos != undefined){
           console.log("valor de mensjar: " + pedidos[0].cb_mensaje);
            
            if(pedidos[0].cb_mensaje != 'X'){
                texto =  "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><c c0=\"2\" c1=\"1\" >";
                for (let x = 0; x < pedidos.length; x++) {
                        cont++;
                        console.log(pedidos[x].cb_coddocumento);
                        texto = texto + "<detalle d0=\""+pedidos[x].cb_coddocumento+"\" d1=\""+cont+"\"></detalle>";
                }
                texto = texto + "</c>";
            }else{
                //console.log(pedidos[0].cb_observacion);
                if(pedidos[0].cb_observacion != 'X')
                    Alert.alert(pedidos[0].cb_observacion);
            }
        }
        console.log(texto);
        setCadena(texto);
        setCad(texto);
     }


   
    const item =({item}) =>{
        
        var cont = 0;
        
        
        if(item.cb_mensaje != 'X'){
       

       const viewDetails = (props) =>{
            console.log("Detalle pedido");
           
            console.log(item.empresa);
            for (let x = 0; x < data.length; x++) {
                cont++;
                console.log(item.cb_coddocumento)
                if (data[x].cb_coddocumento == item.cb_coddocumento) {
                    data[x].background = 'gray';
                } else {
                    data[x].background = 'white';
                }
            }
           
            if(data.length == 0){
                setRegistro(defaultValueRegister);
            }else{
                setRegistro(item);
            }
            

        }

        return( 
            
           
            <TouchableOpacity onPress={viewDetails}>
            <View style={{flexDirection: 'row', backgroundColor: item.background, marginRight:15}}>
                <View style={{width:70, height: 30, borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.tabletext}>{item.cb_coddocumento}</Text>
                </View>
                <View style={{width:100, height: 30,  borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.tabletext}>{item.cb_cliente}</Text>
                </View>
                <View style={{width:100, height: 30,   borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.tabletext}>{item.cb_vendedor}</Text>
                </View>
                <View style={{width:60, height: 30,   borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.tableval}>$ {item.cb_valortotal}</Text>
                </View>
                <View style={{width:100, height: 30,   borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.tabletext}>{(item.cb_estado=='D')?'NO APROBADO':(item.cb_estado=='A')?'NUEVOS':(item.cb_estado=='B')?'BACKORDER':(item.cb_estado=='R')?'REACTIVADOS':'NINGUNO'}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
        }
        
    }

    const goDetalles = () =>{
        if(registro.cb_codigo != '')
            navigation.navigate("dettotal",{registro, recargarPedidos}); 
        else
            Alert.alert("Seleccione un Pedido");
     }

     const recargarPedidos = () =>{
        listarPedidos2();
        setRegistro(defaultValueRegister);
    }

     const actualizaPedido = (tpedido) =>{
        console.log("Entro a actualizar pedidos");
        setLoading(false);
        setTpedido(tpedido);
        listarPedidos(tpedido);
        setRegistro(defaultValueRegister);
     }
   

   
    return(
        <ScrollView style={styles.container}>
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesSubtitle}>Cotzul S.A.</Text>
                <Text style={styles.titlespick2}>Usuario: {dataUser.us_nombre}</Text>
            </View>
            {/*Search*/}
            <Text style={styles.titlespick}>Tipo:</Text>
            {/*<RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(tpedido) => actualizaPedido(tpedido)}
                placeholder={{ label: "SELECCIONAR", value: -1 }}
                items={[
                    { label: "TODOS", value: 0},
                    { label: "NUEVOS", value: 1 },
                    { label: "BACKORDER", value: 2 },
                    { label: "NO APROBADOS", value: 4 },
                    { label: "REACTIVADOS", value: 3 },
                    
                ]}
            />*/}
            <Picker
              onChanged={setPicker}
              options={[
                  {value: -1, text: 'SELECCIONAR'},
                  {value: 0, text: 'TODOS'},
                  {value: 1, text: 'NUEVOS'},
                  {value: 2, text: 'BACKORDER'},
                  {value: 4, text: 'NO APROBADOS'},
                  {value: 3, text: 'REACTIVADOS'},
              ]}
              style={{borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5, backgroundColor: "#6f4993", color: 'white', alignItems: 'center', marginHorizontal: 20}}
              value={picker}
          />
             <ScrollView horizontal>
            <View style={{ marginHorizontal:20, marginTop:10, height: 120}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width:70, backgroundColor:'#9c9c9c', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tabletitle}>#Doc.</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'#9c9c9c', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tabletitle}>Cliente</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'#9c9c9c', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tabletitle}>Vendedor</Text>
                    </View>
                    <View style={{width:60, backgroundColor:'#9c9c9c', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tabletitle}>Saldo</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'#9c9c9c', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tabletitle}>Estado</Text>
                    </View>
                </View>
                {(loading) ? (<FlatList 
                    data={data}
                    renderItem = {item}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading}/>} 
                
            </View>
            </ScrollView>
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesdetalle}>Cabecera de Pedidos</Text>
            </View>
            <DetPedidos registro={registro} />
            <View style={{alignItems:'center'}}>
                <Button
                    title="Ver detalles"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle = {styles.btnLogin}
                    onPress= {goDetalles}
                />
            </View>
        </ScrollView>

       
    );
};

const styles = StyleSheet.create({
    titlesWrapper:{
        marginTop: 5,
        paddingHorizontal: 20,
    },
    tabletitle:{
        fontSize: 8,
    },
    tabletext:{
        fontSize: 8,
    },
    tableval:{
        fontSize: 8,
        textAlign: 'right'
    },
titlesSubtitle:{
    fontWeight: 'bold',
   fontSize: 16,
   color: colors.textDark,
},
titlesTitle:{
    // fontFamily: 
   fontSize: 35,
   color: colors.textDark,
},
titlesdetalle:{
    // fontFamily: 
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    paddingTop: 10,
 },
titlespick:{
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    paddingHorizontal:20,
    paddingTop: 10,
},
titlespick2:{
    fontSize: 16,
    color: colors.textDark, 
    paddingTop: 5,
},
btnContainerLogin:{
    marginTop: 10, 
    marginBottom: 10, 
    width: "90%"
},
btnLogin:{
    backgroundColor: "#6f4993",
}, 
iconRight:{
    color : "#c1c1c1",

},
detallebody:{

    height: 75,
    width: '90%',
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
},
dividobody:{
    flexDirection: "row",
    paddingTop: 20,
    height: 75,
    width: '90%',
    marginHorizontal: 20,
    borderWidth: 1,
},
totalbody:{
    borderWidth: 1,
    height: 75,
    width: '90%',
    marginHorizontal: 20,
    paddingTop: 20,
},
labelcorta:{
    marginTop: 10,
    fontSize: 16,
    color: colors.textDark,
    paddingHorizontal: 20,
},

searchWrapper:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
},
search:{
    flex: 1,
    marginLeft: 0,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,


},
searchText:{
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,

},
productoWrapper:{
    marginTop: 10,
},
Searchbar:{
    marginBottom: 20,
    backgroundColor: '#fff'
}, 
scrollview:{
    marginTop:10,
    marginBottom: 50,
},
categoriaWrapper:{
    paddingHorizontal: 20
},
categoriaWrapper1:{
    paddingHorizontal: 20,
    paddingVertical:10,
    alignItems: 'center', //Centered vertically
},
categoriaItemWrapper1:{
    marginTop: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#f5ca4b',
    borderRadius: 20,
    width: 120, 
    height: 70,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:1
},
categoriaItemWrapper2:{
    marginTop: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 120, 
    height: 70,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:1
},
textItem:{
    textAlign: 'center',
    fontSize: 10,
}


});



const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingHorizontal: 20,
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: "#6f4993",
        borderRadius: 5,
        height: 30,
    },
    placeholder: {
        color: 'white',
      },
    inputAndroid: {
        width: '85%',
        height: 25,
        color: 'white',
        marginHorizontal: 20,
        paddingLeft:10,
        marginTop: 5,
        backgroundColor: 'red',
        borderRadius: 5,

    },
    searchWrapper:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 0,
        marginTop: 10,
    },
    search:{
        flex: 1,
        marginLeft: 0,
        borderBottomColor: colors.textLight,
        borderBottomWidth: 1,
    }
};
