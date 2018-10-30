import React from 'react'
import {View, Button, Text} from 'react-native'
import PropTypes from 'prop-types';

class ItemRow extends React.Component {
    // don't have access to this.state, will this constructor help
    // constructor(props, context) {
    //     super(props, context);
    // }
    onPress() {
        console.log("clicked button Delete - itemObj name:", this.props.itemObj.name);
        this.props.onPressFnc(this.props.itemObj);
    }
    render() {
        return(
            <View>
                <Text>Item: {this.props.itemObj.name}</Text>
                <Button title="Delete" onPress={this.onPress.bind(this)} />
            </View>
        );
    }
}

ItemRow.propTypes = {
    onPressFnc : PropTypes.func.isRequired,
    itemObj : PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default ItemRow;