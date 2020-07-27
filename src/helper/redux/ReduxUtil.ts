import {PActionBuilder, PReduxActionCreator} from './ActionUtil';
import {createSelector, Selector} from 'reselect';
import {Reducer} from 'redux';
import {ReducerUtil} from './ReducerUtil';
import Application from '../../configs/Application';

// type ValuesOf<T extends any[]> = T[number];
// type InitStateOf<T extends Array<{ namespace, initState }>> = {
//     [key in T[number]['namespace']]: T[number]['initState']
// };

type Input<State,
    Namespace extends string,
    Types,
    ActionCreatorMap extends { [key: string]: PReduxActionCreator<any, any, any> },
    Selectors,
    RootState = { [namespace in Namespace]: State } | any> = {
    /**
     * redux state sub tree name
     * rootState :{
     *     namespace : state
     * }
     * use in combineReducer as a key
     */
    namespace: Namespace
    /**
     * init redux store state
     */
    initState: State,
    /**
     * just use for type checking
     */
    types?: Types,
    debug?: boolean,
    /**
     * @param create
     */
    actions: (
        create: <Payload extends {}, Type extends string = any>(
            type: Type,
            reducer?: (state: State, payload?: Payload) => State
        ) => PReduxActionCreator<Type, Payload>
    ) => ActionCreatorMap,
    /**
     * @param create
     */
    selectors: (create: <R>(selector: Selector<State, R>) => Selector<RootState, any>) => {
        [key in keyof Selectors]: Selector<RootState, any>
    }
}

type PGeneratedReduxType<NameSpace extends string = string, State = any, ReducerType = any> = {
    namespace: NameSpace,
    initState: State,
    actions,
    selectors,
    reducer: ReducerType,
}

export default class ReduxUtil {
    static debug: boolean = false;

    static create<State,
        Namespace extends string,
        Types extends { [key: string]: string },
        ActionCreatorMap extends ({ [key: string]: PReduxActionCreator<keyof Types, any, State> }),
        Selectors = {}>
    (p: Input<State, Namespace, Types, ActionCreatorMap, Selectors>) {

        p.debug = p.debug || this.debug;

        let actionBuilder = new PActionBuilder<State>();

        let actionCreatorMap = p.actions(actionBuilder.create as any);

        let actions: any = {};
        Object.keys(actionCreatorMap).forEach(actionCreatorName => {
            let creator = actionCreatorMap[actionCreatorName];
            let type = creator.type;
            let displayName = p.namespace + '.actions.' + actionCreatorName;

            creator.displayName = displayName;
            /**
             * check for some commonly bugs
             * prevent use same action type more than ones
             */
            if (p.debug || __DEV__ || Application.IS_DEBUG) {
                if (actions[type]) {
                    console.error(
                        'You try to use a same action type more than ones\n' +
                        'because this may cause a bug you should fix it now.\n' +
                        `check below :\n` +
                        `type : ${type}\n` +
                        `first action maker : ${creator.displayName}\n` +
                        `second action maker ${actions[type].displayName}\n` +
                        ` and fix it. :)`)
                }
                actions[type] = creator
            }
        });

        let reducer = ReducerUtil.create({
            name: p.namespace,
            initState: p.initState,
            actions: actionCreatorMap,
            debug: p.debug
        });

        let select = (root: any) => root[p.namespace];

        let selectors = {
            select,
            ...p.selectors((s) => createSelector(select, s))
        };


        let redux = {
            namespace: p.namespace as Namespace,
            initState: p.initState,
            actions: actionCreatorMap,
            selectors,
            reducer,
        };
        if (p.debug) {
            console.log(redux)
        }
        return redux;
    }


    static extractReducers<T extends string>(...reduxInfo: Array<PGeneratedReduxType<T>>): { [key in T]: Reducer<any, any> } {
        let reducers: any = {};
        reduxInfo.forEach(redux => {
            reducers[redux.namespace] = redux.reducer
        });
        return reducers;
    }

    static extractInitState<T extends string>(...reduxInfo: Array<PGeneratedReduxType<T>>): { [key in T]: any } {
        let state: any = {};
        reduxInfo.forEach(redux => {
            state[redux.namespace] = redux.initState
        });
        return state;
    }
}

