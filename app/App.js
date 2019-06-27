
import React, { Component } from 'react';
import SQLite from "react-native-sqlite-storage";
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
var db = SQLite.openDatabase({name:"testDB",  createFromLocation: 1});
//var db = SQLite.openDatabase({ name: 'my_db.sqlite'});
export default class App extends Component<{}> {
 constructor(){
   super()
   this.state = {data:[]}
 }

  componentDidMount(){
    SQLite.DEBUG(true);
   SQLite.enablePromise(true);
    arr = []
    const that = this;
    db.transaction(tx => {
       console.log('inside db function', tx);
      tx.executeSql(
      'SELECT * FROM listinginfo LIMIT 10',
       [], (tx, results)=>{
         console.log("this is results", results);
         var len = results. rows.length;
         for( let i = 0; i < len ; i++){
          let row = results.rows.item(i);
           console.log("this is raw row", row);
           console.log("this is row",` address:${row.price}`)
           obj = this.parseData(row);
           console.log("this is test", obj);
           that.state.data.push(obj);
         }
         this.setState(that.state);
         console.log("inside state",this.state.data);
        });
     });

  }

 parseData(row){

 //write utility function and regex
   //{data_longitude: "['-93.412740']", date_latitude: "['45.206591']", price: "$960.00", address: "2621 1st Ave S"}
 var longitude = row.data_longitude.slice(3,-3);
 var latitude  = row.date_latitude.slice(3,-3);
 var price    = row.price.slice(1);
  var address = row.address;

 const obj = {longitude:longitude,
   latitude:latitude,
   address: address,
   price   :price}
   return obj;
 }

  SampleFunction2(){
     arr = []
     db.transaction((tx) =>{
       console.log("this is arr before")
     tx.executeSql('SELECT * FROM listinginfo LIMIT 5', [], (tx,results) =>{
        console.log("Query result");
         var len = results. rows.length;
         for( let i = 0; i < len ; i++){
          let row = results.rows.item(i);
           console.log("this is row",` address:${row.data_longitude}`)
           arr.push(row.data_longitude)
           //console.log(arr)
     this.setState({ex_list:[
       {name:row.data_longitude}]})
         }
      });
    });
  }
  render() {
    census = this.state.data;
    return (
      <View style={styles.container}>
      <FlatList
       // keyExtractor={this._keyExtractor}
        data={this.state.data}
      keyExtractor={(item, index) => index.toString()}
        //renderItem={this.renderItem.bind(this)}
        renderItem={({item }) =>(
        <Text>{item.price},{item.longitude},{item.latitude}, {item.address} </Text>
        ) }
      />
      </View>
    );
  }
      //{!census ?"" :(
      //<FlatList
        //data={this.state.data}
        //renderItem={({item }) =>
        //<Text>{item.longitude} </Text>
       // }
       ///>
    //)
      //}



  //    </View>
   // );
 // }

SampleFunction1(){

    Alert.alert("Function Without Argument");

  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    margin: 15
  }
});
