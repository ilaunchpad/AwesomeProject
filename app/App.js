/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return(
     <Text style={ styles.description}>This is a test</Text>
    );
    //return React.createElement(Text, {style: styles.description}, "Search for houses to buy!");
    //let pic ={

     // Text = "hello"
      //uri :'https://upload.wikimedia.org/wikipedia/en/0/09/2001child2.JPG'
    }

    //return (
      //<View style={{alignItems: 'center'}}>
      //<Image source={pic} style={{width:400, height:300}}/>
     //</View>
   // );
  //}
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
  description:{
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop:65,
  },
});
