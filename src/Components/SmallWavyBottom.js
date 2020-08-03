import React, { Component } from "react";
import { Text, View } from "react-native";

import Svg, { Path } from "react-native-svg";
export default class SmallWavyBottom extends Component {
  render() {
    return (
      <>
        <View>
          <Svg height="100" width="100%" viewBox="0 0 1440 320">
            <Path
              fill="#FF4A4A"
              d="M0,128L80,117.3C160,107,320,85,480,106.7C640,128,800,192,960,202.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </Svg>
        </View>
        <View
          style={{
            height: 150,
            backgroundColor: "#FF4A4A",
            marginTop: -10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.children}
        </View>
      </>
    );
  }
}
