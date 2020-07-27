import AsyncStorage from '@react-native-community/async-storage';
import {boundClass} from 'autobind-decorator';


@boundClass
class _SyncStorage {
    protected data: Map<string, any> = new Map();
    protected loading: boolean = true;

    async init(): Promise<void> {
        this.loading = true;
        let keys: Array<string> = await AsyncStorage.getAllKeys();

        

        let data: Array<[string, string | null]> = await AsyncStorage.multiGet(keys);

        // console.log('get all key',data)
        data.forEach((item: [string, string | null]) => {
                let [key, value] = item;
                try {
                    if (value) {
                        value = JSON.parse(value);
                    }
                } catch (e) {
                }
                this.data.set(key, value);
            }
        );
        this.loading = false;
    }



    getItem<T>(key: string, defaultValue?: T): T | any {
        let value = this.data.get(key);
        // console.log('keeeeeeeeeey',value)
        if (value === undefined || value === null) {
            return defaultValue
        }
        return value
    }

    setItem(key: string, value: any): Promise<any> {
        if (!key) {
            return Promise.reject(new Error('invalid key pass to SyncStorage.set : '+key));
        }

        // console.log('here i am')
        this.data.set(key, value);
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): Promise<any> {
        if (!key) {
            return Promise.reject(new Error('invalid key pass to SyncStorage.remove : '+key));
        }

        this.data.delete(key);
        return AsyncStorage.removeItem(key);
    }


    getAllKeys(): Array<any> {
        return Array.from(this.data.keys());
    }
}

const SyncStorage = new _SyncStorage();

export default SyncStorage;
