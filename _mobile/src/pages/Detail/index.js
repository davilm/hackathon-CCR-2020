import React, { useState, useEffect } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import { Rating } from 'react-native-elements';

import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, SafeAreaView, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';
import api from '../../services/api';

const Detail = () => {
    const [data, setData] = useState([]);
    const [icon, setIcon] = useState({});

    const navigation = useNavigation();

    const route = useRoute();

	const routeParams = route.params;
	

    const image = "https://www.trucks.com/wp-content/uploads/2017/10/truckstops.jpg";

	const [location, setLocation] = useState([-23.5726135, -46.6730768]);
	
	useEffect(() => {
		console.log("")
		console.log("")
		console.log("ID - ID")
		console.log("")
		console.log("")
		console.log(routeParams.id);
		console.log("")
		console.log("")
		console.log("ID - ID")
		console.log("")
		console.log("")
	}, []);
	
	useEffect(() => {
        api.get(`/estabelecimento/${routeParams.id}`, {
		// api.get(`/estabelecimento/2`, {

            // params: {
            //     nome: routeParams.nome,
            //     endereco: routeParams.endereco,
            //     cidade: routeParams.cidade,
            //     cidade: routeParams.cidade,

            // }
        }).then(response => {
			console.log("")
			console.log("")
			console.log("RESPONSE - RESPONSE")
			console.log("")
			console.log("")
            console.log(response.data);
			console.log("")
			console.log("")
			console.log("RESPONSE - RESPONSE")
			console.log("")
			console.log("")
            setData(response.data);
        });
    }, []);


    function openGps() {
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      var url = scheme + `${location[0]},${location[1]}`;
      Linking.openURL(url);
    }

	function handleWhatsapp(ddd, celular) {
		try{
        	Linking.openURL(`whatsapp://send?phone=${data.ddd}${data.celular}&text=Olá, gostaria de informações`)
		}catch {
			return;
		}
	}

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
    return (
        <ScrollView>
            <View style={styles.container}>
                 <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name="arrow-left" size={20} color='#34cb79' />
                </TouchableOpacity>

	{data.map(item => (
		<View
			key={String(item.id_estabelecimento)}
		>
			<View style={{alignSelf: 'flex-end', marginBottom: -25, flexDirection: 'row', marginRight: 20}}>
				<Text style={{ marginTop: 0, alignSelf: 'center'}}>{item.avaliacao}  </Text>
			<Rating imageSize={14} readonly startingValue={item.avaliacao} style={{alignSelf: 'center'}} />
	<Text style={{ color: 'blue', alignSelf: 'center', fontSize: 12}}>  {item.qtdeComentarios} comentarios</Text>

			</View>
			<Image style={styles.pointImage} source={{ uri: image }} />

				<View
					style={{ justifyContent: 'space-between', flexDirection: 'row'}}
				>

					<View style={{ marginTop: 20, marginLeft: 20}}>

						<Text style={{ fontWeight: 'bold', fontSize: 14}}>{item.endereco}</Text>
						<Text style={{ marginTop: 7, fontWeight: 'bold', fontSize: 14 }}>CEP: {item.cep}</Text>

					</View>
					<View style={{ marginTop: 47, marginLeft: -40, marginRight: 20, height:20, flexDirection: 'row' }}>
						<Text style={{ fontWeight: 'bold', fontSize: 14, color: 'green' }}>11 min </Text>
						<Text style={{ fontWeight: 'bold', fontSize: 14, color: 'gray' }}>9.0 km    </Text>

						<Icon name="map-pin" size={20} color='red' />

					</View>

				</View>

				<View style={styles.iconGroup}>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="coffee" size={20} color='#FFF' />
						<Text style={styles.buttonText}>café</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="cutlery" size={20} color='#FFF' />
						<Text style={styles.buttonText}>refeição</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="wrench" size={20} color='#FFF' />
						<Text style={styles.buttonText}>mecânico</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="heartbeat" size={20} color='#FFF' />
						<Text style={styles.buttonText}>clinica</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="battery-full" size={20} color='#FFF' />
						<Text style={styles.buttonText}>combustível</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="bed" size={20} color='#FFF' />
						<Text style={styles.buttonText}>hospedagem</Text>
					</RectButton>

					<RectButton style={styles.pointItems} >
						<FontAwesome name="bath" size={20} color='#FFF' />
						<Text style={styles.buttonText}>banheiro</Text>
					</RectButton>
						
                </View>				

				<View style={styles.footer}>
					<RectButton style={styles.button} onPress={() => handleWhatsapp(item.ddd, item.celular)}>
						<FontAwesome name="whatsapp" size={20} color='#FFF' />
						<Text style={[styles.buttonText, { marginLeft: 8 }]}>WhatsApp</Text>
					</RectButton>
					<RectButton style={styles.button} onPress={() => openGps(location[0], location[1])}>
						<Icon name="map-pin" size={20} color='#FFF' />
						<Text style={[styles.buttonText, { marginLeft: 8 }]}>Map</Text>
					</RectButton>
            	</View>
		</View>
	 ))}

                
            
            
            </View>
        </ScrollView>
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
      height: 200,
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