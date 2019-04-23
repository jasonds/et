import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import { on, off, sendUpdate } from '../services/BridgeService';
import { TrackerListItem } from './TrackerListItem';
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
    on(this.props.subscription, (m) => this._updateManifest(m));
  }

  componentWillUnmount() {
    off(this.props.subscription);
  }

  render() {
    return (<FlatList data={this.state.data} extraData={this.state} renderItem={({item}) => this._renderRow(item)} />);
  }

  _renderRow = (item) => {
    return(<TrackerListItem 
              item={item}
              emitMessage={this._emitMessage}
              icon={this.props.icon}
              count={item.count}
              isDecrement={this.props.isDecrement} 
            />);
  }

  _emitMessageTimeout = [];
  _emitMessage = (item, isDecrement) => {
    let payload = new ET.Models.UpdatePayload();
    payload.name = item.key;
    payload.count = item.count + (isDecrement ? -1 : 1);

    // set to zero if count is negative
    if (payload.count < 0) {
      payload.count = 0;
    }

    // return if the value has not changed
    if (payload.count === item.count) {
      return;
    }

    // set state immediately
    let { data } = this.state;
    for (var i=0; i < data.length; i++) {
      if (data[i].key === payload.name) {
        data[i].count = payload.count;
        this.setState({ data: data });
      }
    }

    // clear the timer if it is set for this recipe
    if (this._emitMessageTimeout[payload.name]) {
      clearTimeout(this._emitMessageTimeout[payload.name]);
    }

    // queue the update to happen in 2 seconds
    let self = this;
    this._emitMessageTimeout[payload.name] = setTimeout(() => {
        sendUpdate({name: payload.name, count: payload.count});
        self._emitMessageTimeout[payload.name] = null;
      }, 2000);
  }

  _updateManifest = (m) => {
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