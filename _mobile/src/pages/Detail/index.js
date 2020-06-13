import React, { useState, useEffect } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, SafeAreaView, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';
import api from '../../services/api';

const Detail = () => {
    const [data, setData] = useState({});
    const [icon, setIcon] = useState({});
    const navigation = useNavigation();

    const image = "https://www.trucks.com/wp-content/uploads/2017/10/truckstops.jpg";

    const [location, setLocation] = useState([-23.5726135, -46.6730768]);

    // useEffect(() => {
    //     api.get('/users').then(response => {
    //         setData(response.data);
    //         console.log(services.combustivel.icon)

    //     });
    // }, []);

    // const navigation = useNavigation();
    // const route = useRoute();

    // const routeParams = route.params;
    
    // useEffect(() => {
    //     api.get(`points/${routeParams.point_id}`).then(response => {
    //     setData(response.data);
    //     });
    // }, []);
    // function handleNavigateBack() {
    //     navigation.goBack();
    // }


    function openGps() {
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      var url = scheme + `${location[0]},${location[1]}`;
      Linking.openURL(url);
    }


    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name="arrow-left" size={20} color='#34cb79' />
                </TouchableOpacity>
            
                {/* <Image style={styles.pointImage} source={{ uri: data.image_url}} /> */}
                <Image style={styles.pointImage} source={{ uri: image }} />

                <Text style={styles.pointName}>{data.name}</Text>

                <View style={styles.iconGroup}>
                    <RectButton style={styles.pointItems} >
                        <Icon name="bell" size={20} color='#FFF' />
                        <Text style={styles.buttonText}>Diesel</Text>
                    </RectButton>
                    <RectButton style={styles.pointItems} >
                        <Icon name="bell" size={20} color='#FFF' />
                        <Text style={styles.buttonText}>Vagas</Text>
                    </RectButton>
                    <RectButton style={styles.pointItems} >
                        <Icon name="bell" size={20} color='#FFF' />
                        <Text style={styles.buttonText}>Banho</Text>
                    </RectButton>
                    <RectButton style={styles.pointItems} >
                        <Icon name="bell" size={20} color='#FFF' />
                        <Text style={styles.buttonText}>Oficina</Text>
                    </RectButton>
                    {/* <RectButton style={styles.pointItems} >
                        <Icon name={data.services.restaurante.icon} size={20} color='#FFF' />
                        <Text style={styles.buttonText}>data.services.restaurante.text</Text>
                    </RectButton> */}

                    {/* {data.services.map(item => (
                        <RectButton
                            style={styles.pointItems}
                        >
                            <Icon name={item.icon} size={20} color='#FFF' />
                            <Text style={styles.buttonText}>{item.text}</Text>
                        </RectButton>
                    ))} */}

                </View>
            
                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.city}, {data.uf}</Text>
                </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={() => openGps(location[0], location[1])}>
                    <Icon name="map-pin" size={20} color='#FFF' />
                    <Text style={[styles.buttonText, { marginLeft: 8 }]}>Map</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={() => openGps(location[0], location[1])}>
                    <Icon name="map-pin" size={20} color='#FFF' />
                    <Text style={[styles.buttonText, { marginLeft: 8 }]}>Map</Text>
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
      marginBottom: 110,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      // fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
    iconGroup: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    
    pointItems: {
      // fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      marginTop: 8,
      width: '32%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    address: {
      marginTop: 32,
    },
    addressTitle: {
      color: '#322153',
      // fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
    addressContent: {
      // fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80',
      marginBottom: 20,
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });

export default Detail;