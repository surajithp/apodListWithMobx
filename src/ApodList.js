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

  componentWillMount = () => {
    console.log("==============");
    let moment = require("moment");
    this.end_date = moment().format("YYYY-MM-DD");
    this.start_date = moment()
      .subtract(11, "days")
      .format("YYYY-MM-DD");
    Apidatamanager.fetchData(this.start_date, this.end_date);
  };
  _keyExtractor = (item, index) => item.date;

  _renderItem = observer(({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={this._onPressButton}>
          <Image
            source={{
              uri: item.url
            }}
          />
        </TouchableOpacity>
        <Text>{item.title}</Text>
        <Text>{item.date}</Text>
      </View>
    );
  });
  render() {
    console.log(Apidatamanager.data.slice());
    let list;
    if (Apidatamanager.data.slice().length > 0) {
      <FlatList
        data={Apidatamanager.data.slice()}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />;
    } else {
      list = (
        <View>
          <Text>No Images Loaded</Text>
        </View>
      );
    }
    return (
      <View>
        <View>{list}</View>
        <Text>Scroll down to get more Images</Text>
      </View>
    );
  }
}
