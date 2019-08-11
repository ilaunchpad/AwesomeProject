import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SQLite from "react-native-sqlite-storage";
import { ListItem, List } from 'react-native-elements';
import { StyleSheet, FlatList,TouchableOpacity,Text, ListView,View, Button, Alert } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import camOverLay from './screen/camOverLay';
var db = SQLite.openDatabase({name:"testDB",  createFromLocation: 1});
//var db = SQLite.openDatabase({ name: 'my_db.sqlite'});
//
//
//
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
 class ListViewApp extends Component {

 constructor(){
   super()
   this.state = {data:[]}
   const url = "https://image.flaticon.com/icons/svg/25/25694.svg";

 }

  componentDidMount(){
    SQLite.DEBUG(true);
   SQLite.enablePromise(true);
    arr = []
    const that = this;
    db.transaction(tx => {
       console.log('inside db function', tx);
      tx.executeSql(
      'SELECT * FROM listinginfo LIMIT 90',
       [], (tx, results)=>{
         console.log("this is results", results);
         var len = results. rows.length;
         for( let i = 0; i < len ; i++){
          let row = results.rows.item(i);
           console.log("this is raw row", row);
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


   /*_renderItem =({item}) =>(
   <MyListItem
     id={item.id}
     onPressItem={this._onPressItem}
     selected={!!!this.state.selected.get(item.id)}
     title={item.title}
   />
);*/


 getListViewItem = (item) => {
        Alert.alert(item.price);
    }

  render() {
    console.log("test");
    console.log(this.test);
    census = this.state.data;
    let pic = {
      uri: "https://image.flaticon.com/icons/svg/25/25694.svg"
    }
    return (
      <View style={styles.main}>
      <FlatList contentContainetStyle={styles.flat}
      ItemSeparatorComponent={this.FlatListItemSeparator}
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}

        renderItem={({item }) =>(
          //<Text>{item.address}</Text>

        <ListItem
          title={`${item.address}, ${item.longitude},${item.latitude}`}
          //leftAvatar = {{source:{pic}}}
          onPress={this.getListViewItem.bind(this,item)}
       />
        )}
      onEndReached={this._handleLoadMore}
      onEndREachedThreshold={0.5}
      initialNumToRender={10}
      />
      </View>
    );
  }


}



class mapOverLay extends Component<{}>{
 render(){
  return(
    <MapView
    provider={PROVIDER_GOOGLE}
    style={ map_styles.map }
    initialRegion={{
      latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421

    }}
    showsUserLocation={true}
    />
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
