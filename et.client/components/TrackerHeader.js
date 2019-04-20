import React from 'react';
import { Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';


export class TrackerHeader extends React.Component {

  render() {
    const { title } = this.props;
    return (<Header 
      backgroundColor='#0096d6'
      centerComponent={{ text: title, style: { color: '#fff' } }}>
      </Header>);
  }
}