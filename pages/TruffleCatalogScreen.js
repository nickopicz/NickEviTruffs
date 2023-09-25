import React from 'react';
import { View, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import CustomText from '../components/Text';
const truffleImages = [
	{ id: 1, uri: require('../assets/burgundy_truffle.jpg') },
	{ id: 2, uri: require('../assets/black_truffle.jpg') },
	{ id: 3, uri: require('../assets/white_truffle.jpg') },

	// ... add more images
];

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'flex-start' },
	innerContainer: { marginLeft: 250, marginTop: 40 },
	image: { width: 600, height: 400, marginVertical: 20 },
	title: {
		textAlign: 'left',
	},
});
export default function TruffleCatalogScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<CustomText
					type="title"
					style={styles.title}
				>
					Truffle Catalog
				</CustomText>
				<ScrollView>
					{truffleImages.map((image) => (
						<Image
							key={image.id}
							source={{ uri: image.uri }}
							style={styles.image}
						/>
					))}
				</ScrollView>
				<Pressable
					title="About"
					onPress={() => navigation.navigate('About')}
				/>
			</View>
		</View>
	);
}
