import reducer from '../../app/reducers/index';

describe('reducer', function () {
    it('it should return the initial state', function () {
        var result = reducer(undefined, {});
        expect(result).toEqual({ photos: {}});
    });

    it('should handle SHOW_LOADER', function () {
        var currentState = {
            photos: {
                photo: []
            }
        };
        var  result = reducer(currentState, { type: 'SHOW_LOADER'});

        expect(result).not.toEqual(currentState);
        expect(result.photos).toEqual({});
        expect(result.loading).toEqual(true);
    });

    it('should handle SHOW_PHOTOS', function () {
        var data = {
            page:1,
            pages: 7,
            photo: ['some', 'list', 'of', 'photos']
        };
        var currentState = {
            photos: {},
            loading: true
        };
        var  result = reducer(currentState, { type: 'SHOW_PHOTOS', data});

        expect(result).not.toEqual(currentState);
        expect(result.photos).toEqual(data);
        expect(result.loading).toEqual(false);
    });
});