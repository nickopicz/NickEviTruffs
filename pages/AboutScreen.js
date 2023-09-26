import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import CustomText from '../components/Text';
import { Colors } from '../Colors';

export default function AboutScreen() {
	const people = [
		{
			id: '1',
			name: 'Nicholas Ciraulo',
			image: require('../assets/Nick_Sample.JPG'), // Replace with your image path or URL
			description:
				'Nicholas, a truffle enthusiast, co-founded this company after traveling and exploring the culinary applications of Truffles in Greece and Italy. He now has an extensive knowledge for the nuances of truffle hunting. His passion for quality produce and gourmet foods led him to create this business.',
		},
		{
			id: '2',
			name: 'Paraskevi Iordamlis',
			image: require('../assets/Evi_Sample.jpg'), // Replace with your image path or URL
			description:
				'Paraskevi, a lover of fresh high quality gourmet food, teamed up with Nicholas to provide a marketplace for truffle lovers in the NYC Metropolitan area. Her vast experience with global cuisines brings a unique perspective to the table.',
		},
	];

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginLeft: 250,
			padding: 20,
		},
		innerContainer: {
			marginTop: 40,
		},
		ownerContainer: {
			marginTop: 30,
			alignItems: 'flex-start',
			borderBottomWidth: 1,
			borderColor: Colors.primary,
			marginVertical: 20,
		},
		ownerImage: {
			width: 250,
			height: 250,
			borderRadius: 125, // This will make the image round
			marginVertical: 10,
		},
		ownerName: {
			fontSize: 18,
			fontWeight: 'bold',
			marginVertical: 10,
		},
		ownerDescription: {
			textAlign: 'left',
			marginVertical: 15,
		},
		ownerProfile: {
			alignItems: 'center',
		},
	});

	return (
		<ScrollView style={styles.container}>
			<View style={styles.innerContainer}>
				<CustomText type={'title'}>About Truffles</CustomText>
				<CustomText type={'subtitle'}>
					Truffles are a type of fungi that grow underground in close proximity
					to tree roots. They are a delicacy in many cuisines worldwide.
					Truffles, often referred to as the "diamonds of the kitchen", are a
					rare and sought-after underground fungi, primarily associated with oak
					and hazel trees. There are various types, each with its unique aroma
					and flavor profile. The White Truffle (Tuber magnatum) from Alba,
					Italy, and the Black Périgord Truffle (Tuber melanosporum) from France
					are among the most coveted. Another notable variety is the Burgundy or
					Summer Truffle (Tuber aestivum). Interesting enough, truffles have a
					symbiotic relationship with the trees they grow with, exchanging
					nutrients with their roots. Now, when it comes to Greek truffles,
					their supreme quality is attributed to the country's unique soil
					composition, diverse microclimates, and the ancient trees found in its
					forests. These conditions contribute to the development of truffles
					with highly complex and developed flavor profiles, making them a
					gastronomic treasure. As Greece's truffle industry grows, connoisseurs
					worldwide are starting to recognize the distinctive and unparalleled
					taste these truffles offer.
				</CustomText>

				{people.map((person) => (
					<View
						key={person.id}
						style={styles.ownerContainer}
					>
						<View style={styles.ownerProfile}>
							<Image
								source={person.image}
								style={styles.ownerImage}
							/>
							<CustomText style={styles.ownerName}>{person.name}</CustomText>
						</View>
						<CustomText style={styles.ownerDescription}>
							{person.description}
						</CustomText>
					</View>
				))}
			</View>
		</ScrollView>
	);
}
