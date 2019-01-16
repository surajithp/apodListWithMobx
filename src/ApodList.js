import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import glamorous, { ThemeProvider } from "glamorous-native";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Apidatamanager from "./DataManager";
const dimensions = Dimensions.get("window");
const Mainview = glamorous.view({
  height: dimensions.height - 20,
  width: dimensions.width
});
const Indicatorview = glamorous.view({
  flex: 1,
  justifyContent: "center"
});
@observer
export default class ApodList extends Component {
  isDataFetched = "";

  componentDidMount = () => {
    Apidatamanager.fetchData();
    this.isDataFetched = Apidatamanager.state;
  };

  onScrollingLoadMore = () => {
    console.log("Load More");
    Apidatamanager.fetchMoreData();
  };

  _keyExtractor = (item, index) => item.date;

  _footerComponent = () => {
    if (this.isDataFetched === "done")
      return (
        <Indicatorview>
          <ActivityIndicator size="large" color="#0000ff" />
        </Indicatorview>
      );
    else {
      return null;
    }
  };

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
    let activityindicator;
    if (this.isDataFetched === "done") {
      activityindicator = null;
    } else {
      activityindicator = <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <Mainview>
        <Indicatorview>{activityindicator}</Indicatorview>
        <FlatList
          data={Apidatamanager.data.slice()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={this.onScrollingLoadMore}
          ListFooterComponent={this._footerComponent}
        />
      </Mainview>
    );
  }
}
