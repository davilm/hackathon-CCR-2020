import React, { useState, useEffect } from 'react';
import { View,ScrollView, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

import Constants from 'expo-constants';
import Card from '../../components/card';
import api from '../../services/api';

export default function Home() {
    const [data, setData] = useState([]);;

    const navigation = useNavigation();

    const route = useRoute();

    const routeParams = route.params;

    // useEffect(() => {
	// 	console.log(routeParams.busca);
    // }, [routeParams]);
    
    // useEffect(() => {
    //     api.get('/estabelecimentos-todos', {
    //         // params: {
    //         //     nome: routeParams.nome,
    //         //     endereco: routeParams.endereco,
    //         //     cidade: routeParams.cidade,
    //         //     cidade: routeParams.cidade,

    //         // }
    //     }).then(response => {
    //         console.log(response.data);
    //         setData(response.data);
    //     });
    // }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                <View>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name="arrow-left" size={20} color='black' />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Icon name="user" size={20} color='black' />
                    </TouchableOpacity>
                </View>
            </View>
            <Card
                val='3'
            />

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 20 + Constants.statusBarHeight,
    },
});