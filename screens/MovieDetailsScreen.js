import { useEffect, useState } from "react";
import { View, Linking, ScrollView } from "react-native";
import { baseUrl, imageUrl } from "../data/baseUrl";
import { Card, Text, Rating, Image } from "react-native-elements";
import { FlatList } from "react-native";


const MovieDetailsScreen = ({ route }) => {
    const movieId = route.params.movieId
    const [reviews, setReviews] = useState([])
    const [movie, setMovie] = useState({})


    useEffect(() => {
        async function getDetails() {
            const response = await fetch(baseUrl + movieId + "?api_key=3341385410c37095575e1b97197378ce");
            if (!response.ok) throw Error(response.message);
            const data = await response.json();
            setMovie(data);
        }
        getDetails();
    }, []);
    useEffect(() => {
        async function getReviews() {
            const response = await fetch(baseUrl + movieId + "/reviews?api_key=3341385410c37095575e1b97197378ce");
            if (!response.ok) throw Error(response.message);
            const data = await response.json();
            setReviews(data.results);
        }
        getReviews();
    }, []);

    const ContentCard = ({ movie }) => {
        return (
            <>
<Card>
                <Card.Image
                    style={{ padding: 0 }}
                    source={{
                        uri: imageUrl + movie.backdrop_path,
                    }}
                />
                <Text>{movie.release_date}</Text>
                <Text style={{ marginBottom: 10 }}>
                    {movie.overview}
                </Text>
                <Text>Adult Movie?: {movie.adult ? "Yes" : "No"}</Text>
                <Text>Runtime: {movie.runtime}mins</Text>
                <Text>Budget: ${movie.budget}</Text>
                <Text
                    style={{ color: 'blue' }}
                    onPress={() => Linking.openURL(movie.homepage)}
                >
                    Get Tickets
                </Text>
            </Card>
            <Text style={{marginLeft:15, marginTop:30, fontSize: 18,fontWeight: 'bold'}}>Movie Reviews</Text>
            </>
            
        )
    }

    const reviewCard = ({ item: review }) => {
        const truncate = (str) => str.length > 150 ? str.substring(0, 147) + "..." : str;
        return (
            <View style={{ margin: 20 }}>
                <View style={{ flexDirection: 'row', flex: 1}}>
                    <View style={{ flex: 3 }}>
                        <Image
                            source={{ uri: review.author_details.avatar_path ? (imageUrl + review.author_details.avatar_path) : "https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg" }}
                            style={{ height: 50, width: 50, borderRadius: 999 }}
                        />
                        <Text style={{ fontSize: 12, marginRight:20 }}>{`-- ${review.author}`}</Text>
                    </View>
                    <View style={{ flex: 7 }}>
                        <Text style={{ fontSize: 14 }}>{truncate(review.content)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent:'flex-start' }}>
                    
                    <Rating imageSize={15} readonly startingValue={review.author_details.rating} type='star' />

                </View>

            </View>
        )
    }
    const MovieReviews = ({ reviews }) => {
        return (
            <FlatList
                data={reviews}
                renderItem={reviewCard}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent={<ContentCard movie={movie} />}
            />

        )
    }

    return (
        <View style={{ flex: 1 }}>
            
            <MovieReviews reviews={reviews} />

        </View>
    )
}

export default MovieDetailsScreen