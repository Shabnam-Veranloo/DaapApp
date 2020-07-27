// @flow 
import * as React from 'react';
import { View, Text ,TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../resource/Colors';
import Row from '../Row/Row';
import { IconComponent } from '../Icon/IconComponent';
import { TextInputStyle } from './TextInputStyle';

type Props = {
    title:string,
    type:string,
    value?:string,
    bottomText?:string,
    placeholder?:string,
    icon?:Boolean,
    iconName?:string,
    iconType?:string,
    error?:boolean,
    changeValue?

    
};
export const TextInputComponent = (props: Props) => {

    const renderTextInput=()=>{
        if(props.icon){

            return(
                <Row style={{alignItems:'center'}}>
                    <IconComponent type={'feather'} name={'share-2'} size={35} color={'#000'}/>
                    <View style={{flex:1,marginLeft:wp(3)}}>
                        <TextInput
                        value={!!props.value ?props.value :undefined}
                        placeholder={!!props.placeholder ?props.placeholder :undefined}
                        style={[TextInputStyle.borderView, {color: colors.textOne,borderWidth:props.error ?1 :0}]}                        
                        placeholderTextColor={colors.textTwo}
                        maxLength={20}
                        multiline={false}
                        onChangeText={(txt) => props.changeValue(txt)}
                        />
                    </View>
                </Row>
            );
        }
        else{
            return(
                
                <TextInput
                value={!!props.value ?props.value :undefined}
                placeholder={!!props.placeholder ?props.placeholder :undefined}
                style={[TextInputStyle.borderView, {color: colors.textOne,borderWidth:props.error ?1 :0}]}                        
                placeholderTextColor={colors.textTwo}
                maxLength={20}
                multiline={false}
                onChangeText={(txt) => props.changeValue(txt)}
                />
            );
        }
    }

    return (
        <View style={TextInputStyle.contain}>

            <Text style={TextInputStyle.title}>{props.title}</Text>
            {props.type=='Shaba'
            ?<View style={[TextInputStyle.borderView,{flexDirection:'row',alignItems:'center'}]}>
                <Text style={TextInputStyle.IR}>IR</Text>

                <View style={TextInputStyle.line}/>

                <TextInput
                value={props.value}
                style={{color: colors.textOne,paddingHorizontal:wp(5),fontSize:17}}                        
                placeholderTextColor={colors.textTwo}
                multiline={false}
                maxLength={30}
                keyboardType={'numeric'}
                onChangeText={(txt) => props.changeValue(txt)}
                />
            </View>

            :renderTextInput()
            }

            {!!props.bottomText &&
            <Text style={TextInputStyle.bottomText}>{props.bottomText}</Text>
            }

        </View>
    );
};
