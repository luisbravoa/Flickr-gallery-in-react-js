import React from 'react';
import PhotoList from './PhotoList';
import Pagination from './Paginator';
import Flickr from '../services/Flickr';

export default
class App extends React.Component {
    constructor(props) {
        super(props);
        this.service = new Flickr();
        this.state = {
            query: '',
            page: 1,
            loading: true
        };
    }

    componentDidMount (){
        this._onSearch();
    }

    _onQueryChange(event) {
        this.setState({query: event.target.value});
    }

    _onPageChange(page) {
        this.setState({
            page: page
        });
        this.search();
    }

    _onSearch() {
        this.setState({
            page: 1
        });
        this.search();
    }

    search (){
        this.setState({
            loading: true
        });
        this.service.search(this.state.query, this.state.page, function (data) {

            if (this.state.query !== '') {
                this.headerText = 'Results for "' + this.state.query + '"';
            } else {
                this.headerText = 'Most recent photos';
            }
            this.pages = data.photos.pages;

            this.photos = data.photos.photo;

            this.setState({
                loading: false
            });


        }.bind(this));
    }

    render() {
        var content;
        if (this.state.loading === true) {
            content = (<div><img src="images/loader.gif"/></div>);
        } else {
            content = (<PhotoList photos={this.photos}/>);
        }


        return (
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
                                    value={this.state.query} onChange={this._onQueryChange.bind(this)}/></div>
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
                        <div className="col-md-2"><p className="pages-of-pages">Page {this.state.page} of {this.pages}</p></div>
                    </div>
                    <Pagination page={this.state.page} totalPages={this.pages} onChange={this._onPageChange.bind(this)}/>
                    {content}
                </div>
            </div>
        );
    }
}