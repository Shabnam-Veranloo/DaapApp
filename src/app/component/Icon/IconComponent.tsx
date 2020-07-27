// @flow 
import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'
import { IconProps } from 'react-native-vector-icons/Icon';
import colors from '../../../resource/Colors';
import { IconStyle } from './Iconstyle';

type Props = Partial<IconProps> & {
    title?: string,
    raised?:boolean,
    reverse?:boolean,
    name:string,
    type:string,
    color?:string,
    size?:number
};

export const IconComponent = (props: Props) => {
    return (
        <View style={IconStyle.contain}>
            <Icon
            name={props.name}
            type={props.type}
            color={!!props.color ?props.color :colors.whiteColor}
            size={!!props.size ?props.size :20}
            />
        </View>
    );
};

