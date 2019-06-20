/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *

import React, { Component } from 'react';

  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button
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
    <View style={styles.Container}>
      <Button
      onPress={() =>{
        //Alert.alert('You tapped the button!');
        showJsonToList();
      }}

      title="Clicke Me!"/>
      //<Text style={ styles.description}></Text>
      </View>
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

showJsonToList = () =>{
   data :[
    {id: 1, type: "One Bedroom", rent:"$750", address: "2621 1st Ave S, Minneapolis 55408"},
     {id:2 , type: "Two Bedroom", rent:"$1050", address: " 1st Ave S, Minneapolis 55408"},
     {id: 3, type: "One Bedroom", rent:"$750", address: "2621 1st Ave S, Minneapolis 55408"},
   ]
  Alert.alert('You tapped the button!');

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
});*/

import React, { Component } from 'react';
import SQLite from "react-native-sqlite-storage";
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
var db = SQLite.openDatabase({name:"testDB",  createFromLocation: 1});
//var db = SQLite.openDatabase({ name: 'my_db.sqlite'});
export default class App extends Component<{}> {
 constructor(){
   super()
   this.state = {}
 }

   componentDidMount(){
    SQLite.DEBUG(true);
   SQLite.enablePromise(true);

    db.transaction(tx => {
       console.log('inside db function');
      tx.executeSql(
      'SELECT * FROM listinginfo LIMIT 10',
       [], (tx, results)=>{
         console.log("this is results", results);
         var len = results. rows.length;
         for( let i = 0; i < len ; i++){
          let row = results.rows.item(i);
           console.log("this is row",` address:${row.data_longitude}`)
         }
        });
     });


  }

  testdbCall(){


  }
  SampleFunction2(){
    // db.transaction((tx) =>{
      //tx.executeSql('SELECT * FROM listinginfo LIMIT 5', [], (tx,results) =>{
        //console.log("Query result");
     // });
       //results = db.executeSql('SELECT * FROM listinginfo LIMIT 5', [])
       //console.log(db.dbname);
   // });
     //this.setState({ex_list:[
       //{name: 'Devin', id:0},
       //{name: 'Jackson',id:1},
       //{name:'James', id:2}]})

   //var house = [{"address": "2621 1st Ave", "rent":900}, {"address":"2623 1st Ave", "rent":1000}];
    Alert.alert("test");
  }
  render() {
    const census = this.state.ex_list;
    //const  census= this.state.ex_list;
    //console.log("this is inside test")
    //console.log(census)
    return (
      <View style={styles.container}>
      <Button onPress={this.SampleFunction2.bind(this)} title="Click here to call function "/>
      {!census ?"" :(<FlatList
        data={census}
        renderItem={({item}) =>
        <Text>{item.name} </Text>}/>)}
       //data = onPress

      { /*<FlatList
      //<Button onPress={this.SampleFunction1.bind(this)} title= "Click here to call Function - One"/>
      data = {this.SampleFunction2()}
      //data = {this.state.names}
      renderItem = {({item}) =>
        //<Text>{item.id}</Text>,
        <Text>{item.name}</Text>
      }
      />*/}

      </View>
    );
  }

SampleFunction1(){

    Alert.alert("Function Without Argument");

  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    margin: 10
  }
});
