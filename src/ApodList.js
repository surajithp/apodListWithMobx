import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import Apidatamanager from "./DataManager";
const dimensions = Dimensions.get("window");
const styles = StyleSheet.create({
  display: {
    height: dimensions.height - 20,
    width: dimensions.width
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default class ApodList extends Component {
  state = { data: [], start_date: null, end_date: null, isdatafetching: true };
  componentWillMount = () => {
    let moment = require("moment");
    const enddate = moment().format("YYYY-MM-DD");
    const startdate = moment()
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    Apidatamanager.getdata(startdate, enddate, this.handleResponse);
    this.setState({ start_date: startdate, end_date: enddate });
  };

  handleResponse = response => {
    console.log(response);
    this.setState({ data: response.data.reverse(), isdatafetching: false });
  };

  apiResponsefailure = err => {
    Alert.alert(err);
  };
  onPressLoadMore = () => {
    const previousstartdate = this.state.start_date;
    let moment = require("moment");
    const enddate = moment(`${previousstartdate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    
    Apidatamanager.getdata(startdate,enddate,this.handlebuttonResponse,this.apiResponsefailure);
    this.setState({ start_date: startdate, end_date: enddate });
  };

  handlebuttonResponse = response => {
    const responsedata = response.data;
    responsedata.reverse();
    this.setState(prevState => ({
      data: prevState.data.concat(responsedata),
      isdatafetching: false
    }));
  };

  _keyExtractor = (item, index) => item.date;

  _renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={this._onPressButton}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: item.url
          }}
        />
      </TouchableOpacity>
      <Text>{item.title}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  render() {
    console.log(this.state.data);
    let activityindicator;
    if (this.state.isdatafetching === true) {
      activityindicator = <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      activityindicator = null;
    }
    return (
      <View style={styles.display}>
        <View style={styles.container}>{activityindicator}</View>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <View style={styles.button}>
          <Button
            onPress={this.onPressLoadMore}
            title="Load More"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}
