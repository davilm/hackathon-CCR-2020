import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function card({
    classe='Gestão Empresarial',
    description='Prova',
    data='Thu, Jun 6',
    type='Test',
    val=1,
    cor='purple',

}) {
    const [value, setValue] = React.useState(parseInt(val));
    const [rating, setRating] = React.useState(5);
    const navigation = useNavigation();

    function onLong() {
        setValue(!value);
    };

    function onPress() {
        navigation.navigate("Detail");
    }

    return (
        <TouchableOpacity onLongPress={onLong} onPress={onPress}>
            <View style={styles.container}>
                <View style={[ styles.box, styles.box3, { backgroundColor: cor } ]} />
                <View style={styles.box}>
                    <Text style={{ marginLeft: 10 }}>{description}</Text>
                    <Text style={{ marginLeft: 10 }}>{classe}</Text>
                </View>
                <View style={[styles.box, styles.box2, { justifyContent: 'space-between', padding: 7 }]} >
                    <Rating imageSize={15} readonly startingValue={rating} style={styles.rating} />

                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="map-pin" size={16} color='red' />
                        <Icon name="map" size={16} color='red' />
                        <Icon name="airplay" size={16} color='red' />
                        <Icon name="aperture" size={16} color='red' />
                        <Icon name="radio" size={16} color='red' />
                    </View>
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: .3,
                    marginTop: 5
                }}
            />
        </TouchableOpacity>
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
        flex: 6,
        height: 60,
        justifyContent: 'center', 
        alignItems: 'flex-start'
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
});