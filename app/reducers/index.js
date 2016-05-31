export default
function FlickrGallery(state = {photos:{}}, action){
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                photos: {},
                loading: true
            };
        case 'SHOW_PHOTOS':
            return {
                loading: false,
                photos: action.data
            };
        case 'SHOW_PHOTO':
            return {
                loading: false,
                photos: state.photos,
                currentPhotoId: action.id
            };
        default:
            return state
    }
}