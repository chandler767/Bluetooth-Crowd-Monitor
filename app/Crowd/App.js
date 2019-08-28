import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PubNubReact from 'pubnub-react';

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    this.state = {
        advertising_devices: 0,
        color: '#90EE90',
      }
    // Init PubNub. Use your subscribeKey here.
    this.pubnub = new PubNubReact({
        subscribeKey: 'sub-c-2341e852-bf6a-11e9-b4e2-5e3ae8547541'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    // Subscribe to advertised_devices_count channel and get current count..
    this.pubnub.subscribe({
        channels: ['advertised_devices_count']     
    });
    // Update when a new value is received.
    this.pubnub.getMessage('advertised_devices_count', (msg) => {
      this.updateCount(msg.message)
    });
    // Get and display last count.
    this.pubnub.history(
      {
          channel: 'advertised_devices_count',
          count: 1,
      },
      function (status, response) {
        if (status.statusCode == 200) {
          this.updateCount(response.messages[0].entry)
        }
      }.bind(this)
    );
  }

  componentWillUnmount() {
    // Unubscribe from advertised_devices_count channel.
    this.pubnub.unsubscribe({
        channels: ['advertised_devices_count']
    });
  }

  // Update the count label and set background color.
  updateCount(advertising_devices){
    this.setState({advertising_devices: advertising_devices})
    if (advertising_devices < 3) { // Low Activity (0-2 devices)
      this.setState({color: '#90EE90'}); // Green
    } else if ((advertising_devices >= 3) && (advertising_devices < 6)) { // Moderate Activity (3-5 devices)
      this.setState({color: '#FFFF00'}); // Yellow
    } else if ((advertising_devices >= 6) && (advertising_devices < 8)) { // High Activity (6-7 devices)
      this.setState({color: '#FFBE4D'}); // Orange
    } else if ((advertising_devices >= 8) && (advertising_devices < 11)) { // Very High Activity (8-10 devices)
      this.setState({color: '#FF9999'}); // Red
    } else if (advertising_devices >= 11) { // Extreme Activity (11+ devices)
      this.setState({color: '#FF99FF'}); // Purple
    };
  }

  render() {
    return (
      // Display advertising BLE devices count.
      <View style={[styles.container, {backgroundColor: this.state.color}]}>
        <Text style={styles.label}>Advertising BLE Devices</Text>
        <Text style={styles.count}>{this.state.advertising_devices}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
    margin: 10,
    paddingTop: 25,
    color: '#000000',
  },
  count: {
    fontSize: 100,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
});