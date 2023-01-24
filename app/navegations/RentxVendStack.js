import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import RentabxVendedor from "../screens/RentabxVendedor";

const Stack = createStackNavigator();
export default function RentxVendStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen 
            name="rentabilidad"
            component={RentabxVendedor}
            options={{title:"Rentabilidad x Vendedor"}} />
        </Stack.Navigator>
    );
}