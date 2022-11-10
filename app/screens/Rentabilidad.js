import React,{useState, useEffect, useContext} from "react";
import { Input, Icon} from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Modal, SafeAreaView, Button, Platform } from 'react-native'
import { colors, CheckBox } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";


export default function Rentabilidad() {
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
    const [res4, setRes4] = useState(0);

    const [tmes, setTmes] = useState(-1);





    const CargaDataRentabilidad = async (tmes) => {
        try {
            setLoading(false);
            const response = await fetch(
               "http://app.cotzul.com/Pedidos/getRentabilidad.php?tmes="+tmes
             );
             console.log("http://app.cotzul.com/Pedidos/getRentabilidad.php??tmes="+tmes);
             const jsonResponse= await response.json();
             setData(jsonResponse?.rentabilidad);
             console.log(jsonResponse?.rentabilidad);
             
             setLoading(true);
        } catch (error) {
            setLoading(false)
          console.log("un error cachado Data saldopedIENTEEE");
          console.log("ERROR CACHADO " + error);
        }
    };

    const sumarTotales = (datap) =>{
        for (let x = 0; x < datap.length; x++) {
            console.log("entro: "+datap[x].rt_subtotal);
            totA = totA + Number(datap[x].rt_subtotal);
            totB = totB + Number(datap[x].rt_totaldesc);
            totC = totC + Number(datap[x].rt_costoNK);
            totD = totD + Number(datap[x].rt_utilidadK);

            totE = totE + Number((datap[x].rt_subtotal/datap[x].rt_costoNK)*100);
            totF = totF + Number((datap[x].rt_totaldesc/datap[x].rt_costoNK));


        }
        setValTotA(totA);
        setValTotB(totB);
        setValTotC(totC);
        setValTotD(totD);

        setRes3(totE);
        setRes4(totF/datap.length);

        totalesFinales(datap);


    }

    const totalesFinales = (datap) =>{  
        for (let x = 0; x < datap.length; x++) {
            totG = totG + Number((datap[x].rt_subtotal/valtotA)*100);
            totH = totH + Number((datap[x].rt_utilidadK/valtotD)*100);
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
    console.log("busqueda de la rentabilidad");
    setLoading(false);
        if(tmes > 0){
            CargaDataRentabilidad(tmes);
            //setCarge(1);
        }
           
   },[tmes]);

   const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
}

   const item =({item}) =>{
     return( 
         
         <View>

          
          <View style={{flexDirection: 'row'}}>
               
                   {/*<View style={{width:165, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_subtotal).toFixed(2)}</Text>
                    </View>*/}
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_totaldesc).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_costoNK).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_utilidadK).toFixed(2)}</Text>
                    </View>
                   {/* <View style={{width:165, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rt_subtotal/valtotA)*100).toFixed(2)}%</Text>
                    </View>
                    <View style={{width:165, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rt_utilidadK/valtotD)*100).toFixed(2)}%</Text>
                    </View>
                    <View style={{width:165, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rt_subtotal/item.rt_costoNK)*100).toFixed(2)}</Text>
                </View>*/}
                    <View style={{width:70, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rt_totaldesc/item.rt_costoNK)).toFixed(2)}</Text>
                    </View>
            </View>
          
                    
            </View>
         
     )
 }

 const item2 =({item}) =>{
    return( 
        <View style={{width:100, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rt_bodega} </Text>
            </View>
           
        
    )
}

const item3 =({item}) =>{
    return( 
        <View style={{width:50, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit}>{item.rt_mes} </Text>
            </View>
           
        
    )
}

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesSubtitle}>Cotzul S.A.</Text>
                <Text style={styles.titlesTitle}>Rentabilidad actual</Text>
                <Text style={styles.titlesSubtitle}>Fecha Hoy: {getCurrentDate()}</Text>
                <Text style={styles.titlesSubtitle}></Text>
            </View>
            <View style={styles.titlesWrapper}>

            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(tmes) => setTmes(tmes)}
                placeholder={{ label: "SELECCIONAR", value: 0 }}
                items={[
                    { label: "DÍA CORRIENTE", value: 5},
                    { label: "MES CORRIENTE", value: 6 },
                    { label: "1 MES ATRÁS", value: 1},
                    { label: "3 MESES ATRÁS", value: 2 },
                    { label: "6 MESES ATRÁS", value: 3 },
                    { label: "12 MESES ATRÁS", value: 4 },
                    
                ]}
            />
            
             </View>
            
            <View style={{flexDirection: 'row'}}>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>BODEGA</Text>
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
                    <View style={{ width:50, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>MES</Text>
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
                        
                        {/*<View style={{width:165, height:35,  backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>A(TOT - DESC)</Text>
                        </View>*/}
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>B((A)+SEGURO)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>C(COST. PROM)</Text>
                    </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>D(UT. KARDEX)</Text>
                        </View>
                       {/* <View style={{width:165, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% A/T.A.</Text>
                        </View>
                        <View style={{width:165,height:35,  backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% D/T.D.</Text>
                        </View>
                        <View style={{width:165, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% A/C</Text>
                        </View>*/}
                        <View style={{width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% B/C</Text>
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
                    
                    {/*<View style={{width:165, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotA).toFixed(2)}</Text>
                    </View>*/}
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotB).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotC).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotD).toFixed(2)}</Text>
                    </View>
                   {/* <View style={{width:165, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res1).toFixed(2)}</Text>
                    </View>
                    <View style={{width:165, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res2).toFixed(2)}</Text>
                    </View>
                    <View style={{width:165, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res3).toFixed(2)}</Text>
                    </View>*/}
                    <View style={{width:70, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res4).toFixed(2)}</Text>
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
        height: 20,
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
       fontSize: 16,
       color: colors.textDark,
    },
    titlesTitle:{
        // fontFamily: 
       fontSize: 35,
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
        height: 25,
        fontWeight: "bold",
        fontSize: 10,
    },
    tablevaltit2:{
        textAlign: 'left',
        height: 25,
        fontSize: 10,
        paddingLeft: 10,
    },
    tableval:{
        textAlign: 'center',
        height: 30,
        fontSize: 12,
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



