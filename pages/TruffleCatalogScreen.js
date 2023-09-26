import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import LottieView from 'lottie-react-native';
import * as Linking from 'expo-linking';

import CustomText from '../components/Text';
const truffleImages = [
	{
		id: 1,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Ff1239a68-ae24-4272-b6dc-a40e705d1060.JPG?alt=media&token=0787a1db-070f-448c-9c7a-8e0a2b2c2ee3',
		type: 0,
		text: 'Various freshly hunted truffles from a truffle tour by one of our hunters Costas and his dog Memo. Lefkada, Greece',
		wikiLinks: [],
		latinNames: [],
	},
	{
		id: 2,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2F7b951876-14d7-4e63-880a-b349adce8a10.JPG?alt=media&token=2f7638d6-61ff-484d-90d3-2f4d50269cf6',
		type: 0,
		text: 'A fresh batch of Summer Truffles (Tuber aestivum vittadini) at Pueblo Roastery in Karya, Greece',
		wikiLinks: ['https://en.wikipedia.org/wiki/Tuber_aestivum'],
		latinNames: ['(Tuber aestivum vittadini)'],
	},
	{
		id: 3,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Fad4c99cd-3b50-489e-b589-0a66a1961c3d.JPG?alt=media&token=f025a0e7-12c9-4a35-bb4b-8387b6e15c1e',
		type: 0,
		text: 'An White Truffle (Tuber magnatum pico) on the left and a Black Summer Truffle (Tuber aestivum vittadini)',
		wikiLinks: [
			'https://en.wikipedia.org/wiki/Tuber_magnatum',
			'https://en.wikipedia.org/wiki/Tuber_aestivum',
		],
		latinNames: ['(Tuber magnatum pico)', '(Tuber aestivum vittadini)'],
	},
	{
		id: 4,

		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2F2a5ec744-a3f9-4c51-afd0-6e9f048490a7.JPG?alt=media&token=8e94b6a7-d0bc-47ac-9541-f0fca8e1e250',
		type: 0,
		text: 'A lower quality batch of truffles found be the good boy Memo.',
		wikiLinks: [],
		latinNames: [],
	},
	{
		id: 5,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/videos%2F2c691441-1b4d-4276-a487-c87d789a5f41.MP4?alt=media&token=721666c3-652f-4020-b4b5-51e9f081e295',
		type: 1,
		text: 'An assortment of Summer Truffles (Tuber aestivum vittadini) on a beautiful cloudless sunny day.',
		wikiLinks: ['https://en.wikipedia.org/wiki/Tuber_aestivum'],
		latinNames: ['(Tuber aestivum vittadini)'],
	},
	{
		id: 6,
		uri: 'https://firebasestorage.googleapis.com/v0/b/truffles-68eaa.appspot.com/o/photos%2Fb3bb2812-2625-4b23-8f27-055996f673c1.JPG?alt=media&token=dbf6c7a8-9ff3-4ad0-9d18-9fb21639b3ea',
		type: 0,
		text: 'Large Summer Truffles (Tuber aestivum vittadini) in the half car lounge in Greece.',
		wikiLinks: ['https://en.wikipedia.org/wiki/Tuber_aestivum'],
		latinNames: ['(Tuber aestivum vittadini)'],
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
		info: {
			marginBottom: 50,
		},
	});
	const animation = useRef(null);
	const videoRefs = useRef({});
	const [imageDimensions, setImageDimensions] = useState({});
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = (event) => {
		const currentScrollY = window.scrollY;
		setScrollY(currentScrollY);
		console.log('y position pre-loop: ', currentScrollY);
		Object.keys(videoRefs.current).forEach(async (videoId) => {
			const videoRef = videoRefs.current[videoId];
			const videoPosition = (videoId - 1) * 940; // Assuming uniform height and 20 marginVertical on each side

			console.log('y pos: ', currentScrollY);
			console.log('video pos: ', videoPosition);

			// Check if the video element is in a playable state
			const isVideoPlayable =
				videoRef &&
				videoRef.current &&
				typeof videoRef.current.playAsync === 'function';
			const isVideoPausable =
				videoRef &&
				videoRef.current &&
				typeof videoRef.current.pauseAsync === 'function';

			// Check if the video is currently playing
			const status = await videoRef.current.getStatusAsync();
			console.log('paused: ', status);
			const isVideoPlaying = videoRef.current && status.isPlaying;
			const buffering = videoRef.current && status.isBuffering;
			//midpoint is 470
			if (
				currentScrollY > videoPosition &&
				currentScrollY < videoPosition + 1810
			) {
				console.log('video playable: ', isVideoPlayable);
				console.log('video playing: ', isVideoPlaying);
				console.log('buffering: ', buffering);
				// The video is in view, play it if it's not already playing
				if (isVideoPlayable && !isVideoPlaying && !buffering) {
					console.log('playing video: ', videoRef);
					videoRef.current?.playAsync();
				}
			} else {
				// The video is out of view, pause it if it's currently playing
				if (isVideoPausable && isVideoPlaying && !buffering) {
					console.log('pausing Video: ', videoRef);
					videoRef.current?.pauseAsync();
				}
			}
		});
	};

	// const handleScroll = () => {
	//   let scrolled = Dim.height * 0.628 + window.scrollY;
	//   setScrollY(scrolled);

	//   if (scrolled >= 650) {
	//     setTransform("180deg");
	//   } else {
	//     setTransform("90deg");
	//   }
	//   console.log("scrolled to : ", Dim.height * 0.628 + window.scrollY);
	// };

	useEffect(() => {
		console.log('hi');
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
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
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

				{truffleImages.map((image) =>
					image.type === 0 ? (
						<View>
							<Image
								key={image.id}
								source={{ uri: image.uri }}
								style={{
									width: imageDimensions[image.id]?.width,
									height: imageDimensions[image.id]?.height,
									marginVertical: 20,
								}}
							/>
							<CustomText
								type={'subtitle'}
								style={styles.info}
							>
								{image.text}{' '}
								{image.latinNames &&
									image.latinNames.length > 0 &&
									image.latinNames.map((name, index) => (
										<CustomText
											key={index}
											type={'text'}
											onPress={() =>
												window.open(image.wikiLinks[index], '_blank')
											}
										>
											{name}
										</CustomText>
									))}
							</CustomText>
						</View>
					) : (
						<View>
							<Video
								isLooping
								isMuted
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
							<CustomText type={'subtitle'}>
								{image.text}{' '}
								{image.latinNames &&
									image.latinNames.length > 0 &&
									image.latinNames.map((name, index) => (
										<CustomText
											key={index}
											type={'text'}
											onPress={() =>
												window.open(image.wikiLinks[index], '_blank')
											}
										>
											{name}
										</CustomText>
									))}
							</CustomText>
						</View>
					)
				)}
				<Pressable
					title="About"
					onPress={() => navigation.navigate('About')}
				/>
			</View>
		</View>
	);
}
