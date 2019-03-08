'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableWithoutFeedback, View , Vibration} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
  found = false
  render() {
    return (
      <View style={styles.container} onLongPress>
        <TouchableWithoutFeedback onLongPress={() => {this.props.navigation.goBack()}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={( event ) => {
            if(!this.found){ // only vibrate once
              Vibration.vibrate();
              this.found = true
            }
            console.log(event.data);
            this.props.navigation.goBack(); // go back to burner webView
          }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});