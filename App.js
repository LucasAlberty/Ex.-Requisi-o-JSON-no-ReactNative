import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);

  const getAccess = async () => {
    try {
      const response = await fetch(
        'http://[nome_servidor]:[porta]/mge/service.sbr?serviceName=MobileLoginSP.login&outputType=json',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            serviceName: 'MobileLoginSP.login',
            requestBody: {
              NOMUSU: {
                $: 'SUP',
              },
              INTERNO: {
                $: 'senha_de_acesso',
              },
            },
          }),
        },
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccess();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>Retornou resposta.</Text>
      )}
    </View>
  );
};
