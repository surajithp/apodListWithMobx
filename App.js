import React from "react";
import { Button, View, Text, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import glamorous, { ThemeProvider } from "glamorous-native";
import ApodList from "./src/ApodList";

const FullImageview = glamorous.view({
  flex: 1
});
const Explanationview = glamorous.view({
  position: "absolute",
  bottom: 0
});
const Dateview = glamorous.view({
  position: "absolute",
  top: 0,
  right: 0
});
const ExplanationText = glamorous.text({
  color: "white"
});
const TitleText = glamorous.text({
  color: "white",
  fontSize: 20,
  fontWeight: "bold"
});

class FullImage extends React.Component {
  render() {
    const { navigation } = this.props;
    const urlImage = navigation.getParam("imageUrl", "Image Not loaded");
    const explanationOfImage = navigation.getParam(
      "imgExplanation",
      "Image Explanation "
    );
    const imagedate = navigation.getParam(
      "imageDate",
      "Date of Particular Iamge"
    );
    return (
      <FullImageview>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: urlImage
          }}
        />
        <Explanationview>
          <ExplanationText>
            <TitleText>Title Explanation:</TitleText>
            {explanationOfImage}
          </ExplanationText>
        </Explanationview>
        <Dateview>
          <ExplanationText>{imagedate}</ExplanationText>
        </Dateview>
      </FullImageview>
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
