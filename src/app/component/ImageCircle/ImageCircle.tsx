// @flow 
import * as React from 'react';
import { View, Image, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import strings from '../../../resource/Strings';
import { imageCircleStyle } from './ImageCircleStyle';

export const ImageCircle = () => {
    return (
        <View>
            <View style={[imageCircleStyle.bigCicle,{marginTop:hp(2)}]}>
                <Image source={require('../../../assets/images/15.png')} style={imageCircleStyle.bigCicle}/>
                <View style={imageCircleStyle.absolute}>
                    <View style={imageCircleStyle.smallCircle}/>
                </View>
            </View>
            <Text style={imageCircleStyle.title}>{strings.Change_profile_pic}</Text>
        </View>
    );
};
