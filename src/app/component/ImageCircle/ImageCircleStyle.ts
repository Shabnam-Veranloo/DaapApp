import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../resource/Colors';

export const imageCircleStyle = StyleSheet.create({
    bigCicle: {
      height:hp(22),
      alignSelf:'center',
      width:hp(22),
      borderRadius:100,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:colors.background,

    },
    smallCircle: {
        height:hp(19),
        width:hp(19),
        borderRadius:100,
        alignItems:'center',
        backgroundColor:'#66666698',
    },
    title:{
        flex:1,
        color:colors.blueColor,
        textAlign:'center',
        fontSize:19,
        marginVertical:hp(2)
    },
    absolute:{
        position:'absolute',
    }
});
