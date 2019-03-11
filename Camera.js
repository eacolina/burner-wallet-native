'use strict';
import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, TouchableOpacity, View , Vibration} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Camera extends Component {
  found = false
  barcodeHandler =  ( barcode ) => {
    if(!this.found){ // only vibrate once
      Vibration.vibrate();
      this.found = true
    }
    console.log(barcode.data);
    this.props.navigation.navigate('Home', {data: barcode.data}); // go back to burner webView and pass the decoded address
  }
  render() {
    return (
      <View style={styles.container} onLongPress>
          <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={this.barcodeHandler}
          >
          <TouchableOpacity style={{position:"absolute", left: 30, top: 40}} onPress={() => {this.props.navigation.goBack()}}>
            <Icon name="ios-close" size={50} color="#FFFFFF" />
          </TouchableOpacity>
          </RNCamera>   
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
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});