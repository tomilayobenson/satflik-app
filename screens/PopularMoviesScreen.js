import { useState, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import PopularBanner from "../components/popular/PopularBanner";
import PopularCards from "../components/popular/PopularCards";
// import PopularGenres from "../components/popular/PopularGenres";

const PopularMoviesScreen = ({ navigation }) => {
    const movies = useSelector((state) => state.popularMovies)
    // const allGenres = useSelector((state) => state.allGenres)
    const [categorizedMovies, setCategorizedMovies] = useState([])
    return (
        <View style={styles.mainView}>
            <View style={{ flex: 1 }}>
                <PopularBanner movies={movies} />
            </View>
            <View style={{ flex: 2 }}>
                <PopularCards movies={categorizedMovies.length ? categorizedMovies : movies}/>
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