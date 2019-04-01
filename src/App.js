import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SplashScreen from 'react-native-splash-screen';
import BurnerWallet from './BurnerWallet'
import Camera from './Camera'


const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: BurnerWallet
        },
        Camera: {
            screen: Camera
        }
    }, 
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    componentDidMount(){
        console.log("Imounted")
        SplashScreen.hide()
    }
    render() {
      return <AppContainer />;
    }
  }

