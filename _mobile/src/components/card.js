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
            nome: data.id,
        });
    };

    useEffect(() => {
        api.get('/estabelecimentos-todos', {
            // params: {
            //     nome: routeParams.nome,
            //     endereco: routeParams.endereco,
            //     cidade: routeParams.cidade,
            //     cidade: routeParams.cidade,

            // }
        }).then(response => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);

    return (
        <View>
            <View style={[styles.iconGroup, { borderTopWidth: 2, borderTopColor: 'gray', marginTop: 36 }]}>
            
            {data.map(item => (
            
                    <RectButton
                        key={String(item.id)}
                        style={[styles.pointItems, {padding:2}]}
                        onPress={() => navigation.navigate('Detail', { id: item.id })
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

                        <View style={[styles.box, { width: '100%'}]}>
                            <View style={{borderColor: 'brown', width: '60%'}}> 
                                <Rating imageSize={14} readonly startingValue={rating} style={{ marginLeft: -16, marginTop: 6 }} />
                            <Text style={{ marginLeft: 10, marginTop:8 }}>{duracao} {distancia}</Text>
                            </View>
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