import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';

const CustomText = ({ type, children, style, ...props }) => {
	const textStyle = [styles.text];

	if (type === 'title') {
		textStyle.push(styles.title);
	} else if (type === 'subtitle') {
		textStyle.push(styles.subtitle);
	}

	if (style) {
		textStyle.push(style);
	}

	return (
		<Text
			style={textStyle}
			{...props}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'sans-serif-light',
		fontSize: 26,
		color: Colors.primary,
		marginVertical: 5,
	},
	title: {
		fontFamily: 'sans-serif',
		fontSize: 35,
		fontWeight: 'bold',
		color: Colors.secondary,
		marginVertical: 10,
	},
	subtitle: {
		fontFamily: 'sans-serif-medium',
		fontSize: 30,
		color: Colors.tertiary,
		marginVertical: 8,
	},
});

export default CustomText;
