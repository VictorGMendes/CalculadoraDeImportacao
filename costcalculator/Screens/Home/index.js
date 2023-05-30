import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

const Home = () => {
    const [peso, setPeso] = useState("");
    const [valorY, setValorY] = useState("");
    const [envio, setEnvio] = useState('JW');
    const [cotacao, setCotacao] = useState("");

    const [valorR, setValorR] = useState();
    const [freteY, setFreteY] = useState('');
    const [freteR, setFreteR] = useState('');


    const converter = () => {
        setValorR( parseFloat(valorY) / parseFloat(cotacao))
    }

    const calcularFrete = () => {
        let valorPrimeiroPeso, valorSegundoPeso, primeiroPeso;
    
        if (envio === "JW") {
          valorPrimeiroPeso = 68;
          valorSegundoPeso = 14.5;
          primeiroPeso = 100;
        } else if (envio === "FJ") {
          valorPrimeiroPeso = 60;
          valorSegundoPeso = 14;
          primeiroPeso = 100;
        } else if (envio === "BJ") {
          valorPrimeiroPeso = 160;
          valorSegundoPeso = 63;
          primeiroPeso = 1000;
        }
    
        let freteY;
        if (peso % primeiroPeso !== 0) {
          freteY = (Math.floor(peso / primeiroPeso) * valorSegundoPeso) + valorPrimeiroPeso;
        } else {
          freteY = ((Math.floor(peso / primeiroPeso) - 1) * valorSegundoPeso) + valorPrimeiroPeso;
        }
    
        const freteR = converter(freteY, cotacao);
        setFreteY(freteY);
        setFreteR(freteR);
      };
    

    return(
        <View>
            <TextInput
            placeholder="1000"
            value={peso}
            onChangeText={setPeso}
            />

            <TextInput
            placeholder="100"
            value={valorY}
            onChangeText={setValorY}
            />
            
            <Picker
            selectedValue={envio}
            onValueChange={(itemValue) => setEnvio(itemValue)}
            >
                <Picker.Item label="JW" value="JW" />
                <Picker.Item label="FJ" value="FJ" />
                <Picker.Item label="BJ" value="BJ" />
            </Picker>
            
            <TextInput
            placeholder="1.25"
            value={cotacao}
            onChangeText={setCotacao}
            />

            <TouchableOpacity title="calcular" onPress={calcularFrete}>
                <Text>
                    top botoes
                </Text>
            </TouchableOpacity>

            <Text>{freteR}</Text>
        </View>
    )
};

export {Home};