import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../resource/Colors';

export const TextInputStyle = StyleSheet.create({
    contain: {
        marginHorizontal:wp(5),
        marginBottom:hp(2)
    },
    borderView: {
        height:hp(9),
        borderColor:'red',
        paddingHorizontal:wp(5),
        borderRadius:8,
        backgroundColor:'#fff'

    },
    title:{
        textAlign:'right',
        fontSize:17,
        marginHorizontal:wp(5),
        marginBottom:hp(2)

    },
    line:{
        height:hp(6),
        width:1,
        backgroundColor:colors.gray60Color
    },
    bottomText:{
        textAlign:'left',
        fontSize:15,
        marginHorizontal:wp(3),
        marginTop:hp(2)
    },
    IR:{
        textAlign:'center',
        fontSize:16,
        marginRight:wp(5),
    }
});
