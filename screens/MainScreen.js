import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MainScreen = () => {
    return (
        <View style={styles.mainView}>
            <Text>
                MainScreen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    mainView:{
        backgroundColor: '#5637DD',
       justifyContent:'center',
        flex:1
    }
})

export default MainScreen