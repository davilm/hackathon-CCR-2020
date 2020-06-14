import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api';

export default function card({
    val=5,
    image="https://imatecvisual.com.br/wp-content/uploads/2017/09/equipamento-para-posto-de-combustivel.jpg",
    duracao='11 min',
    distancia='9.0 km',

}) {

    
    const [data, setData] = useState([]);;

    const navigation = useNavigation();

    const route = useRoute();

    const routeParams = route.params;

    const [rating, setsetRatingValue] = React.useState(parseInt(val));
    // const [rating, setRating] = React.useState(5);

    const onPress = () => {  
        navigation.navigate('Detail', {
            nome: data.id_estabelecimento,
        });
    };

    useEffect(() => {
                 
        api.get(`/estabelecimentos?combustivel=${routeParams.combustivel}&aberto_24h=${routeParams.aberto_24h}&banho=${routeParams.banheiro}&raio_dez_km=${routeParams.raio_dez_km}&wifi=${routeParams.wifi}&estacionamento=${routeParams.estacionamento}&refeicao=${routeParams.refeicao}&cafe=${routeParams.cafe}&banheiro=${routeParams.banheiro}&saude=${routeParams.saude}&limite=4&offset=0&lat=-25.3445817&lon=-49.2777131`, {
        // api.get('/estabelecimentos-todos', {
            // params: {
            //     nome: routeParams.nome,
            //     endereco: routeParams.endereco,
            //     cidade: routeParams.cidade,
            //     cidade: routeParams.cidade,

            // }
        }).then(response => {
            console.log("response data bellow")
            console.log(typeof(response.data));
            setData(response.data);
        });
        console.log("////////////////////////////////////////////")

        console.log('combustivel');
        console.log(routeParams.combustivel);
        console.log('aberto_24h');
        console.log(routeParams.aberto_24h);
        console.log('raio_dez_km');
        console.log(routeParams.raio_dez_km);
        console.log('wifi');
        console.log(routeParams.wifi);
        console.log('refeicao');
        console.log(routeParams.refeicao);
        console.log('cafe')
        console.log(routeParams.cafe);
        console.log('banheiro');
        console.log(routeParams.banheiro);
        console.log('saude');
        console.log(routeParams.saude);

        
    }, []);

    return (
        <View>
            
            <View style={[styles.iconGroup, { marginTop: 36 }]}>
            

            {data.map(item => (
            
                    <RectButton
                        key={String(item.id_estabelecimento)}
                        style={[styles.pointItems, {padding:2}]}
                        onPress={() => navigation.navigate('Detail', { id: item.id_estabelecimento })
                    }>

                        <View style={{ width: '100%', height: '70%', resizeMode: 'stretch' }}>

                            <Image source={{ uri: image}}
                                style={{
                                    width: '100%',
                                    height: 130,
                                    resizeMode: 'stretch',
                                }}
                            />
                        </View>

                        <View style={[styles.box, { width: '100%', flexDirection: 'column'}]}>
                            {/* <View style={{borderColor: 'brown', width: '100%'}}>

                                <Text>{item.media}</Text>
                                <Rating imageSize={12} readonly startingValue={item.media} style={{ marginLeft: -30, marginTop: 6 }} />
                                <Text style={{fontSize: 12, color: 'blue'}}>comentarios</Text>


                            </View> */}

                            <View style={{flex: 1, flexDirection: 'row', marginTop: -5}}>
                                <View style={{width: '14%', height: 50, backgroundColor: 'white'}}>
                                    <Text>{item.mediaEstrelas}</Text>

                                </View>
                                <View style={{width: '40%', height: 50, backgroundColor: 'white'}}>
                                    <Rating imageSize={12} readonly startingValue={item.mediaEstrelas} style={{ alignSelf: 'flex-start', marginTop: 5 }} />

                                </View>
                                <View style={{width: '46%', height: 50, backgroundColor: 'white'}}>
                                    <Text style={{fontSize: 11, color: 'blue', marginTop: 2}}>4 comentarios</Text>

                                </View>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', height: 50, backgroundColor: 'white', marginTop: -10}}>
                                    <Text style={{ marginLeft: 0, marginTop:8, fontSize: 14, color:'green', fontWeight: 'bold' }}>{duracao} </Text>

                                </View>
                                <View style={{width: '35%', height: 50, backgroundColor: 'white', marginTop: -10}}>
                                    <Text style={{ marginLeft: 0, marginTop:8, fontSize: 14, color: 'gray' }}>{item.distancia} km</Text>

                                </View>
                                <View style={{width: '35%', height: 45, backgroundColor: 'white', marginTop: -5}}>
                                    <Icon name="map-pin" size={25} color='red' />

                                </View>
                            </View>


                            {/* <View style={[styles.box2, { marginLeft: -20}]}>
                            <Text style={{ marginLeft: 0, marginTop:8, fontSize: 12 }}>{duracao} {distancia}</Text>

                            </View> */}
                        </View>
                    </RectButton>
                
                ))}
                
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        marginTop: 5
    },

    box: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    box2: {
        flex: 3,
        alignItems: 'flex-end',
        marginRight: 10
    },

    box3: {
        flex: .1,
        backgroundColor: 'brown',
    },

    iconGroup: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    pointItems: {
        fontSize: 16,
        marginTop: 8,
        width: '50%',
        // backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
});