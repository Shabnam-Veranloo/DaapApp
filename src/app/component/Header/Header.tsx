// @flow 
import * as React from 'react';
import { View, Text } from 'react-native';
import colors from '../../../resource/Colors';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../../resource/Strings';
import { IconComponent } from '../Icon/IconComponent';
import { HeaderStyle } from './HeaderStyle';




export const Header = () => {
    return (

        <LinearGradient
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}} 
        colors={[colors.greenColor,colors.greenDarkColor]} 
        style={HeaderStyle.contain}>

            <Text style={HeaderStyle.title}>{strings.Account}</Text>

            
            <View style={HeaderStyle.absolute}>
                <IconComponent type={'feather'} name={'menu'} size={30}/>
            </View>

            <View style={HeaderStyle.rightCircle}/>
            <View style={HeaderStyle.overflow}>
                <View style={HeaderStyle.leftCircle}/>
            </View>

        </LinearGradient>
         

    );
};
