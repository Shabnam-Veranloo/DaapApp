import {PReduxAction, PReduxActionCreator, PReduxReducer} from './ActionUtil';
// import NotificationConstants from '../../redux/notification/NotificationConstants';

export class ReducerUtil {

    static create<State = any>(p: {
        name?: string,
        initState: State,
        debug?: boolean,
        actions: Array<PReduxActionCreator<any, any, State>> |
            { [key: string]: PReduxActionCreator<any, any, State> }
    }) {

        if (!Array.isArray(p.actions)) {
            p.actions = Object.values(p.actions);
        }

        let reducersMap = new Map<string, PReduxReducer<State, any>>();

        p.actions.forEach(value => {
            if (value.reducer) {
                reducersMap.set(value.type, value.reducer)
            }
        });

        if (p.debug) {
            console.log(`${p.name}':`)
            console.log(reducersMap);
        }

        const reducer = (state = p.initState, action: PReduxAction<string>) => {
            let reducer = reducersMap.get(action.type);
            if (p.debug) {
                console.log(`'${p.name}': reducer receive action ${action.type}`);
                if (reducer) {
                    console.log(`\t\\ ${action.type} : handle`)
                    console.log(reducer)
                } else {
                    console.log(`\t\\ ${action.type} : ignored`);
                }
            }
            if (reducer) {
                if (p.debug) {
                    console.log('before ' + action.type, action.payload)
                }
                let s = reducer(state, action.payload);
                // if (p.debug) {
                // if (action.type === NotificationConstants.LOAD_ALL_NOTIFICATIONS_SUCCESS) {
                    // alert(reducer)
                    //     alert('after ' + action.payload.list.length);
                    //     return {
                    //         s,
                    //         items: action.payload.list
                    //     }
                // }

                //  }
                return s;
            }
            return state;
        };

        // reducer.name = `${p.name || 'Generated'}-Reducer`;
        reducer.displayName = `${p.name || 'Generated'}-Reducer`;

        return reducer;
    }
}

