import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
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
    render() {
      return <AppContainer />;
    }
  }

