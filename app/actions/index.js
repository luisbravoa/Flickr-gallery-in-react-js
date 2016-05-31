import store from '../stores/index';

import DataService from '../utils/DataService';
const dataService = new DataService();

function fetchPhotos(query, page) {
    store.dispatch({
        type: 'SHOW_LOADER'
    });
    dataService.fetch(query, page)
        .then((data) => {
            store.dispatch({
                type: 'SHOW_PHOTOS',
                data: data.photos
            });
        })
        .catch((e)=>{
            store.dispatch({
                type: 'SHOW_ERROR'
            });
        });
}

function showPhoto (id){
    store.dispatch({
        type: 'SHOW_PHOTO',
        id: id
    });
}

export default {
    fetchPhotos,
    showPhoto
};