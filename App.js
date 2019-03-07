/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const handleEvent = (event) => {
  if(event == "qr"){

  }
}
      // document.addEventListener("click", function(event) {
      //   native = false
      //   // window.ReactNativeWebView.postMessage(event.target)
      //   // window.ReactNativeWebView.postMessage(event.target.outerHTML)
      // })
export default class App extends Component {
  render() {
    console.log("Rendering")
    let runFirst = `
      window.isReactNative = true

    `
    return (
      <WebView
        originWhitelist={['*']}
        styles={{marginTop: 40}}
        source={{ uri: 'http://192.168.100.143:3000' }}
        injectedJavaScript={runFirst}
        onMessage={event => {
          handleEvent(event.nativeEvent.data);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
