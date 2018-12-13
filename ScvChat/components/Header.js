import {Text, View} from 'react-native';
import React from 'react';

const Header = () =>{
    return(
        <View style={{height:50, backgroundColor:'green', flexDirection: 'row',
            alignConent: 'center'}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'red'}}> 
                    <Text>Options</Text> 
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'skyblue'}}> 
                    <Text>Rooms</Text> 
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'steelblue'}}> 
                    <Text>Direct Messages</Text> 
                </View>
            </View>
    )
}
export default Header;