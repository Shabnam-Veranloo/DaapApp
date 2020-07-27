import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../resource/Colors';

export const ButtonStyle = StyleSheet.create({
    contain: {
      flex:1,
      borderRadius:8,
      height:hp(8),
      marginHorizontal:wp(2),
      justifyContent:'center',
      alignItems:'center',
      borderColor:colors.gray30Color,
      marginTop:hp(3),
      marginBottom:hp(10)
    },
    title:{
        fontSize:18
    }
});
