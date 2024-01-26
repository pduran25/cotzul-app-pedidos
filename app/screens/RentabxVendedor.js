import React,{useState, useEffect, useContext} from "react";
import { Input, Icon, Button} from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { colors, CheckBox } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Picker from '@ouroboros/react-native-picker';

export default function RentabxVendedor() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [carge, setCarge] = useState(0);
    var totA = 0;
    var totB = 0;
    var totC = 0;
    var totD = 0;

    var totE = 0;
    var totF = 0;

    var totG = 0;
    var totH = 0;


    const [valtotA, setValTotA] = useState(0);
    const [valtotB, setValTotB] = useState(0);
    const [valtotC, setValTotC] = useState(0);
    const [valtotD, setValTotD] = useState(0);

    const [res1, setRes1] = useState(0);
    const [res2, setRes2] = useState(0);
    const [res3, setRes3] = useState(0);

    const [tmes, setTmes] = useState(-1);
    let [picker, setPicker] = useState(0);


    const CargaDataRentabilidad = async () => {
        try {
            setLoading(false);
            const response = await fetch(
               "http://app.cotzul.com/Pedidos/getRentaxVendedor.php?tmes="+tmes
             );
             console.log("http://app.cotzul.com/Pedidos/getRentaxVendedor.php?tmes="+tmes);
             const jsonResponse= await response.json();
             setData(jsonResponse?.rentaxvend);
             console.log(jsonResponse?.rentaxvend);
             
             setLoading(true);
        } catch (error) {
            setLoading(false)
          console.log("un error cachado Data saldopedIENTEEE");
          console.log("ERROR CACHADO " + error);
        }
    };

    const sumarTotales = (datap) =>{
        for (let x = 0; x < datap.length; x++) {
            console.log("entro: "+datap[x].rv_subtotal);
            totA = totA + Number(datap[x].rv_subtotal);
            totB = totB + Number(datap[x].rv_costoNK);
            totC = totC + Number(datap[x].rv_utilidadK);

            totE = totE + Number((datap[x].rv_subtotal/datap[x].rv_costoNK));


        }
        setValTotA(totA);
        setValTotB(totB);
        setValTotC(totC);

        setRes3(totA/totB);

        totalesFinales(datap);


    }

    const totalesFinales = (datap) =>{  
        for (let x = 0; x < datap.length; x++) {
            totG = totG + Number((datap[x].rv_subtotal/valtotA)*100);
            totH = totH + Number((datap[x].rv_utilidadK/valtotC)*100);
        }
        setRes1(totG);
        setRes2(totH);
    }  

    useEffect(()=>{
        if(data != null){
            if(data.length>0)
            sumarTotales(data);
        }
        
    },[data]);

    useEffect(()=>{
        setTmes(picker);
    },[picker])


    useEffect(()=>{
        console.log("busqueda de la rentabilidad");
        setLoading(false);
            if(tmes > 0){
                CargaDataRentabilidad(tmes);
            }
               
       },[tmes]);


       const getCurrentDate=()=>{
 
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
    
        return date + '-' + month + '-' + year;
    }

   const item =({item}) =>{
     return( 
         
         <View>

          
          <View style={{flexDirection: 'row'}}>
               
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rv_subtotal).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rv_costoNK).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rv_utilidadK).toFixed(2)}</Text>
                    </View>
                    <View style={{width:70, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rv_subtotal/item.rv_costoNK)).toFixed(2)}</Text>
                    </View>
            </View>
          
                    
            </View>
         
     )
 }

 const item2 =({item}) =>{
    return( 
        <View style={{width:70, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rv_tipo} </Text>
            </View>
           
        
    )
}

const item3 =({item}) =>{
    return( 
        <View style={{width:100, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rv_nombvendedor} </Text>
            </View>
           
        
    )
}

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesSubtitle}>Cotzul S.A.</Text>
                <Text style={styles.titlesTitle}>Rentab. x Vendedor</Text>
                <Text style={styles.titlesSubtitle}>Fecha Hoy: {getCurrentDate()}</Text>
                <Text style={styles.titlesSubtitle}></Text>
            </View>
            <View style={styles.titlesWrapper}>

            <Picker
              onChanged={setPicker}
              options={[
                  {value: 0, text: 'SELECCIONAR'},
                  {value: 5, text: 'DÍA CORRIENTE'},
                  {value: 6, text: 'MES CORRIENTE'},
                  {value: 1, text: '1 MES ATRÁS'},
                  {value: 2, text: '3 MESES ATRÁS'},
                  {value: 3, text: '6 MESES ATRÁS'},
                  {value: 4, text: '12 MESES ATRÁS'},
              ]}
              style={{borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5, backgroundColor: "#6f4993", color: 'white', alignItems: 'center', marginHorizontal: 0}}
              value={picker}
                />            
            
             </View>
            
            <View style={{flexDirection: 'row'}}>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>TIPO</Text>
                    </View>
                   
                    {loading ? (<FlatList 
                    data={data}
                    renderItem = {item2}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading}/>}
                      
                </View>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>VENDEDOR</Text>
                    </View>
                   
                    {loading ? (<FlatList 
                    data={data}
                    renderItem = {item3}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading}/>}
                      
                </View>
           

            <ScrollView horizontal style={{ marginHorizontal:20, marginTop:10, marginBottom: 30}}>
                <View>
                <View style={{flexDirection: 'row'}}>
                        
                        <View style={{width:100, height:35,  backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>A(TOT - DESC)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>B(COST. NAC. KARDEX)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>C(UTI. NAC. KARDEX)</Text>
                        </View>
                        <View style={{width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% A/B</Text>
                        </View>                
            </View>
            
            {loading ? (<FlatList 
                    data={data}
                    renderItem = {item}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading}/>}



        
            <View style={{flexDirection: 'row'}}>
                    
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotA).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotB).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotC).toFixed(2)}</Text>
                    </View>
                    <View style={{width:70, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res3).toFixed(2)}</Text>
                    </View>

                   
          </View>
          </View>
          
            </ScrollView>
            </View>

        </ScrollView>
    )
}

