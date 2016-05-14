var $ = require('jquery');

function Flickr() {
    this.perPage = 150;
    this.api_key = "8e8b0a8d39a7af07485e7b992084a350";
    this.base_url = "https://api.flickr.com/services/rest/";

}


Flickr.prototype.search = function (search, page, success, error) {
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
        success: success,
        error: error
    });
};

module.exports = Flickr;