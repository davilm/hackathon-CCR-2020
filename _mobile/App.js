import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './src/pages/Detail';
import Home from './src/pages/Home';
import Search from './src/pages/Search';
import Login from './src/pages/Login';
import Inicial from './src/pages/Inicial';

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Inicial">
				<Stack.Screen name="Inicial" component={Inicial} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Search" component={Search} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Detail" component={Detail} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;