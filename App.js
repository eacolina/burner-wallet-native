import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import BurnerWallet from './BurnerWallet'
import Camera from './Camera'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

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

