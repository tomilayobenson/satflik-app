import { useEffect, useState } from "react";
import { View, Linking } from "react-native";
import { baseUrl, imageUrl } from "../data/baseUrl";
import { Card, Text, Rating } from "react-native-elements";
import { FlatList } from "react-native";


const MovieDetailsScreen = ({ route }) => {
    const movie = route.params.movie
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function getReviews() {
            const response = await fetch(baseUrl + movie.id + "/reviews?api_key=3341385410c37095575e1b97197378ce");
            if (!response.ok) throw Error(response.message);
            const data = await response.json();
            setReviews(data.results);
        }
        getReviews();
    }, []);

    const ContentCard = ({ movie }) => {
        return (
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
                <FlatList
                    data={movie}
                    renderItem={(item) => <Text>{item.name}</Text>}
                    keyExtractor={item => item.id.toString()}
                />
                <Text style={{ color: 'blue' }}
                    onPress={() => Linking.openURL(movie.homepage)}>
                    Get Tickets
                </Text>
            </Card>
        )
    }

    const MovieReviews = ({ reviews }) => {
        const truncate = (str) => str.length > 150 ? str.substring(0, 147) + "..." : str;
        return (
            reviews.map((review, idx) => {
                <Card key={idx}>
                    <Card.Image source={{ uri: review.author_details.avatar_path ? (imageUrl + review.author_details.avatar_path) : "https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg" }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text>
                                {review.author}
                            </Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>{truncate(review.content)}</Text>
                    <Rating imageSize={10} readonly startingValue={review.author_details.rating} type='star' />;
                </Card>
            }

            )
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ContentCard movie={movie} />
            </View>
            <View style={{ flex: 2 }}>
                <MovieReviews reviews={reviews} />
            </View>
        </View>
    )
}

export default MovieDetailsScreen