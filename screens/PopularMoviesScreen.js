import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import PopularCards from "../components/PopularCards";
import PopularGenres from "../components/PopularGenres";


const PopularMoviesScreen = ({ navigation }) => {
    const movies = useSelector((state) => state.popularMovies)
    const allGenres = useSelector((state) => state.allGenres)
    const [categorizedMovies, setCategorizedMovies] = useState([])
    const [showGenres, setShowGenres] = useState(false)

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
    if (showGenres) {
        return (
            <View style={styles.mainView}>
                <Text onPress={()=>setShowGenres(!showGenres)} style={{margin:10, fontSize: 18,fontWeight: 'bold'}}>Filter By Category
                <Icon
                    name='caret-down'
                    type="font-awesome"
                    size={15}
                    style={{paddingLeft:10}}                    
                />
                </Text>
                <PopularGenres movies={movies} allGenres={allGenres} setCategorizedMovies={setCategorizedMovies} />
            </View>
        )
    } else {
        return (
            
            <View style={styles.mainView}>
            <Text onPress={()=>setShowGenres(!showGenres)} style={{margin:10, fontSize: 18,fontWeight: 'bold'}}>Filter By Category
            <Icon
                    name='caret-down'
                    type="font-awesome"
                    size={15}
                    style={{paddingLeft:10}}
                />
                </Text>
                <PopularCards movies={categorizedMovies.length ? categorizedMovies : movies.popularMoviesArray} navigation={navigation} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainView: {
        
        justifyContent: 'flex-start'
    }
})
export default PopularMoviesScreen