import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SQLite from "react-native-sqlite-storage";
import { ListItem, List } from 'react-native-elements';
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import address from './listOverLay.js';
import dataquery from './../utils/dataquery';

var allPoints=[];
async function getMapPoints(){
 prPoints = await dataquery.getAllPoints();
  console.log("this is prPoints")
  console.log(prPoints)
  allPoints =prPoints
  console.log(allPoints)

}
export default class mapOverLay extends Component<{}>{
constructor() {
    super();
  //region
  this.state = { data: [] };
  const obj  = {title:"Hennepin County",
    coordinates:{
      latitude:44.972086,
      longitude: -93.262189
    },
  }


  const obj2  = {title:"Foshay County",
    coordinates:{
      latitude:44.974475,
      longitude: -93.271540
    },
  }

  var region = {
      latitude: 44.977866,
      longitude: -93.2650,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
  }

  this.state.region = region;
  this.state.data[0] = obj;
  this.state.data[1] = obj2;
}
 componentDidMount(){
   const that = this;
   var promiseA = dataquery.getAllPoints()
     dataquery.getAllPoints().then(result =>{
       console.log("Result", result);
      // this.setState({data : result});
     });
 }


 render(){


console.log(this.state.data)
console.log(this.state.region)
  return(
    <MapView
      provider={PROVIDER_GOOGLE}
      style={ map_styles.map }
      initialRegion={this.state.region}
      //initialRegion={{
      //latitude: 44.977866,
      //longitude: -93.2650,
      //latitudeDelta: 0.0922,
      //longitudeDelta: 0.0421
     //}}
    showsUserLocation={true}
    >

{this.state.data.map((marker, index) => (
    <MapView.Marker key={index}
      coordinate={marker.coordinates}
      title={marker.title}
    />
  ))}
   </MapView>

  );
}
}



const map_styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

