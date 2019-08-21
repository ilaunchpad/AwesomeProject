import React from 'react';
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
import dataquery from './../utils/dataquery';

function callfunction(){
console.log("this is a test call for utils");
//console.log(dataquery.getAllPoints());
}
export default class camOverLay extends React.Component {
  componentDidMount(){
   this.testcallfunction()
   // callfunction()
  }
   testcallfunction(){
     p1 = dataquery.getAllPoints();
      console.log(p1)
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>AR Screen</Text>
      </View>
    );
  }
}
