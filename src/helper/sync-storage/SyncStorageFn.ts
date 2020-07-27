import SyncStorage from './SyncStorage';
import {boundClass} from 'autobind-decorator';
import StorageKeys from './StorageKeys';


@boundClass
export default class SyncStorageFn {

    static Video() {
        return ({
            video: SyncStorage.getItem(StorageKeys.VIDEO, 'video')
        })
    }

}
