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
console.log(dimensions.width);
console.log(dimensions.height);
console.log(Dimensions.get("screen").height);
const Mainview = glamorous.view({
  height: dimensions.height - 60,
  width: dimensions.width
});
const Indicatorview = glamorous.view({
  flex: 1,
  justifyContent: "center"
});
const Renderview = glamorous.view({
  flex: 1,
  padding: 10
});
const Titleview = glamorous.view({
  position: "absolute",
  bottom: 20,
  justifyContent: "center"
});
const Dateview = glamorous.view({
  position: "absolute",
  top: 0,
  right: 10
});
const ImageView = glamorous.view({
  flex: 1,
  height: dimensions.height / 4,
  width: dimensions.width / 2 - 20
});
const Textcolor = glamorous.text({
  color: "white"
});
@observer
export default class ApodList extends Component {
  static navigationOptions = {
    title: "APOD"
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
    this.props.navigation.navigate("Imagescreen", {
      imageUrl: item.url,
      imgExplanation: item.explanation,
      imageDate: item.date
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
    let moment = require("moment");
    let date = moment(item.date).format("MMM Do YYYY");
    return (
      <Renderview>
        <ImageView>
          <TouchableOpacity onPress={() => this._onTouchingImage(item)}>
            <Image
              style={{ height: 175, width: 175 }}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
          <Titleview>
            <Textcolor>{item.title}</Textcolor>
          </Titleview>
          <Dateview>
            <Textcolor>{date}</Textcolor>
          </Dateview>
        </ImageView>
      </Renderview>
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
          horizontal={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={this.onScrollingLoadMore}
          ListFooterComponent={this._footerComponent}
        />
      </Mainview>
    );
  }
}
