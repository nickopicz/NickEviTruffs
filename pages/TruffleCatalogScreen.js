import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import CustomText from '../components/Text';
const truffleImages = [
	{
		id: 1,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Ff1239a68-ae24-4272-b6dc-a40e705d1060.JPG?alt=media&token=0787a1db-070f-448c-9c7a-8e0a2b2c2ee3',
		type: 0,
	},
	{
		id: 2,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2F7b951876-14d7-4e63-880a-b349adce8a10.JPG?alt=media&token=2f7638d6-61ff-484d-90d3-2f4d50269cf6',
		type: 0,
	},
	{
		id: 3,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Fad4c99cd-3b50-489e-b589-0a66a1961c3d.JPG?alt=media&token=f025a0e7-12c9-4a35-bb4b-8387b6e15c1e',
		type: 0,
	},
	{
		id: 4,

		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2F2a5ec744-a3f9-4c51-afd0-6e9f048490a7.JPG?alt=media&token=8e94b6a7-d0bc-47ac-9541-f0fca8e1e250',
		type: 0,
	},
	{
		id: 5,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/videos%2F2c691441-1b4d-4276-a487-c87d789a5f41.MP4?alt=media&token=721666c3-652f-4020-b4b5-51e9f081e295',
		type: 1,
	},
	{
		id: 6,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Fb3bb2812-2625-4b23-8f27-055996f673c1.JPG?alt=media&token=dbf6c7a8-9ff3-4ad0-9d18-9fb21639b3ea',
		type: 0,
	},

	// ... add more images
];

export default function TruffleCatalogScreen({ navigation }) {
	const styles = StyleSheet.create({
		container: { flex: 1, alignItems: 'flex-start' },
		innerContainer: { marginLeft: 250, marginTop: 40 },
		title: {
			textAlign: 'left',
		},
	});
	const videoRefs = useRef({});
	const [imageDimensions, setImageDimensions] = useState({});
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = (event) => {
		const currentScrollY = event.nativeEvent.contentOffset.y;
		setScrollY(currentScrollY);

		Object.keys(videoRefs.current).forEach((videoId) => {
			const videoRef = videoRefs.current[videoId];
			const videoPosition = (videoId - 1) * (styles.image.height + 40); // Assuming uniform height and 20 marginVertical on each side
			console.log('y pos: ', currentScrollY);
			if (
				currentScrollY < videoPosition &&
				currentScrollY + window.innerHeight > videoPosition
			) {
				// The video is in view, play it
				console.log('playingvideo: ', videoRef);
				videoRef.current.playAsync();
			} else {
				// The video is out of view, pause it
				console.log('pausing Video: ', videoRef);

				videoRef.current.pauseAsync();
			}
		});
	};

	useEffect(() => {
		truffleImages.forEach((image) => {
			if (image.type === 0) {
				Image.getSize(image.uri, (width, height) => {
					setImageDimensions((prevState) => ({
						...prevState,
						[image.id]: { width, height },
					}));
				});
			} else {
				videoRefs.current[image.id] = React.createRef();
			}
		});
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<CustomText
					type="title"
					style={styles.title}
				>
					Truffle Catalog
				</CustomText>
				<ScrollView
					onScroll={handleScroll}
					scrollEventThrottle={16}
				>
					{truffleImages.map((image) =>
						image.type === 0 ? (
							<Image
								key={image.id}
								source={{ uri: image.uri }}
								style={{
									width: imageDimensions[image.id]?.width,
									height: imageDimensions[image.id]?.height,
									marginVertical: 20,
								}}
							/>
						) : (
							<Video
								isLooping
								source={{
									uri: image.uri,
								}}
								ref={videoRefs.current[image.id]}
								resizeMode={ResizeMode.CONTAIN}
								style={{
									width: 800,
									height: 900,
									marginVertical: 20,
								}}
							/>
						)
					)}
				</ScrollView>
				<Pressable
					title="About"
					onPress={() => navigation.navigate('About')}
				/>
			</View>
		</View>
	);
}
