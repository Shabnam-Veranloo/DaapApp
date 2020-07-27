// @flow 
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ButtonStyle } from './ButtonStyle';


type Props = {
    title:string,
    bg:string,
    color:string,
    border?:boolean
    onPress?
};
export const Button = (props: Props) => {
    return (
        <TouchableOpacity style={{flex:1}} onPress={props.onPress}>
            <View style={[ButtonStyle.contain,{backgroundColor:props.bg,borderWidth:props.border ?1 :0}]}>
                <Text style={[ButtonStyle.title,{color:props.color}]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};


