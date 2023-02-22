import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import PopularMoviesScreen from './PopularMoviesScreen'
import MovieDetailsScreen from './MovieDetailsScreen'
import { useDispatch } from 'react-redux'
import { fetchAllGenres } from '../data/allGenresSlice'
import { fetchPopularMovies } from '../data/popularMoviesSlice'
import Constants from 'expo-constants';
import logo from '../assets/satLogoOrange.png';

const drawer = createDrawerNavigator()
const screenOptions = {
    headerStyle: {
        backgroundColor: '#023047'
    },
    headerTintColor: '#fefae0'
}
const popularMoviesNavigator = () => {
    const stack = createStackNavigator()
    return (
        <stack.Navigator screenOptions={screenOptions}>
            <stack.Screen
                name='Home'
                component={PopularMoviesScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })

                }
            />
            <stack.Screen
                name='MovieDetails'
                component={MovieDetailsScreen}
                options={({ route }) => ({
                    title: route.params.movieTitle
                })

                }
            />
        </stack.Navigator>
    )
}

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Satflik Movies</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
)

const MainScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllGenres())
        dispatch(fetchPopularMovies())
    }, [dispatch])
    return (
        <View style={{
            flex: 1,
            paddingTop:
                Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}
        >
            <drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
                drawerStyle={{}}
            >
                <drawer.Screen
                    name='Home'
                    component={popularMoviesNavigator}
                    options={{
                        title:'Home',
                        drawerIcon:({color}) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </drawer.Navigator>

        </View>
    )
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    },
    drawerHeader: {
        backgroundColor: '#219ebc',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#ffb703',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
})

export default MainScreen