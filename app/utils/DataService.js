var $ = require('jquery');

function DataService() {
    this.perPage = 150;
    this.api_key = "8e8b0a8d39a7af07485e7b992084a350";
    this.base_url = "https://api.flickr.com/services/rest/";

}

DataService.prototype.fetch = function (search='', page=1) {

    return new Promise((resolve, reject) => {

        var params = {
            api_key: this.api_key,
            per_page: this.perPage,
            format: 'json',
            nojsoncallback: 1,
            page: (page != null && page > 0) ? page : 1,
            method: (search != null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
        };

        if ((search != null && search.length > 0)) {
            params.text = search;
        }

        $.ajax({
            type: "GET",
            dataType: "json",
            url: this.base_url,
            data: params,
            success: resolve,
            error: reject
        });
    });


};

module.exports = DataService;