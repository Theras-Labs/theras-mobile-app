import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import ActionButton from 'react-native-action-button';
// import {WebView} from 'react-native-webview';
// import Icon from 'react-native-vector-icons/Ionicons';

class PushScreen extends React.Component {
  static navigationOptions = {
    title: 'Push',
  };

  constructor(props) {
    super(props);
    this.state = {flashenable: false};
  }

  componentWillUnmount() {
    this.vb.stop();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#333'}}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <NodeCameraView
          style={{flex: 1}}
          ref={vb => {
            this.vb = vb;
          }}
          outputUrl={
            this.props.route.params.pushserver + this.props.route.params.stream
          }
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 1,
            bitrate: 500000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          smoothSkinLevel={3}
          autopreview={true}
          onStatus={(code, msg) => {
            console.log('onStatus=' + code + ' msg=' + msg);
          }}
        />
        <View>
          <View
            style={{
              // backgroundColor: 'gray',
              padding: 5,
              margin: 30,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'red',
                width: 6,
                height: 6,
                marginRight: 5,
                borderRadius: 50,
              }}
            />
            <Text style={{color: 'red'}}>Live</Text>
          </View>

          {/* <WebView
            source={{
              uri: 'https://tools.theras.xyz/widget/dellwatson**',
            }} // Replace with the actual widget URL
            style={{
              border: 1,
              borderColor: 'red',
              position: 'absolute',
            }}
          /> */}
        </View>
        <ActionButton
          buttonColor="#1abc9c"
          offsetY={32}
          offsetX={16}
          size={32}
          hideShadow={true}
          verticalOrientation="down">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Reverse Camera"
            onPress={() => {
              this.vb.switchCamera();
              this.state.flashenable = false;
            }}>
            <Text>R</Text>
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Switch Flashlight"
            onPress={() => {
              this.state.flashenable = !this.state.flashenable;
              this.vb.flashEnable(this.state.flashenable);
            }}>
            <Text>S</Text>
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#e6ce28"
            title="Publish"
            onPress={() => {
              this.vb.start();
            }}>
            <Text>P</Text>
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#e74c3c"
            title="Close"
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text>X</Text>
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default PushScreen;
