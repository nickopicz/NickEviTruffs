import React from 'react';
import TruffleCatalogScreen from '../pages/TruffleCatalogScreen';
import AboutScreen from '../pages/AboutScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Pressable } from 'react-native';
import '../web-styles.css';
import CustomText from '../components/Text';

const Tab = createMaterialTopTabNavigator();

export const HomeTabs = () => {
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<Tab.Navigator
				className="stickyTabs"
				initialRouteName="Catalog"
				tabBar={(props) => <CustomTabBar {...props} />} // <-- Custom tab bar
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
		</View>
	);
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				height: 120,
				alignItems: 'center',
				backgroundColor: Colors.secondary,
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<Pressable
						key={index}
						onPress={onPress}
						style={{ flexDirection: 'column', alignItems: 'center' }} // <-- Side by side positioning
					>
						<Ionicons
							name={
								route.name === 'About'
									? isFocused
										? 'information-circle'
										: 'information-circle-outline'
									: isFocused
									? 'images'
									: 'images-outline'
							} // Adjust your logic here if needed
							size={35}
							color={isFocused ? Colors.tertiary : Colors.primary}
						/>
						<CustomText
							style={{ color: isFocused ? Colors.tertiary : Colors.primary }}
						>
							{label}
						</CustomText>
					</Pressable>
				);
			})}
		</View>
	);
};
