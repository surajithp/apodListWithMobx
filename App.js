/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ApodList from "./src/ApodList";
export default class App extends Component {
  render() {
    return <ApodList />;
  }
}
