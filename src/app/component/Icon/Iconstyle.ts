import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const IconStyle = StyleSheet.create({
    contain: {
      width:hp(5),
      height:hp(5),
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:wp(2),
      backgroundColor:'transparent',
      flexDirection:'row'
    },
});
