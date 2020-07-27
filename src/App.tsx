

import React, { useState, createContext, useEffect } from 'react';

import { SafeAreaView, StatusBar } from 'react-native';
import colors from './resource/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SyncStorage from './helper/sync-storage/SyncStorage';
import { AccountPage } from './app/scenes/AccountPage/AccountPage';


export const HeaderName=createContext(null)



const App =()=> {

  return (
       
    <AccountPage/>     
   

  
  );
};


export default App;
