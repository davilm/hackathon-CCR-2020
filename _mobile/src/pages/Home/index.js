import React, { useState } from 'react';
import { View,ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

import Constants from 'expo-constants';
import Card from '../../components/card';

export default function Home() {
    const [data, setData] = useState([]);;

    const navigation = useNavigation();

    const route = useRoute();

    const routeParams = route.params;

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