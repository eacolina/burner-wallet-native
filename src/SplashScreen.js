import React from "react";
import { View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



module.exports = {
    splashScreen: function () {
        return (
            <LinearGradient colors={['#292929', '#191919']} style={styles.gradient}>
                <View style={styles.container}>
                        <Image
                        source={require('./../Slice.png')}
                        style={styles.logo}
                        />
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        flex:1
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
    },
    logo: {
      width: 200,
      height: 200,
    },
  });