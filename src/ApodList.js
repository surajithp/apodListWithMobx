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
  @observable start_date: null;
  @observable end_date: null;

  componentDidMount = () => {
    let moment = require("moment");
    this.end_date = moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    this.start_date = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    Apidatamanager.fetchData(this.start_date, this.end_date);
  };
  @action
  onScrollingLoadMore = () => {
    console.log("Load More Images");
    const previousstartdate = this.start_date;
    console.log(previousstartdate);
    let moment = require("moment");
    const enddate = moment(`${previousstartdate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    console.log(enddate);
    const startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    console.log(startdate);
    Apidatamanager.fetchData(startdate,enddate)
    this.start_date = startdate;
  };

  _keyExtractor = (item, index) => item.date;

  _renderItem = ({ item }) => {
    console.log("Flatlist Render");
    return (
      <View>
        <Image style={{ width: 100, height: 100 }} source={{ uri: item.url }} />
        <Text>{item.title}</Text>
        <Text>{item.date}</Text>
      </View>
    );
  };
  render() {
    console.log("rendered");
    return (
      <View>
        <FlatList
          data={Apidatamanager.data.reverse().slice()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.2}
          onEndReached={this.onScrollingLoadMore}
        />
      </View>
    );
  }
}
