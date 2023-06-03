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

    const [taxaY, setTaxaY] = useState('');
    const [taxaR, setTaxaR] = useState('');

    const [somaY, setSomaY] = useState('');
    const [somaR, setSomaR] = useState('');

    const [toggleSeguro, setToggleSeguro] = useState(false)
    const [seguroY, setSeguroY] = useState('');
    const [seguroR, setSeguroR] = useState('');

    const converterValor = () => {
      setValorR( parseFloat(valorY) / parseFloat(cotacao));
    }

    const calcularFrete = () => {

      let valorPrimeiroPeso, valorSegundoPeso, primeiroPeso;
  
      if (envio === "JW") {
        valorPrimeiroPeso = 68;
        valorSegundoPeso = 12.5;
        primeiroPeso = 100;
      } else if (envio === "FJ") {
        valorPrimeiroPeso = 60;
        valorSegundoPeso = 11;
        primeiroPeso = 100;
      } else if (envio === "BJ") {
        valorPrimeiroPeso = 160;
        valorSegundoPeso = 63;
        primeiroPeso = 1000;
      }
  
      let freteY;
      if (peso % primeiroPeso !== 0) {
        freteY = parseFloat((peso / primeiroPeso) * valorSegundoPeso) + valorPrimeiroPeso;
      } else {
        freteY = parseFloat(((peso / primeiroPeso) - 1) * valorSegundoPeso) + valorPrimeiroPeso;
      }
  
      const freteR = freteY / parseFloat(cotacao);
      setFreteY(freteY);
      setFreteR(freteR);

      };

    const calcularTaxa = () => {
      let taxaY = valorY / 100 * 4
      setTaxaY(taxaY)
      setTaxaR(taxaY / cotacao)
    }  

    const somar = () => {
      let somaY = parseFloat(taxaY) +parseFloat( valorY )+ parseFloat(freteY)
      let seguroY = parseFloat(somaY) * 0.03
      setSeguroY(seguroY)
      setSeguroR(seguroY / cotacao)
      setSomaY(somaY + seguroY)
      setSomaR((somaY + seguroY) / cotacao)

    }

    const executar = () => {
        converterValor();
        calcularFrete();
        calcularTaxa();
        somar();
    }

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

        <TouchableOpacity title="calcular" onPress={executar}>
            <Text>
                top botoes
            </Text>
        </TouchableOpacity>
        <Text>frete Y {freteY}</Text>
        <Text>frete bR {freteR}</Text>
        <Text>valor Y {valorY}</Text>
        <Text>valor R {valorR}</Text>
        <Text>taxa Y {taxaY}</Text>
        <Text>taxa R {taxaR}</Text>
        <Text>seguro Y {seguroY}</Text>
        <Text>seguro R {seguroR}</Text>
        <Text>soma Y {somaY}</Text>
        <Text>soma R {somaR}</Text>
    </View>
  )
};

export {Home};