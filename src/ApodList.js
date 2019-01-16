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
import { createStackNavigator, createAppContainer } from "react-navigation";
const dimensions = Dimensions.get("window");
const Mainview = glamorous.view({
  height: dimensions.height - 70,
  width: dimensions.width
});
const Indicatorview = glamorous.view({
  flex: 1,
  justifyContent: "center"
});
@observer
export default class ApodList extends Component {
  static navigationOptions = {
    title: "APOD Images"
  };

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

  _onTouchingImage = item => {
    console.log("Image clicked");
    this.props.navigation.navigate("Imagescreen", {
      imageUrl: item.url,
      imgexplanation: item.explanation
    });
  };

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
        <TouchableOpacity onPress={() => this._onTouchingImage(item)}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.url }}
          />
        </TouchableOpacity>
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
          onEndReachedThreshold={0.2}
          onEndReached={this.onScrollingLoadMore}
          ListFooterComponent={this._footerComponent}
        />
      </Mainview>
    );
  }
}
