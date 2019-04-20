import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';

export class TrackerList extends React.Component {
  render() {
    const data = [
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
    ];

    return (<FlatList data={data} renderItem={({item}) => this._renderRow(item)}/>);
  }

  _renderRow = (item: any) => {
    return(<ListItem 
              bottomDivider
              leftIcon={this.props.icon}
              onPress={() => this._emitMessage(item.key, this.props.isDecrement)}
              key={item} 
              title={item.key} 
              badge={{ value: item.count, textStyle: { color: 'white' } }}
    />);
  }

  _emitMessage = (itemKey: AnalyserNode, isDecrement: bool) => {
    console.warn(isDecrement);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});