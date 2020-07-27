// A working example of redux-saga usage in global topic
// global topics are the one's who can be used in any application
import {call, delay, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import GlobalConstants from './GlobalConstants';
import GeneralService from '../../services/General/GeneralService'
import { GlobalRedux } from './GlobalRedux';
import { ToastAndroid } from 'react-native';
import { ParsedApiError } from '../../services/base/BaseApiTypes';
import SyncStorage from '../../helper/sync-storage/SyncStorage';
import Security from '../../configs/network/Security';


// ----------------------------------------------------------------------------------------------------------

function* handelDetailReq(action: { type, payload: { params: {type:string,pk:string}} }) {
    let req=''
    if(action.payload.params.type=='movie'){
        req='/'+action.payload.params.type+'s'+'/'+action.payload.params.pk
    }
    else{

        req='/'+action.payload.params.type+'/'+action.payload.params.pk
    }
   

    try {
        
        let res=yield call(GeneralService.getDetailData,req)
        console.log('res detail',res.data)
        let detail=res.data    
        yield put(GlobalRedux.actions.setDetail({detail :detail}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
    
}

function* DetailReq() {

    yield takeLatest(GlobalConstants.DETAIL,handelDetailReq)
}

// ----------------------------------------------------------------------------------------------------------

function* handleloadFilterFieldReq() {
    try {
        
        let res=yield call(GeneralService.getFilterField)
        console.log('res detail',res.data)
        let filterField=res.data    
        yield put(GlobalRedux.actions.setFilterField({filterField :filterField}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
}

function* loadFilterFieldReq() {
    yield takeLatest(GlobalConstants.FILTER_FIELD, handleloadFilterFieldReq)
}


// ----------------------------------------------------------------------------------------------------------

function* handelloadFilterApplyReq(action: { type, payload: { applayFiltter} }) {
    let params=action.payload.applayFiltter
    let typeFilter=action.payload.applayFiltter.filterType

    if(typeFilter=='All'){
        typeFilter='all'
    }
    else if(typeFilter=='Movie'){
        typeFilter='movies'
    }
    else{
        typeFilter='series'
    }


    let headerReq='year[]='+params.dataYears[0]+", "+params.dataYears[1]+'&rates[]='+params.dataIMDB[0]+", "+params.dataIMDB[1]

    if(params.lang.length>0){
        headerReq=headerReq+'&languages[]='
        params.lang.map((x,index) => (index==0) ?headerReq=headerReq+x :headerReq=headerReq+", "+x);
    }

    if(params.country.length>0){
        headerReq=headerReq+'&countries[]='
        params.country.map((x,index) => (index==0) ?headerReq=headerReq+x :headerReq=headerReq+", "+x);
    }

    if(params.genre.length>0){
        headerReq=headerReq+'&genre[]='
        params.genre.map((x,index) => (index==0) ?headerReq=headerReq+x :headerReq=headerReq+", "+x);
    }

    if(params.director.length>0){
        headerReq=headerReq+'&director[]='
        params.director.map((x,index) => (index==0) ?headerReq=headerReq+x :headerReq=headerReq+", "+x);
    }

    if(params.actor.length>0){
        headerReq=headerReq+'&cast[]='
        params.actor.map((x,index) => (index==0) ?headerReq=headerReq+x :headerReq=headerReq+", "+x);
    }


    try {
        
        let res=yield call(GeneralService.setFilter,headerReq,typeFilter)
        console.log('res detail',res.data.results)
        let FilterList=[]
        if(typeFilter=='all'){
            let movie=res.data.movies
            let series=res.data.series
            FilterList=movie.concat(series)
        }
        else{
            FilterList=res.data.results  
        }
        yield put(GlobalRedux.actions.setFilter({FilterList :FilterList}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
    
}

function* loadFilterApplyReq() {

    yield takeLatest(GlobalConstants.FILTER,handelloadFilterApplyReq)
}
// ----------------------------------------------------------------------------------------------------------

function* handleloadDataBase(action: { type, payload: {navigation} }) {
    var user=Security.getAuthInfo()

    var navigation=action.payload.navigation

    console.log('user',user)
    console.log('navigation',action.payload.navigation)

    
    yield put(GlobalRedux.actions.loadUserInfo({token:user.token,userName:user.user.userName}));

    yield delay(1000);
   
    console.log('token',user.token)
    
    if(user.token!=''){

        navigation.navigate('MainTab')
    }
    else{
        navigation.navigate('Subscribe')
    }

}

function* loadDataBaseReq() {
    yield takeLatest(GlobalConstants.LOAD_DATA_BASE, handleloadDataBase)
}


// ----------------------------------------------------------------------------------------------------------


function* handleLoadAppRequest(action: { type, payload: {navigation} }) {
    yield call(SyncStorage.init);
    yield put(GlobalRedux.actions.loadDataBase({navigation:action.payload.navigation}));
}

function* LoadAppReq() {
    yield takeLatest(GlobalConstants.LOAD_APP, handleLoadAppRequest)
}

// ----------------------------------------------------------------------------------------------------------

function* handelloadActorList(action: { type, payload: { char:string} }) {
    let cahr=action.payload.char
   
   

    try {
        
        let res=yield call(GeneralService.actorReq,cahr)
        console.log('Actor',res.data)
        let list=res.data    
        yield put(GlobalRedux.actions.SetActors({ActorList :list}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
    
}

function* loadActorList() {

    yield takeLatest(GlobalConstants.FILTER_ACTORS,handelloadActorList)
}

// ----------------------------------------------------------------------------------------------------------

function* handelloadDirectorList(action: { type, payload: { char:string} }) {
    let cahr=action.payload.char
   
   

    try {
        
        let res=yield call(GeneralService.directorReq,cahr)
        console.log('detail',res.data)
        let list=res.data    
        yield put(GlobalRedux.actions.SetFilterDirector({DirectorList :list}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
    
}

function* loadDirectorList() {

    yield takeLatest(GlobalConstants.FILTER_DIRECTORS,handelloadDirectorList)
}

// ----------------------------------------------------------------------------------------------------------

function* handelsearchReq(action: { type, payload: { char:string} }) {
    let query=action.payload.char
   
   

    try {
        
        let res=yield call(GeneralService.searchReq,query)
        console.log('Actor',res.data)
        let list=res.data    
        yield put(GlobalRedux.actions.setSearch({SearchList :list}))

      
        
    } catch (e) {

        let error: ParsedApiError<any> | any = e;
        console.log('error.status',error)
        ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

        // if (error.status === 500) {
        //     alert('خطای ازتباط با سرور')
        // };
    }
    
}

function* searchReq() {

    yield takeLatest(GlobalConstants.SEARCH,handelsearchReq)
}

// ----------------------------------------------------------------------------------------------------------

export default [
    
    LoadAppReq(),
    loadDataBaseReq(),
    DetailReq(),
    loadFilterFieldReq(),
    loadFilterApplyReq(),
    loadActorList(),
    loadDirectorList(),
    searchReq()

];
