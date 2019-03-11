/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default class BurnerWallet extends Component {

   handleEvent = (event) => {
    if(event == "qr"){
      console.log("I got a QR")
      this.props.navigation.navigate('Camera')
    }
    if(event == "burn"){
      console.log("I got a QR")
    }
  }

  componentWillReceiveProps(){
    const destAddress = this.props.navigation.getParam('data', '');
    if (destAddress != ''){
      this.webref.injectJavaScript(`window.sendToAddress('${destAddress}')`)
    } 
  }

  render() {
    console.log("Rendering")
    let runFirst = `
      window.isReactNative = true
    `
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{ uri: 'http://7c8d6cc4.ngrok.io' }}
          injectedJavaScript={runFirst}
          ref={r => (this.webref = r)}
          onMessage={event => {
            this.handleEvent(event.nativeEvent.data);
          }}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