const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: "#6f4993",
        borderRadius: 5,
        height: 30,
    },
    placeholder: {
        color: 'white',
      },
    inputAndroid: {
        width: '100%',
        height: 30,
        color: 'white',
        paddingLeft:10,
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
    }}

    const styles = StyleSheet.create({

        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          title: {
            fontSize: 20,
            fontWeight: "bold",
          },
          text: {
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
          },
          separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
          },
          input: {
            paddingTop: 10,
            borderColor: "grey",
            borderBottomWidth: 2,
          },
          button: {
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          },
          modal: {
            width: "100%",
            height: "90%",
            alignItems: "center",
            justifyContent: "center",
          },
        titlesWrapper:{
            marginTop: 10,
            paddingHorizontal: 20,
        },
        tabletitle:{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingHorizontal: 5,
        },
        tableval:{
            textAlign: 'center',
            height: 30,
            paddingVertical: 7,
            paddingHorizontal: 5,
        },
        btnContainerLogin:{
            marginTop: 10, 
            width: "90%",
        },
        styleItems:{
            flexDirection: "row",
            width: '100%',
            marginHorizontal: 20,
        },
        txtLogin:{
            fontSize: 15,
        },
        btnLogin:{
            backgroundColor: "#6f4993",
            height: 50
        }, 
        titlesSubtitle:{
           // fontFamily: 
           fontSize: 12,
           color: colors.textDark,
        },
        titlesTitle:{
            // fontFamily: 
           fontSize: 20,
           color: colors.textDark,
        },
        scrollview:{
            marginTop:10,
            marginBottom: 50,
            marginHorizontal: 10,
            zIndex: 0,
        },
        titlesdetalle:{
            textAlign: 'center'
        },
        scrollview:{
            marginTop:10,
            marginBottom: 10,
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#F194FF",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          },
          tablevaltit:{
            textAlign: 'center',
            height: 50,
            fontWeight: "bold",
            fontSize: 10,
            paddingHorizontal:5,
        },
        tablevaltit2:{
            textAlign: 'left',
            height: 50,
            fontSize: 8,
            paddingHorizontal:5,
        },
        tableval:{
            textAlign: 'center',
            height: 40 ,
            fontSize: 10,
            paddingVertical:5,
            paddingHorizontal: 5,
        },
        tablevalm:{
            textAlign: 'center',
            fontSize: 11,
            paddingVertical:5,
            paddingHorizontal: 5,
        },
    
    })
