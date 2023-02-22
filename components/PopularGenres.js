import { useState, useEffect } from "react"
import { CheckBox } from "react-native-elements";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../data/allGenresSlice";

const PopularGenres = ({ setCategorizedMovies }) => {
    const [genres, setGenres] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([])
    const movies = useSelector((state) => state.popularMovies)
    const allGenres = useSelector((state) => state.allGenres)
    const dispatch = useDispatch()
    const handleCheck = ({ target }) => {
        const { checked, title, id } = target
        console.log (`${checked} ${id} ${title}`)
        if (checked) {
            dispatch(addCategory(id))
        } else {
            dispatch(removeCategory(id))
        }

    }

    useEffect(() => {
        const filteredMovies = movies.popularMoviesArray.filter(movie => movie.genre_ids.some(r => selectedCategories.includes(r.toString())))
        console.log("selectedCategories", selectedCategories)
        console.log("New Movies", filteredMovies)
        setCategorizedMovies(filteredMovies)
    }, [selectedCategories]);

    useEffect(() => {
        console.log("New Genres", allGenres.allGenresArray)
        //create an array of all popular movie genre ids, reduce the array to only unique values, then reduce the array of unique values into an array of objects where each object contains genre id and name gotten from the the api list of genres.
        const getGenres = movies.popularMoviesArray.reduce((acc, movie) =>
            [...acc, ...movie.genre_ids]
            , [])
            .reduce(
                (uniqueGenres, genre) => {
                    if (uniqueGenres.includes(genre)) {
                        return uniqueGenres
                    } else {
                        return [...uniqueGenres, genre]
                    }
                }
                , [])
            .reduce(
                (namedGenres, genre) => {
                    return [...namedGenres, { id: genre, name: (allGenres.allGenresArray.find(genreObject => genreObject.id === genre)).name }]
                }
                , [])
        setGenres(getGenres);
    }, [allGenres])

    return (
            
            <FlatList
                data={genres}
                renderItem={({ item: genre }) => <CheckBox title={genre.name} id={genre.id} onPress={handleCheck} />}
                keyExtractor={item => item.id}
            />


    )
}

export default PopularGenres