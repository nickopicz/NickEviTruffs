import React from 'react';
import { Pressable } from 'react-native';
import CustomText from './Text';

export function WikiLink({ children, url }) {
	return (
		<Pressable onPress={() => window.open(url)}>
			<CustomText style={{ textDecorationLine: 'underline', color: 'blue' }}>
				{children}
			</CustomText>
		</Pressable>
	);
}
