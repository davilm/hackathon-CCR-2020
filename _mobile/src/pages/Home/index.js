import * as React from 'react';
import { View,ScrollView, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Constants from 'expo-constants';
import Card from '../../components/card';

export default function Home() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Icon name="arrow-left" size={20} color='#34cb79' />
            </TouchableOpacity>
            <Card
                classe='BR 116 - Fortaleza, CE'
                description='Ponto de Parada'
                data='Thu, Jun 6'
                type='Test'
                val='1'
                cor="#262673"
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