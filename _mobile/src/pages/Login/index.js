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

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const [checked, setChecked] = useState(false);

    const handleClick = () => setChecked(!checked)

    useEffect(() => console.log('mudou'), [checked]);

    return (
        <>
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuário"
                        value={usuario}
                        autoCorrect={false}
                        onChangeText={setUsuario}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={senha}
                        autoCorrect={false}
                        onChangeText={setSenha}
                    />

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={checked}
                            onValueChange={handleClick}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Manter-me logado
                        </Text>
                    </View>

                    {/* Botão de Login */}

                    <RectButton style={styles.button} onPress={() => navigation.navigate("Search")}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>

                <View style={styles.iconGroup}>
                    <RectButton style={styles.pointItems} >
                        <Text style={[styles.buttonText, {}]}>
                            Esqueci a senha
                        </Text>
                    </RectButton>
                    <RectButton style={styles.pointItems} >
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </RectButton>
                </View>
                
                <View>
                    <RectButton style={styles.button}>
                        <Text style={styles.buttonText}>
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
        backgroundColor: '#34CB79',
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
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