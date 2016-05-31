import React from 'react';
import PhotoList from './PhotoList';
import Pagination from './Paginator';
import Modal from './Modal';
import actions from '../actions/index';

export default
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            page: 1
        };
    }

    componentDidMount() {
        this._triggerShowPhotos();
    }

    _onQueryChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    _onPageChange(page) {
        this.setState({
            page: page
        }, function () {
            this._triggerShowPhotos();
        });
    }

    _triggerShowPhotos (){
        actions.fetchPhotos(this.state.query, this.state.page);
    }

    _onSearch() {
        this.page = 1;
        this._triggerShowPhotos();
    }
    _onKeyPress (e) {
        if (e.charCode == 13) {
            this._onSearch();
        }
    }

    render() {
        const {loading, photos, currentPhotoId} = this.props;

        var content;
        if (loading === true) {
            content = (<div id="loaderWrapper"><img id="loader" src="images/loader.gif"/></div>);
        } else {
            content = (
                <div>
                    <Pagination page={photos.page} totalPages={photos.pages}
                    onChange={this._onPageChange.bind(this)}/>
                    <PhotoList photos={photos.photo || []}/>
                    <Pagination page={photos.page} totalPages={photos.pages}
                                onChange={this._onPageChange.bind(this)}/>
                </div>);
        }
        var modal;

        if (currentPhotoId !== undefined && photos.photo !== undefined && photos.photo.length > 0) {
            modal = <Modal photos={photos.photo} currentPhotoId={currentPhotoId}/>;
        }

        return (
            <div>
                <div id="flickr-container">
                    <div className="photos">
                        <div className="row">
                            <div className="col-md-6"><h1>Photos</h1></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6"><h2>{this.headerText}</h2></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-inline" role="form">
                                    <div className="form-group"><label className="sr-only" for="flickr-search">Email
                                        address</label><input
                                        className="form-control" id="flickr-search" placeholder="search"
                                        value={this.state.query} onChange={this._onQueryChange.bind(this)}  onKeyPress={this._onKeyPress.bind(this)}/></div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-default" id="flickr-search-button"
                                                onClick={this._onSearch.bind(this)}>Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="pages"></div>
                            </div>
                            <div className="col-md-2"><p className="pages-of-pages">Page {this.state.page}
                                of {photos.pages} </p></div>
                        </div>
                        {content}
                    </div>
                </div>

                {modal}
            </div>

        );
    }
}