import React from "react";
import { Button, View, Text, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation"; // Version can be specified in package.json
import ApodList from "./src/ApodList";

class FullImage extends React.Component {
  render() {
    const { navigation } = this.props;
    const urlImage = navigation.getParam("imageUrl", "Image Not loaded");
    const explanationImage = navigation.getParam(
      "imgexplanation",
      "Image Explanation "
    );
    return (
      <View>
        <Image
          style={{ width: 300, height: 500 }}
          source={{
            uri: urlImage
          }}
        />
        <Text>{JSON.stringify(explanationImage)}</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: ApodList,
    Imagescreen: FullImage
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
