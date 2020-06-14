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

    const latitude = '-25.3445817';
    const longitude = '-49.2777131';

    const [location, setLocation] = useState();
    const [currentPosition, setCurrentPosition] = useState([0, 0]);

    const navigation = useNavigation();

    const route = useRoute();

    const routeParams = route.params;

    
    const [combustivel, setCombustivel] = useState(0);
    const [aberto_24h, setAberto_24h] = useState(0);
    const [raio_dez_km, setRaio_dez_km] = useState(0);
    const [wifi, setWifi] = useState(0);
    const [refeicao, setRefeicao] = useState(0);
    const [cafe, setCafe] = useState(0);
    const [banheiro, setBanheiro] = useState(0);
    const [saude, setSaude] = useState(0);
    const [estacionamento, setEstacionamento] = useState(0);


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

        switch (id) {
            case 0:
                if(cafe) {
                    setCafe(0);
                }else {
                    setCafe(1);
                }
            break;
            case 1:
                if(refeicao) {
                    setRefeicao(0);
                }else {
                    setRefeicao(1);
                }
            break;
            case 2:
                if(saude) {
                    setSaude(0);
                }else {
                    setSaude(1);
                }
            break;
            case 3:
                if(combustivel) {
                    setCombustivel(0);
                }else {
                    setCombustivel(1);
                }
            break;
            case 4:
                if(wifi) {
                    setWifi(0);
                }else {
                    setWifi(1);
                }
            break;
            case 5:
                if(banheiro) {
                    setBanheiro(0);
                }else {
                    setBanheiro(1);
                }
            break;
            case 6:
                if(estacionamento) {
                    setEstacionamento(0);
                }else {
                    setEstacionamento(1);
                }
            break;
            case 7:
                if(aberto_24h) {
                    setAberto_24h(0);
                }else {
                    setAberto_24h(1);
                }
            break;
            case 8:
                if(banhoraio_dez_km) {
                    setRaio_dez_km(0);
                }else {
                    setRaio_dez_km(1);
                }
            break;
            default:
                break;
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
            name: "clinica",
            icon: "heartbeat",
        },
        {
            id: 3,
            name: "combustível",
            icon: "battery-full",
        },
        {
            id: 4,
            name: "wifi",
            icon: "wifi",
        },
        {
            id: 5,
            name: "banheiro",
            icon: "bath",
        }
    ];

    const buttonPress = () => {

        navigation.navigate('Home', {
            busca: '/estabelecimentos',
            latitude: latitude,
            longitude: longitude,
            combustivel: combustivel,
            aberto_24h: aberto_24h,
            raio_dez_km: raio_dez_km,
            wifi: wifi,
            refeicao: refeicao,
            cafe: cafe,
            banheiro: banheiro,
            saude: saude,
            estacionamento: estacionamento,
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
            
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                <View>
                    <View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Icon name="user" size={20} color='black' />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={require('../../assets/logo.png')} style={{ alignSelf: 'center', width: "80%", height: "20%"}} />
            
            <View style={styles.iconGroup}>

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
                            <FontAwesome name={item.icon} size={20} color='black' />
                            <Text style={styles.buttonText}>{item.name}</Text>
                        </RectButton>
                ))}

            </View>

                <RectButton style={styles.button} onPress={buttonPress}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="black" size={24} />
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
        // justifyContent: 'center',
    },

    iconGroup: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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
    
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: '#f9f6f7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    pointItems: {
      fontSize: 16,
      marginTop: 8,
      width: '32%',
      backgroundColor: 'white',
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
        backgroundColor: 'gray',
        borderRadius: 10,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#34CB79',
        borderWidth: 2,
      },
});