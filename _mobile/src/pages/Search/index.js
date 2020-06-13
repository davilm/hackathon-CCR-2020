import React, { useState, useEffect } from 'react';

import { View,ScrollView, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Constants from 'expo-constants';


export default function Search() {
    const [selectedItems, setSelectedItems] = useState([]);

    const navigation = useNavigation();

    function handleSelectItem(id) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id]);
        }
    }

    function buttonPress() {
        navigation.navigate('Home')
    }
    const items = [
        {
            id: 0,
            name: "cama",
        },
        {
            id: 1,
            name: "combustivel",
        },
        {
            id: 2,
            name: "restaurante",
        },
        {
            id: 3,
            name:"banho",
        },
        {
            id: 4,
            name:"wifi",
        },
        {
            id: 5,
            name: "oficina",
        },
        {
            id: 6,
            name: "borracharia",
        }
    ];

    return (
        <View style={styles.container}>

            <View style={styles.iconGroup}>

                {items.map(item => (
                        <RectButton
                            key={String(item.id)}
                            style={
                                
                                selectedItems.includes(item.id) ? styles.selectedItem : styles.pointItems
                            }
                            onPress={()=> handleSelectItem(item.id)}
                        >
                            <Icon name="bell" size={20} color='#FFF' />
                            <Text style={styles.buttonText}>{item.name}</Text>
                        </RectButton>
                ))}

            </View>

                <RectButton style={styles.button} onPress={buttonPress}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </View>
                        <Text style={[styles.buttonText, { flex:1 }]}>
                            Pesquisar
                        </Text>
                </RectButton>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 36,
        paddingTop: 20 + Constants.statusBarHeight,
        justifyContent: 'center',
    },

    iconGroup: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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
    
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    pointItems: {
      fontSize: 16,
      marginTop: 8,
      width: '32%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    selectedItem: {
        fontSize: 16,
        marginTop: 8,
        width: '32%',
        backgroundColor: 'red',
        borderRadius: 10,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#34CB79',
        borderWidth: 2,
      },
});