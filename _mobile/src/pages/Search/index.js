import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
// import { Icon } from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Location from 'expo-location';
import Constants from 'expo-constants';
import api from '../../services/api';


export default function Search() {
    // const [item, setItems] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [data, setData] = useState([]);;

    const latitude = '-23.5726135';
    const longitude = '-46.6730768';

    const [location, setLocation] = useState();
    const [currentPosition, setCurrentPosition] = useState([0, 0]);

    const navigation = useNavigation();

    const route = useRoute();

    const routeParams = route.params;

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ops', 'Precisamos de sua permissão para obter a localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setCurrentPosition([
                latitude,
                longitude
            ])
        }
        loadPosition();
        console.log(currentPosition);
    }, []);

    function handleSelectItem(id) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id]);
        }
    }

    // function buttonPress() {
    //     navigation.navigate('Home')
    // }
    const items = [
        {
            id: 0,
            name: "café",
            icon: "coffee",
        },
        {
            id: 1,
            name: "refeição",
            icon: "cutlery",
        },
        {
            id: 2,
            name: "mecânico",
            icon: "wrench",
        },
        {
            id: 3,
            name: "clinica",
            icon: "heartbeat",
        },
        {
            id: 4,
            name: "combustível",
            icon: "battery-full",
        },
        {
            id: 5,
            name: "hospedagem",
            icon: "bed",
        },
        {
            id: 6,
            name: "banheiro",
            icon: "bath",
        }
    ];

    const buttonPress = () => {

        navigation.navigate('Home', {
            busca: '/estabelecimentos',
            latitude: latitude,
            longitude: longitude,
        });

    };

    // useEffect(() => {
    //     api.get('/users')
    //         .then(async response => {
    //             const dat = await response.data;
    //             setData(dat);
    //             // setData(response.data);
    //             console.log(data.city);
    //         });
    // }, []);
    
    // useEffect(() => {
    //     api.get(`points/${routeParams.point_id}`).then(response => {
    //     setData(response.data);
    //     });
    // }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    // useEffect(() => {
    //     fetch(`https://climacell-microweather-v1.p.rapidapi.com/weather/realtime?unit_system=si&fields=temp&lat=${latitude}&lon=${longitude}`, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "e552d0b514msh56c28c0f6176d11p1d5bd6jsn1c6ef3505e16"
    //         }
    //     })
    //     .then(async response => {
    //         const data = await response.json();
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
        
    // }, [latitude]);

    return (
        <View style={styles.container}>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                <View style={{ borderWidth: 2, borderColor: 'gray' }}>
                    <Text>AMIGOS DO TAPETÃO</Text>
                </View>
                <View style={{ borderWidth: 2, borderColor: 'gray' }}>
                    <Image source={require('../../assets/estrada.jpeg')} />
                </View>

            </View>
            
            <View style={[styles.iconGroup, { borderTopWidth: 2, borderTopColor: 'gray' }]}>

                {items.map(item => (
                        <RectButton
                            key={String(item.id)}
                            style={
                                selectedItems.includes(item.id) ? styles.selectedItem : styles.pointItems
                            }
                            onPress={()=> handleSelectItem(item.id)}
                        >   
                            {/* <Icon name="user-astronaut" size={20} color="#A6A6A6" /> */}
                            {/* <Icon name={item.name} type="material" color='#FFF' /> */}
                            <FontAwesome name={item.icon} size={20} color='#FFF' />
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