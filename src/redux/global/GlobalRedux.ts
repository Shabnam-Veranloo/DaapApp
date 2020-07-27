import ReduxUtil from '../../helper/redux/ReduxUtil';
import GlobalConstants from './GlobalConstants';

type GlobalReduxInitStateType = {
    detail:object
    filterField: object,
    FilterList:object,
    user:{
        is_premium: boolean,
        freemium_left: number,
        is_freemium: boolean
    },
    token:string,
    userName:string,
    DirectorList:object,
    ActorList:object,
    SearchList:object


}

const INIT_STATE: GlobalReduxInitStateType = {
    detail:{},
    filterField: {},
    FilterList:{},
    user:{
        is_premium: false,
        freemium_left: 0,
        is_freemium: false
    },
    token:'',
    userName:'',
    DirectorList:[],
    ActorList:[],
    SearchList:{},
   
};

export const GlobalRedux = ReduxUtil.create({
    namespace: 'global',
    initState: INIT_STATE,
    actions: create => ({
        // we dont need to change state we just use this actions in saga


        loadAppRequest:create(
            GlobalConstants.LOAD_APP,
            (state, payload: {navigation}) => ({
                ...state,
            })
        ),
        loadDataBase:create(
            GlobalConstants.LOAD_DATA_BASE,
            (state, payload: {navigation}) => ({
                ...state,
            })
        ),

        loadUserInfo:create(
            GlobalConstants.LOAD_USER_INFO,
            (state, payload: {token:string,userName:string}) => ({
                ...state,
                token:payload.token,
                userName:payload.userName
            })
        ),

        setLoadUser:create(
            GlobalConstants.LOAD_USER_SET,
            (state, payload: {user:any}) => ({
                ...state,
                user:payload.user
            })
        ),


        //-------------------------------------------------

        loadDetailReq:create(
            GlobalConstants.DETAIL,
            (state, payload: {params:any}) => ({
                ...state,
                ParamsDetail:payload.params
            })
        ),
        setDetail:create(
            GlobalConstants.DETAIL_SET,
            (state, payload: {detail:any}) => ({
                ...state,
                detail:payload.detail
            })
        ),

        //--------------------------------------------------
       
         //-------------------------------------------------

        loadFilterFieldReq:create(GlobalConstants.FILTER_FIELD),

        setFilterField:create(
            GlobalConstants.FILTER_FIELD_SET,
            (state, payload: {filterField:any}) => ({
                ...state,
                filterField:payload.filterField
            })
        ),

        //---------------------------filter----------------------

        loadApplyFilterReq:create(
            GlobalConstants.FILTER,
            (state, payload: {applayFiltter:any}) => ({
                ...state,
                applayFiltter:payload.applayFiltter
            })
        ),
        setFilter:create(
            GlobalConstants.FILTER_SET,
            (state, payload: {FilterList:any}) => ({
                ...state,
                FilterList:payload.FilterList
            })
        ),


        SearchFilterDirector:create(
            GlobalConstants.FILTER_DIRECTORS,
            (state, payload: {char:string}) => ({
                ...state,
            })
        ),

        SetFilterDirector:create(
            GlobalConstants.SET_FILTER_DIRECTORS,
            (state, payload: {DirectorList:any}) => ({
                ...state,
                DirectorList:payload.DirectorList
            })
        ),

        
        SearchActors:create(
            GlobalConstants.FILTER_ACTORS,
            (state, payload: {char:string}) => ({
                ...state,
            })
        ),

        SetActors:create(
            GlobalConstants.SET_FILTER_ACTORS,
            (state, payload: {ActorList:any}) => ({
                ...state,
                ActorList:payload.ActorList
            })
        ),

        //----------------------Search-----------------

        search:create(
            GlobalConstants.SEARCH,
            (state, payload: {char:string}) => ({
                ...state,
            })
        ),

        
        setSearch:create(
            GlobalConstants.SET_SEARCH,
            (state, payload: {SearchList:any}) => ({
                ...state,
                SearchList:payload.SearchList
            })
        ),
    

    }),
    selectors: create => {
        return ({
            detailSelector: create(state => state.detail),
            filterFieldSelector: create(state => state.filterField),
            FilterListSelector: create(state => state.FilterList),
            loadUserSelector: create(state=> state.user),
            userNameSelector:create(state=>state.userName),
            tokenSelector:create(state=>state.token),
            DirectorListSelector:create(state=>state.DirectorList),
            ActorListSelector:create(state=>state.ActorList),
            SearchListSelector:create(state=>state.SearchList),



        })
    },
});
