import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Constants from 'expo-constants';

const Login = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={{ width: '100%', height: '100%', borderColor: 'blue', borderWidth: 2 }} onPress={() => navigation.navigate("Login")}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Image source={require('../../assets/logo.png')} style={{ marginTop: '20%', alignSelf: 'center',width: "80%", height: '22%', resizeMode: 'stretch', }} />
                    <Image source={require('../../assets/ccr.png')} style={{ marginTop: 200, alignSelf: 'center', width: '35%', height: '20%', resizeMode: 'stretch', }} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

});
export default Login;