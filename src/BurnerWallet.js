/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, AsyncStorage, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as wallet from 'ethereumjs-wallet'
import * as base64url from 'base64url'
import LinearGradient from 'react-native-linear-gradient';

let PK_STORAGE_KEY = 'private_key' 
let BURNER_URL = 'https://burner-wallet-intern.herokuapp.com/pk#'
export default class BurnerWallet extends Component {
  constructor() {
    super();
    this.state = {}
    this.burn = false // used to trigger state reload when burning PK
  }

  retrivePKFromDevice = async () => {
    var pk
    try {
      pk = await AsyncStorage.getItem(PK_STORAGE_KEY)
    } catch (error) {
      console.log("There was an error fetching data")
    }
    if(pk != null){
      console.log("We found a PK:", pk)
    } else {
      console.log("Didn't find a PK...")
      console.log("Generating new one")
      pk = await this.setNewPK()
      console.log("Here's the new PK:", pk)
    }
    return BURNER_URL+pk
  }
  // This will use etherumjs-wallet and base64 to generate a new pk and save it to local storage
  generateEncodedPK = () => {
    let account = wallet.generate()
    let pk_bytes = account._privKey;
    console.log('Generate PK:', account.getPrivateKeyString());
    let encodedPK = base64url.encode(pk_bytes);
    return encodedPK
  }

  savePrivateKeyToDevice = async (privateKey) =>{
    try {
      let res = await AsyncStorage.setItem(PK_STORAGE_KEY, privateKey)
      console.log("Saved PK")
    } catch (error) {
      console.log("There was an error saving data")
    }
  }

  setNewPK = async () =>{
    var encodedPK = this.generateEncodedPK();
    await this.savePrivateKeyToDevice(encodedPK);
    if(this.burn){
      let url = BURNER_URL+encodedPK
      this.setState({URL:url})
      this.burn = false
    }
    return encodedPK
  }

   updateQR = false // FLAG USED TO DISTINGUISH WHEN IT WILL UPDATE THE ADDRESS(i.e when current view = sendByAdrdres) or will send to new view
   URL = ''
   handleEvent = (event) => {
    if(event == "qr"){
      console.log("I got a QR")
      this.props.navigation.navigate('Camera')
    }
    if(event == "update_qr"){
      this.props.navigation.navigate('Camera')
      this.updateQR = true
    }
    if(event == "burn"){
      console.log("Burn!!!!")
      this.burn = true // flag to trigger state reload to update URL
      this.setNewPK().then(() =>{console.log('Updated succesfully')}).catch((err) => {console.error(err)}) // this shouldn't be a blocking call
    }
  }

  componentWillReceiveProps(){
    const destAddress = this.props.navigation.getParam('data', '');
    if (destAddress != ''){
      if(this.updateQR){
        this.webref.injectJavaScript(`window.updateToAddress('${destAddress}')`)
      } else {
        this.webref.injectJavaScript(`window.sendToAddress('${destAddress}')`)
      }
    } 
  }
  // Here we check if there's a private key in local storage
  async componentDidMount(){
    let url = await this.retrivePKFromDevice()
    this.setState({URL: url})
  }

  render() {
    console.log("Rendering")
    console.log("URL", this.state.URL)
    let runFirst = `
      window.isReactNative = true
    `
    return (
      <LinearGradient colors={['#292929', '#191919']} style={styles.container}>
        <SafeAreaView style={styles.container}>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{ uri: this.state.URL }}
          injectedJavaScript={runFirst}
          ref={r => (this.webref = r)}
          startInLoadingState={true}
          renderLoading={() => <Text>Hello!!!!!</Text>}
          onMessage={event => {
            this.handleEvent(event.nativeEvent.data);
          }}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
