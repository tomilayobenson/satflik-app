import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import PopularCards from "../components/PopularCards";
import PopularGenres from "../components/PopularGenres";


const PopularMoviesScreen = ({ navigation }) => {
    const movies = useSelector((state) => state.popularMovies)
    const allGenres = useSelector((state) => state.allGenres)
    const [categorizedMovies, setCategorizedMovies] = useState([])

    if (movies.isLoading) {
        return (
        <View>
            <Text>Loading</Text>
        </View>
        )
    }
    if (movies.errMsg) {
        return (
            <View>
                <Text>{movies.errMsg}</Text>
            </View>
        );
    }
    return (
        <View style={styles.mainView}>
            <View style={{ flex: 1 }}>
                <PopularGenres movies={movies} allGenres={allGenres} setCategorizedMovies={setCategorizedMovies} />
            </View>
            <View style={{ flex: 2 }}>
                <PopularCards movies={categorizedMovies.length ? categorizedMovies : movies.popularMoviesArray} navigation={navigation}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    }
})
export default PopularMoviesScreen