// @flow 
import * as React from 'react';
import { Header } from '../../../app/component/Header/Header';
import { View, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../resource/Colors';
import { ImageCircle } from '../../../app/component/ImageCircle/ImageCircle';
import strings from '../../../resource/Strings';
import { TextInputComponent } from '../../../app/component/TextInput/TextInputComponent';
import Row from '../../../app/component/Row/Row';
import { Button } from '../../../app/component/Button/Button';
import { AccountPageStyle } from './AccountPageStyle';

export const AccountPage = () => {

    const[shaba,setShaba]=React.useState(strings.Shaba_Value)
    const[errorShaba,setErrorShaba]=React.useState(false)

    const[name,setName]=React.useState('امیر باقری')
    const[errorName,setErrorName]=React.useState(false)



    const confirm=()=>{
        if(shaba==''){
            setErrorShaba(true)
        }
        if(name==''){
            setErrorName(true)
        }
    }

    return (
        <View style={AccountPageStyle.contain}>
            <ScrollView  style={{flex:1}}>
                    <Header/>

                    <ImageCircle/>

                    <TextInputComponent 
                    title={strings.Name} 
                    type={'Name'} 
                    value={name} 
                    bottomText={'ID: 091265874935'} 
                    error={errorName}
                    changeValue={(txt)=> setName(txt)}/>

                    <TextInputComponent 
                    title={strings.Email} 
                    type={'Email'} 
                    placeholder={strings.PlaceHolder_Email}/>

                    <TextInputComponent 
                    title={strings.Shaba_Number} 
                    type={'Shaba'} 
                    value={shaba}
                    bottomText={strings.Description_Shaba}  
                    error={errorShaba}
                    changeValue={(txt)=> setShaba(txt)}/>

                    <TextInputComponent 
                    title={strings.Invite_Cod} 
                    type={'Code'} 
                    placeholder={'724'} 
                    icon={true}/>

                    <Row style={{marginHorizontal:wp(3)}} >
                        <Button 
                        title={strings.Save} 
                        color={colors.whiteColor} 
                        bg={colors.greenDarkColor}
                        onPress={confirm}/>

                        <Button 
                        title={strings.Cancel} 
                        color={colors.textOne} 
                        bg={colors.whiteColor}
                        border/>
                    </Row>

            </ScrollView>
        </View>
    );
};



