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
  height: dimensions.height - 80,
  width: dimensions.width,
  padding: 6
});
const Indicatorview = glamorous.view({
  flex: 1,
  justifyContent: "center"
});
const Renderview = glamorous.view({
  flex: 1
});
const Titleview = glamorous.view({
  position: "absolute",
  bottom: 0,
  justifyContent: "center"
});
const Dateview = glamorous.view({
  position: "absolute",
  top: 0,
  right: 0
});
const ImageView = glamorous.view({
  height: dimensions.height / 4,
  width: dimensions.width / 2 - 20,
  margin: 6
});
const Titletext = glamorous.text({
  color: "white",
  padding: 10
});
@observer
export default class ApodList extends Component {
  static navigationOptions = {
    title: "APOD"
  };

  componentDidMount = () => {
    Apidatamanager.fetchData();
    Apidatamanager.getData();
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
      imageDate: item.date,
      imageTitle: item.title
    });
  };

  _footerComponent = () => {
    if (Apidatamanager.state === "done") {
      return (
        <Indicatorview>
          <ActivityIndicator size="large" color="#0000ff" />
        </Indicatorview>
      );
    } else {
      return null;
    }
  };

  _renderItem = ({ item }) => {
    let moment = require("moment");
    let date = moment(item.date).format("MMM Do YYYY");
    if (item.media_type === "image") {
      return (
        <Renderview>
          <ImageView>
            <TouchableOpacity onPress={() => this._onTouchingImage(item)}>
              <Image
                style={{ height: 184, width: 176 }}
                source={{ uri: item.url }}
              />
            </TouchableOpacity>
            <Titleview>
              <Titletext>{item.title}</Titletext>
            </Titleview>
            <Dateview>
              <Titletext>{date}</Titletext>
            </Dateview>
          </ImageView>
        </Renderview>
      );
    } else {
      return (
        <Renderview>
          <ImageView>
            <TouchableOpacity onPress={() => this._onTouchingImage(item)}>
              <Image
                style={{ height: 180, width: 175 }}
                source={{
                  uri:
                    "https://img.icons8.com/material-outlined/50/000000/youtube.png"
                }}
              />
            </TouchableOpacity>
          </ImageView>
        </Renderview>
      );
    }
  };
  render() {
    console.log(Apidatamanager.data.slice());
    console.log(Apidatamanager.state);
    let activityindicator;
    if (Apidatamanager.state === "done") {
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
