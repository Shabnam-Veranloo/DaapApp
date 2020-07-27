import {boundClass} from 'autobind-decorator';

export type PReduxAction<Type = any, Payload = any> = { type: Type, payload: Payload };
export type PReduxReducer<State, Payload> = (state: State, payload: Payload) => State
export type PReduxActionCreator<Type, Payload = any, State = any> = ((payload: Payload) => PReduxAction<Type, Payload>) & {
    type: Type,
    reducer?: PReduxReducer<State, Payload>
    displayName?:string
}

@boundClass
export class PActionBuilder<State> {
    protected readonly namespace: string;

    constructor(namespace?: string) {
        this.namespace = namespace || ''
    }

    create<Payload extends {}, Type extends string = any>(
        type: Type, reducer?: PReduxReducer<State, Payload>
    ): PReduxActionCreator<string, Payload> {

        let typeWithNameSpace = this.namespace + type;

        function maker(payload: Payload) {
            return {
                type: typeWithNameSpace,
                payload
            }
        }

        // maker.name = `ActionCreator[${typeWithNameSpace}]`;
        maker.displayName = `ActionCreator[${typeWithNameSpace}]`;
        maker.type = typeWithNameSpace;
        maker.toString = () => typeWithNameSpace; // make use action creator in saga as a normal input possible
        maker.reducer = reducer;

        return maker;
    }
}

let defaultMaker = new PActionBuilder('');


export class ActionUtil {
    /**
     * create an action maker instance with default action type prefix
     * @param namespace
     */
   public static withNamespace<State>(namespace: string|null) {
        if (!namespace) {
            return defaultMaker as PActionBuilder<State>;
        }
        return new PActionBuilder<State>(namespace)
    }

    static create = defaultMaker.create
}
