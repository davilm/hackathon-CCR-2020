import React, { useState, useEffect } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    SafeAreaView,
    Linking,
    Platform,
    TextInput,
    CheckBox
} from 'react-native';
import Constants from 'expo-constants';
import api from '../../services/api';

const Login = () => {
    const navigation = useNavigation();

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [items, setItems] = useState("");

    const [checked, setChecked] = useState(false);

    const handleClick = () => setChecked(!checked)

    async function handleSubmit() {        

        const data = new FormData();
        
        data.append('cpfCnpj', login);
        data.append('senha', senha);
        alert('Conecte-se com a internet');
        console.log('CONSOLE');
        loginUser(data);
        console.log('CONSOLE2');

        const respons = await api.post('/autenticar', data);
        
        console.log('CONSOLE');
        console.log(respons);
        alert('Ponto de coleta criado!');
    }
    
    return (
        <>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={{ alignSelf: 'center', width: '70%', height: '20%', resizeMode: 'stretch', }} />
                <View>
                    <TextInput
                        style={[styles.input, { marginTop: 60}]}
                        placeholder="CPF / CNPJ"
                        value={login}
                        autoCorrect={false}
                        onChangeText={setLogin}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        value={senha}
                        secureTextEntry
                        autoCorrect={false}
                        onChangeText={setSenha}
                    />

                    {/* <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={checked}
                            onValueChange={handleClick}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Manter-me logado
                        </Text>
                    </View> */}

                    {/* Botão de Login */}

                    <RectButton style={[styles.button, { marginTop: 20 }]} onPress={() => handleSubmit()}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="black" size={24} />
                            </Text>
                        </View>
                        <Text style={[styles.buttonText, { color: 'black' }]}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>

                <View style={styles.iconGroup}>

                    {/* Esqueci a senha */}
                    {/* <RectButton style={styles.pointItems} >
                        <Text style={[styles.buttonText, {}]}>
                            Esqueci a senha
                        </Text>
                    </RectButton> */}

                    {/* Cadastrar */}
                    {/* <RectButton style={styles.pointItems}>
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </RectButton> */}
                </View>
                
                <View>
                    {/* Entrar sem cadastro */}
                    <RectButton style={styles.button} onPress={() => navigation.navigate("Search")}>
                        <Text style={[styles.buttonText, { color: 'black' }]}>
                            Entrar sem cadastro
                        </Text>
                    </RectButton>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    textContainer: {
        // width: '80%',
        // height: 51,
        // flexDirection: "row",
    },

    checkboxContainer: {
        marginTop: 20,
        flexDirection: "row",
        marginBottom: 20,
    },

    label: {
        margin: 8,
    },

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
      },
    
    button: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: '#f9f6f7',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
    },
    iconGroup: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    pointItems: {
        fontSize: 16,
        width: '45%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
      },
});
export default Login;