import React from 'react';
import { ListItem } from 'react-native-elements';

export class TrackerListItem extends React.PureComponent {
  render() {
      return (
        <ListItem 
          bottomDivider
          leftIcon={this.props.icon}
          onPress={() => this.props.emitMessage(this.props.item, this.props.isDecrement)}
          key={this.props.item} 
          title={this.props.item.key} 
          badge={{ value: this.props.count, textStyle: { color: 'white' }, status: this.props.isDecrement ? 'error' : 'success'}}
        />
      );
  }
}
