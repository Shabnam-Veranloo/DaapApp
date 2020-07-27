import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import colors from '../../../resource/Colors';

export const HeaderStyle = StyleSheet.create({
    contain: {
      height:hp(10),
      width:wp(100),
      alignItems:'center',
      backgroundColor:colors.background,
      flexDirection:'row',

    },
    title:{
        flex:1,
        color:colors.whiteColor,
        textAlign:'center',
        fontSize:17
    },
    absolute:{
        position:'absolute',
        right:0
    },
    overflow:{
        position:'absolute',
        height:hp(10),
        width:hp(20),
        overflow:'hidden'
    },
    leftCircle:{
        position:'absolute',bottom:-10,
        left:0,
        height:hp(5),
        width:hp(10),
        backgroundColor:colors.greenLightColor,
        borderTopLeftRadius: 100,
        borderTopRightRadius:100,
        transform: [
            {scaleX: 1.7}
        ]
    },
    rightCircle:{
        position:'absolute',
        top:-hp(5),
        right:0,
        height:hp(13),
        width:hp(15),
        backgroundColor:colors.greenLightColor,
        borderBottomLeftRadius:100,
       
    }
});
