import React,{useState, useEffect, useContext} from "react";
import { Input, Icon} from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Modal, SafeAreaView, Button, Platform } from 'react-native'
import { colors, CheckBox } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Picker from '@ouroboros/react-native-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";


export default function Rentabilidad() {
    const [cabecera, setCabecera] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [day1, setDay1] = useState(new Date())
    const [day2, setDay2] = useState(new Date())

    const [carge, setCarge] = useState(0);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
    };

    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };

    const handleConfirm1 = (date) => {
       
        hideDatePicker1();
        setDay1(date);
      };

      const handleConfirm2 = (date) => {
       
        hideDatePicker2();
        setDay2(date);
      };

      useEffect(() => {
        console.log("Actual valor: "+day1)
      }, [day1])

      useEffect(() => {
        console.log("Actual valor: "+day2)
      }, [day2])
      


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
    let [picker, setPicker] = useState(0);

    const CargaDataRentabilidadxCliente = async () => {
        try {
            setLoading2(false);
            const response = await fetch(
               "http://app.cotzul.com/Pedidos/getRentaxCliente.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2)
             );
             console.log("http://app.cotzul.com/Pedidos/getRentaxCliente.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2));
             const jsonResponse = await response.json();
             setData3(jsonResponse?.rentaxcliente);
             console.log(jsonResponse?.rentaxcliente);
             
             setLoading2(true);
        } catch (error) {
            setLoading2(false)
          console.log("un error cachado Data Cliente");
          console.log("ERROR CACHADO " + error);
        }
    };

      //CargaRentabilidad - Rentabilidad Vendedores
    const CargaDataRentabilidadxVendedor = async () => {
        try {
            setLoading1(false);
            const response = await fetch(
               "http://app.cotzul.com/Pedidos/getRentaxVendedor2.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2)
             );
             console.log("http://app.cotzul.com/Pedidos/getRentaxVendedor2.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2));
             const jsonResponse = await response.json();
             setData2(jsonResponse?.rentaxvend);
             console.log(jsonResponse?.rentaxvend);
             
             setLoading1(true);
        } catch (error) {
            setLoading1(false)
          console.log("un error cachado Data saldopedIENTEEE");
          console.log("ERROR CACHADO " + error);
        }
    };

    const CargaDataRentabilidad = async () => {
        try {
            setLoading(false);
            const response = await fetch(
               "https://app.cotzul.com/Pedidos/getRentabilidad2.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2)
             );
             console.log("https://app.cotzul.com/Pedidos/getRentabilidad2.php?fechaini="+formatDate(day1)+"&fechafin="+formatDate(day2));
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
        if(picker == 1){
            for (let x = 0; x < datap.length; x++) {
                console.log("entro: "+datap[x].rt_totaldesc);
                totA = totA + Number(datap[x].rt_subtotal);
                console.log("sale: "+Number(datap[x].rt_subtotal));
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
            setRes4(totB/totC);

            totalesFinales(datap);
        }else if(picker == 2){
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
        }else if(picker == 3){
            for (let x = 0; x < datap.length; x++) {
                console.log("entro: "+datap[x].rc_subtotal);
                totA = totA + Number(datap[x].rc_subtotal);
                totB = totB + Number(datap[x].rc_totalmedesc);
                totC = totC + Number(datap[x].rc_costoNK);
                totD = totD + Number(datap[x].rc_utilidadK);
    
            }
            setValTotA(totA);
            setValTotB(totB);
            setValTotC(totC);
            setValTotD(totD);
            setRes3((totA/totC)*100);
            setRes4((totB/totC)*100);
    
            totalesFinales(datap);
        }


    }

    const totalesFinales = (datap) =>{ 
        if(picker == 1) {
            for (let x = 0; x < datap.length; x++) {
                totG = totG + Number((datap[x].rt_subtotal/valtotA)*100);
                totH = totH + Number((datap[x].rt_utilidadK/valtotD)*100);
            }
            setRes1(totG);
            setRes2(totH);
        }else if(picker == 2){
            for (let x = 0; x < datap.length; x++) {
                totG = totG + Number((datap[x].rv_subtotal/valtotA)*100);
                totH = totH + Number((datap[x].rv_utilidadK/valtotC)*100);
            }
            setRes1(totG);
            setRes2(totH);
        }else if(picker == 3){
            for (let x = 0; x < datap.length; x++) {
                totG = totG + Number((datap[x].rc_subtotal/valtotA)*100);
                totH = totH + Number((datap[x].rc_totalmedesc/valtotD)*100);
                totE = totE + Number((datap[x].rc_costoNK == 0)?0:(datap[x].rc_subtotal/datap[x].rc_costoNK));
                totF = totF + Number((datap[x].rc_costoNK == 0)?0:(datap[x].rc_totalmedesc/datap[x].rc_costoNK));
            }
            setRes1(totG);
            setRes2(totH);
            setRes3(totE);
            setRes4(totF);
        }
    }  

    useEffect(() => {
        if(picker == 3 && valtotA != 0){
            for (let x = 0; x < data3.length; x++) {
                totG = totG + Number((data3[x].rc_subtotal/valtotA)*100);
                totH = totH + Number((data3[x].rc_totalmedesc/valtotD)*100);
                totE = totE + Number((data3[x].rc_costoNK == 0)?0:(data3[x].rc_subtotal/data3[x].rc_costoNK));
                totF = totF + Number((data3[x].rc_costoNK == 0)?0:(data3[x].rc_totalmedesc/data3[x].rc_costoNK));
            }
            setRes1(totG);
            setRes2(totH);
            setRes3(totE);
            setRes4(totF);

            console.log("se cargo :"+valtotA);
        }
    }, [valtotA])
    

    useEffect(()=>{
        if(data != null){
            if(data.length>0)
                sumarTotales(data);
        }
    },[data]);

    useEffect(()=>{
        if(data2 != null){
            if(data2.length>0)
            sumarTotales(data2);
        }
        
    },[data2]);

    useEffect(()=>{
        if(data3 != null){
            if(data3.length>0)
            sumarTotales(data3);
        }
        
    },[data3]);

    useEffect(() => {
        setData([]);
        setData2([]);
        setValTotA(0);
        setValTotB(0);
        setValTotC(0);
        setValTotD(0);
        setRes1(0);
        setRes2(0);
        setRes3(0);
        setRes4(0);
    }, [picker])
    

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
      };



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
          {(picker == 1) ?
          <View style={{flexDirection: 'row'}}>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_totaldesc).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_costoNK).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(item.rt_utilidadK).toFixed(2)}</Text>
                    </View>
                    <View style={{width:70, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number((item.rt_totaldesc/item.rt_costoNK)).toFixed(2)}</Text>
                    </View>
            </View>: (picker == 2)?  <View style={{flexDirection: 'row'}}>
               
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
       </View>: (picker == 3)?  <View style={{flexDirection: 'row'}}>
               
               <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}>$ {Number(item.rc_subtotal).toFixed(2)}</Text>
               </View>
               <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}>$ {Number(item.rc_totalmedesc).toFixed(2)}</Text>
               </View>
               <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}>$ {Number(item.rc_costoNK).toFixed(2)}</Text>
               </View>
               <View style={{width:70, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}>{Number((item.rc_utilidadK)).toFixed(2)}</Text>
               </View>
               {(valtotA != 0)?<View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}> {Number((item.rc_subtotal/valtotA)*100).toFixed(2)} %</Text>
               </View>:<></>}
               
               {(valtotB != 0)? <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}> {Number((item.rc_totalmedesc/valtotB)*100).toFixed(2)} %</Text>
               </View>:<></>}
               <View style={{width:100, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}> {(item.rc_costoNK != 0)? Number((item.rc_subtotal/item.rc_costoNK)).toFixed(2):(0).toFixed(2)} %</Text>
               </View>
               <View style={{width:70, height:35,  backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                   <Text style={styles.tableval}>{(item.rc_costoNK != 0)? Number((item.rc_totalmedesc/item.rc_costoNK)).toFixed(2):(0).toFixed(2)} %</Text>
               </View>
       </View>:<></>}
          
                    
            </View>
         
     )
 }

 const item2 =({item}) =>{
    return( 
       <>
       {(picker == 1)? 
        <View style={{width:100, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rt_bodega} </Text>
            </View>:(picker == 2)?<View style={{width:70, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rv_tipo} </Text>
            </View>:(picker == 3)?<View style={{width:70, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rc_cliente} </Text>
            </View>:<></>}
            </>
           
        
    )
}

const item3 =({item}) =>{
    return( 
        <>
        {(picker == 1)? 
        <View style={{width:50, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit}>{item.rt_mes} </Text>
            </View>:(picker == 2)?<View style={{width:100, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rv_nombvendedor} </Text>
            </View>:(picker == 3)?<View style={{width:100, height:35, backgroundColor:'white', borderColor: 'black', borderWidth: 1}}>
                <Text style={styles.tablevaltit2}>{item.rc_nombrecliente} </Text>
            </View>:<></>}
            </>
           
        
    )
}

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesSubtitle}>Cotzul S.A.</Text>
                <Text style={styles.titlesTitle}>Rentabilidad</Text>
                <Text style={styles.titlesSubtitle}>Fecha Hoy: {getCurrentDate()}</Text>
                <Text style={styles.titlesSubtitle}></Text>
            </View>
            <View style={styles.titlesWrapper}>


        <Picker
              onChanged={setPicker}
              options={[
                  {value: 0, text: 'SELECCIONA TIPO RENTABILIDAD'},
                  {value: 1, text: 'RENT. ACTUAL'},
                  {value: 2, text: 'RENT. VENDEDOR'},
                  {value: 3, text: 'RENT. X CLIENTE'},
              ]}
              style={{borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5, backgroundColor: "#6f4993", color: 'white', alignItems: 'center', marginHorizontal: 0}}
              value={picker}
          /><Button color={"#6f4993"} title={"Fecha Ini: "+ day1.toLocaleDateString()} onPress={showDatePicker1} />

            <View style={styles.containerdate}>
                
            <Button color={"#6f4993"} title={"Fecha Fin: "+ day2.toLocaleDateString()} onPress={showDatePicker2} />
            </View>
             

             <Button color={"#6f4993"} title={"BUSCAR RENTABILIDAD"} onPress={(picker == 1)?CargaDataRentabilidad:(picker == 2)?CargaDataRentabilidadxVendedor:(picker == 3)?CargaDataRentabilidadxCliente:null} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="date"
                date={day1}
                color={"#6f4993"} 
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
            />

        

            <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                date={day2}
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
            />

           
            
             </View>
            {(picker == 1)?
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
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>B((A)+SEGURO)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>C(COST. PROM)</Text>
                    </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>D(UT. KARDEX)</Text>
                        </View>
                      
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
                    
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotB).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotC).toFixed(2)}</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>$ {Number(valtotD).toFixed(2)}</Text>
                    </View>
                    <View style={{width:70, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res4).toFixed(2)}</Text>
                    </View>
                   
          </View>
          </View>
          
            </ScrollView>
            </View>: (picker == 2) ? <View style={{flexDirection: 'row'}}>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>TIPO</Text>
                    </View>
                   
                    {loading1 ? (<FlatList 
                    data={data2}
                    renderItem = {item2}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading1}/>}
                      
                </View>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>VENDEDOR</Text>
                    </View>
                   
                    {loading1 ? (<FlatList 
                    data={data2}
                    renderItem = {item3}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading1}/>}
                      
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
            
            {loading1 ? (<FlatList 
                    data={data2}
                    renderItem = {item}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading1}/>}



        
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
            </View> : (picker == 3) ? <View style={{flexDirection: 'row'}}>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>CODIGO</Text>
                    </View>
                   
                    {loading2 ? (<FlatList 
                    data={data3}
                    renderItem = {item2}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading2}/>}
                      
                </View>
                <View style={{borderColor: 'black', marginRight:-20, marginLeft:20,  marginTop:10}}>
                    <View style={{ width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tablevaltit}>CLIENTE</Text>
                    </View>
                   
                    {loading2 ? (<FlatList 
                    data={data3}
                    renderItem = {item3}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading2}/>}
                      
                </View>
           

            <ScrollView horizontal style={{ marginHorizontal:20, marginTop:10, marginBottom: 30}}>
                <View>
                <View style={{flexDirection: 'row'}}>
                        
                        <View style={{width:100, height:35,  backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>A(TOT - DESC)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>B(A + SEGURO)</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>C(COST. PROM KARDEX)</Text>
                        </View>
                        <View style={{width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>D(UTILIDAD KARDEX)</Text>
                        </View>  

                        <View style={{width:100, height:35,  backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% A/T.A</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% D/T.D</Text>
                        </View>
                        <View style={{width:100, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% A/C</Text>
                        </View>
                        <View style={{width:70, height:35, backgroundColor:'yellow', borderColor: 'black', borderWidth: 1}}>
                            <Text style={styles.tablevaltit}>% B/C</Text>
                        </View>                
            </View>
            
            {loading2 ? (<FlatList 
                    data={data3}
                    renderItem = {item}
                    keyExtractor = {(item, index)=> index.toString()}
                />) : <ActivityIndicator
                      size="large" 
                      loading={loading2}/>}



        
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
                        <Text style={styles.tableval}>$ {Number(valtotD).toFixed(2)}</Text>
                    </View>

                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res1).toFixed(2)} %</Text>
                    </View>

                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res2).toFixed(2)} %</Text>
                    </View>
                    <View style={{width:100, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res3).toFixed(2)} %</Text>
                    </View>

                    <View style={{width:70, backgroundColor:'lightgrey', borderColor: 'black', borderWidth: 1}}>
                        <Text style={styles.tableval}>{Number(res4).toFixed(2)} %</Text>
                    </View>

                   
          </View>
          </View>
          
            </ScrollView>
            </View>:<></>}

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
    containerdate:{
        flexDirection: 'column',
        paddingBottom: 10,
        marginVertical: 10,
    },
    buttonStyle: {
        marginBottom: 50, // Ajusta este valor según tus necesidades
      },
    containerdate2:{
        flexDirection: 'column',
        paddingBottom: 10,
        marginVertical: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 12,
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
       fontSize: 25,
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
        height: 60,
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



