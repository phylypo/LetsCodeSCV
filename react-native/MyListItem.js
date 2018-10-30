import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
    render() {
      const textColor = this.props.selected ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text style={{ color: textColor }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
}

export default MyListItem;