import React, {useEffect, useState, Component} from 'react'
import { StyleSheet, Modal, Text, View, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import  ModalCheques from './ModalCheques';


export default function DetEstCtaCharge(props) {
    const [loading, setLoading] = useState(false);
    const [datacab, setDatacab] = useState([]);
    const [datadet, setDataDet] = useState([]);
    const {idcliente} = props;
    const [totalfact, setTotalFact] = useState(0)
    

    var totfact = 0;

    const CargarDataEstCuenta = async () => {
      try {
        setLoading(false);
        console.log("data del cliente ID: "+ idcliente);
        const responsecta = await fetch(
          "https://app.cotzul.com/Pedidos/getEstadosCuentaStore.php?idcliente="+idcliente
        );
        console.log("https://app.cotzul.com/Pedidos/getEstadosCuentaStore.php?idcliente="+idcliente);
        const jsonResponsecta = await responsecta.json();
        console.log("Valor de la carga: " + jsonResponsecta?.cabestcuenta[0].cb_cliente);
        setDatacab(jsonResponsecta?.cabestcuenta);
        setDataDet(jsonResponsecta?.dtaestcuenta);
        if(jsonResponsecta!=null)
          setLoading(true);
        
      } catch (error) {
        setLoading(false);
        console.log("un error cachado estado de cuenta");
        console.log(error);
      }
  };


    useEffect(() => {
      CargarDataEstCuenta();
    }, []);


    const item =({item}) =>{
        return(<View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width:330, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{item.cb_clcod}-{item.cb_cliente}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width:330, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}> {item.cb_provincia}-{item.cb_ciudad}</Text>
                    </View>
                </View>
                  
                   
                    <View style={{flexDirection: 'row'}}>
                    <View style={{width:330, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}><Text style={styles.tablevaltit}>TOT. CUPO: $</Text> {Number(item.cb_cupototal).toFixed(2)}</Text>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <View style={{width:330, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}><Text style={styles.tablevaltit}>CUPO. DISP: $</Text> {Number(item.cb_cupodisp).toFixed(2)}</Text>
                    </View>
                </View> 

                <View style={styles.titlesWrapper2}>
                     <Text style={styles.tabletitle}>{item.cb_tipodoc}</Text>
            </View>  
        </View>)
    }

    const item2=({item}) =>{
      
        return(<View>
          <View style={{flexDirection: 'row'}}>
                    <View style={{width:330, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevalm}> <Text style={styles.tablevaltit}>SRI:</Text> {item.dt_sri} - <Text style={styles.tablevaltit}>FECHA FACT.:</Text> {item.dt_fechadoc}</Text>
                        <Text style={styles.tablevalm}> <Text style={styles.tablevaltit}>VENDEDOR: </Text>{item.dt_vendedor}</Text>
                    </View>
          </View>
          <View style={{flexDirection: 'row'}}>
                    <View style={{width:84, backgroundColor:'lightgray', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>TIPO DOC.</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'lightgray', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>VALOR FACT.</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'lightgray', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>SALDO FACT.</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'lightgray', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>DET. CHEQUE</Text>
                    </View>
          </View>
          <View style={{flexDirection: 'row'}}>
                    <View style={{width:84, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{item.dt_etiquetadoc}</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {item.dt_total}</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {item.dt_saldo}</Text>
                    </View>
                    <View style={{width:82, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <ModalCheques idcliente={idcliente} codfact={item.dt_sri}></ModalCheques>
                    </View>
          </View>
              <View style={{flexDirection: 'row'}}>
                   
                    <View style={{width:330, backgroundColor:'lightgray', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>{item.dt_factem}</Text>
                    </View>
                </View>   
        </View>)
    }

   
        
        


    return (
        <View style={{marginTop:10, width: 330}}>
            <View style={styles.titlesWrapper2}>
                <Text style={styles.tabletitle}>Cabecera de cuentas</Text>
            </View>
              
              {loading ? (<FlatList 
                  data={datacab}
                  renderItem = {item}
                  keyExtractor = {(item, index)=> index.toString()}
              />) : (<ActivityIndicator
                    size="large" 
                    loading={loading}/>)}
            
              
              {loading ? (<FlatList 
                  data={datadet}
                  renderItem = {item2}
                  keyExtractor = {(item, index)=> index.toString()}
              />) : (<ActivityIndicator
                    size="large" 
              loading={loading}/>)}
              <View style={{flexDirection: 'row'}}>
                 
                 <View style={{width:330, backgroundColor:'gray', borderColor: 'black', borderWidth: 1}}>
                     <Text style={styles.tabletitle}>TOT. FACTURADO: $ {Number.parseFloat(totalfact).toFixed(2)}</Text>
                 </View>
             </View>  
            
            
            </View>
    )

    const calculartotalfact = () =>{
    console.log("@entro@");
    for (let x = 0; x < datadet.length; x++) {
        console.log("paso entro");
        totfact = Number(totfact) + Number(datadet[x].dt_total);
    }
    setTotalFact(totfact);
  }


  useEffect(() => {
    if(datadet.length > 0) {
       
      calculartotalfact();
    }
}, [datadet]);

}




const styles = StyleSheet.create({

    tabletitle:{
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,
        fontSize: 12,
    },
    tabletext:{
        fontSize: 12,
    },
    tablevalm:{
        textAlign: 'center',
        fontSize: 10,
        paddingVertical:5,
        paddingHorizontal: 5,
    },
    tableval:{
        textAlign: 'center',
        height: 30,
        fontSize: 10,
        paddingVertical:5,
        paddingHorizontal: 5,
    },
    tablevalb:{
      textAlign: 'center',
      height: 30,
      fontSize: 12,
      paddingHorizontal: 5,
  },
  titlesWrapper2:{
    width: "100%",
    paddingHorizontal: 20,
    marginTop:15,
    marginBottom:15,
},
tablevaltit:{
    textAlign: 'center',
    height: 35,
    fontWeight: "bold",
    fontSize: 10,
},

})
