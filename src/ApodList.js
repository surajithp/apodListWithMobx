import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { observer } from "mobx-react";
import { observable, computed, action, autorun } from "mobx";
import Apidatamanager from "./DataManager";
//import glamorous, { ThemeProvider } from "glamorous-native";
@observer
export default class ApodList extends Component {
  componentDidMount = () => {
    Apidatamanager.fetchData();
  };

  onScrollingLoadMore = () => {
    console.log("Load More");
    Apidatamanager.fetchMoreData();
  };

  _keyExtractor = (item, index) => item.date;

  _renderItem = ({ item }) => {
    return (
      <View>
        <Image style={{ width: 100, height: 100 }} source={{ uri: item.url }} />
        <Text>{item.title}</Text>
        <Text>{item.date}</Text>
      </View>
    );
  };
  render() {
    console.log(Apidatamanager.data.slice());
    return (
      <View>
        <FlatList
          data={Apidatamanager.data.reverse().slice()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={this.onScrollingLoadMore}
        />
      </View>
    );
  }
}
