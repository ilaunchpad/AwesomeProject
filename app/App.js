import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SQLite from "react-native-sqlite-storage";
import { ListItem, List } from 'react-native-elements';
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import camOverLay from './screen/camOverLay';
import mapOverLay from './screen/mapOverLay';
import listOverLay from './screen/listOverLay';
var db = SQLite.openDatabase({name:"testDB",  createFromLocation: 1});
class HomeScreen extends Component{
 render(){
   return (
      <View style={styles.container}>
     <Text>Home Screen</Text>
      <Button
      title = "Go to map"
     onPress={() => this.props.navigation.push('mapScreen')}
      />
      <Button
      title = "Go to Live View"
     onPress={() => this.props.navigation.push('camScreen')}
      />
      </View>
    );
 }
}


const AppNavigator = createStackNavigator({
  Home: {screen:HomeScreen},
  mapScreen:{screen:mapOverLay},
  camScreen:{screen:camOverLay},
   //initialRouteName: 'Home',
});
export default createAppContainer(AppNavigator);



const styles = StyleSheet.create({
  main:{
    flex:1,
    flexDirection:'row',
    marginBottom:3
  },
  home:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
    margin: 15
  },
  heading:{
    fontSize:20,
    textAlign:"center",
    margin:10
  },
  flat:{
   flex: 1,
    flexDirection: 'column',
    height:'100%',
    width:'100%'
  }
});
