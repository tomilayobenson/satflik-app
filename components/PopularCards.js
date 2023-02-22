import { FlatList,View } from "react-native";
import { imageUrl } from "../data/baseUrl";
import { useSelector } from "react-redux";
import { Tile } from "react-native-elements";


const PopularCards = ({ movies, navigation }) => {
    const truncate = (str) => str.length > 140 ? str.substring(0, 137) + "..." : str;
    const allMovies = useSelector(state => state.popularMovies)

    if (allMovies.isLoading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    if (allMovies.errMsg) {
        return (
            <View>
                <Text>{movies.errMsg}</Text>
            </View>
        );
    }
    const renderDirectoryItem = ({ item: movie }) => {
        const movieId= movie.id;
        const movieTitle = movie.title
        return (
            <Tile
                title={movie.title}
                caption={truncate(movie.overview)}
                featured
                onPress={() => navigation.navigate('MovieDetails', { movieId, movieTitle })}
                imageSrc={{ uri: imageUrl + movie.backdrop_path }}
            />
        );
    };
    return (
       
            <FlatList
                data={movies}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
       


    )
}

export default PopularCards