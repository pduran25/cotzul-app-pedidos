import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Rentabilidad from "../screens/Rentabilidad";

const Stack = createStackNavigator();
export default function RentableStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen 
            name="rentabilidad"
            component={Rentabilidad}
            options={{title:"Rentabilidad"}} />
        </Stack.Navigator>
    );
}