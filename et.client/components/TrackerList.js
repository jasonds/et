import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { on, off, sendUpdate } from '../services/BridgeService';
import * as ET from '../core';

export class TrackerList extends React.Component {
  state = { 
    data: [
      {key: 'BEEF', count: 0},
      {key: 'BBQ CHICKEN', count: 0},
      {key: 'HAM & CHEESE', count: 0},
      {key: 'MALBEC BEEF', count: 0},
      {key: 'BACON, DATES & GOAT CHEESE', count: 0},
      {key: 'CHICKEN CURRY', count: 0},
      {key: 'SWEET CORN (V)', count: 0},
      {key: 'SPINACH & CHEESE (V)', count: 0},
      {key: 'MAC & CHEESE (V)', count: 0},
      {key: 'MUSHROOM, THYME & BLUE CHEESE (V)', count: 0},
      {key: 'RATATOUILLE (V)', count: 0},
      {key: 'CARAMELIZED ONION (V)', count: 0},
      {key: 'BANANA NUTELLA (V)', count: 0},
      {key: 'BACON, CHEDDAR & EGG', count: 0},
      {key: 'CHORIZO, BLACK BEAN & EGG', count: 0},
    ]
  };

  componentDidMount() {
    on(ET.Constants.NewMessage, (m) => this._updateManifest(m));
  }

  componentWillUnmount() {
    off(ET.Constants.NewMessage);
  }

  render() {
    return (<FlatList data={this.state.data} extraData={this.state} renderItem={({item}) => this._renderRow(item)}/>);
  }

  _renderRow = (item: any) => {
    return(<ListItem 
              bottomDivider
              leftIcon={this.props.icon}
              onPress={() => this._emitMessage(item, this.props.isDecrement)}
              key={item} 
              title={item.key} 
              badge={{ value: item.count, textStyle: { color: 'white' }, status: this.props.isDecrement ? 'error' : 'success'}}
    />);
  }

  _emitMessage = (item: any, isDecrement: bool) => {
    let payload = new ET.Models.UpdatePayload();
    payload.name = item.key;
    payload.count = item.count + (isDecrement ? -1 : 1);

    sendUpdate({name: payload.name, count: payload.count});
  }

  _updateManifest = (m: any) => {
    let { data } = this.state;

    if(m === null) {
      console.warn("Received invalid message");
      return;
    }

    for (var i=0; i < data.length; i++) {
      if (data[i].key === m.name) {
        data[i].count = m.count;
        this.setState({ data: data });
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});