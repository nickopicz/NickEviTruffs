import React from 'react';
import TruffleCatalogScreen from '../pages/TruffleCatalogScreen';
import AboutScreen from '../pages/AboutScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../Colors';
import { Ionicons } from '@expo/vector-icons';
const Tab = createMaterialTopTabNavigator();

export const HomeTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Catalog"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Catalog') {
						iconName = focused ? 'images' : 'images-outline';
					} else if (route.name === 'About') {
						iconName = focused
							? 'information-circle'
							: 'information-circle-outline';
					}

					return (
						<Ionicons
							name={iconName}
							size={30}
							color={color}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: Colors.primary,
				inactiveTintColor: Colors.tertiary,
				style: {
					backgroundColor: Colors.secondary,
				},
				indicatorStyle: {
					backgroundColor: Colors.primary,
				},
				showIcon: true,
			}}
		>
			<Tab.Screen
				name="Catalog"
				component={TruffleCatalogScreen}
			/>
			<Tab.Screen
				name="About"
				component={AboutScreen}
			/>
		</Tab.Navigator>
	);
};
