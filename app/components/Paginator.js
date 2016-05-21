import React from 'react';

export default
class Pagination extends React.Component {

    _onPageChange(event) {
        event.preventDefault();
        this.setState({
            page: event.target.getAttribute('data-page')
        });

        if (this.props.onChange) {
            this.props.onChange(event.target.getAttribute('data-page'));
        }
    }

    render() {

        var currentPage = parseInt(this.props.page);
        var totalPages = parseInt(this.props.totalPages);
        var pageNav = [];

        if (currentPage > 1) {
            pageNav.push({text: '<< Back', number: currentPage - 1, current: false});
        }

        var start = (currentPage - 2 < 1) ? 1 : currentPage - 2;
        var end = (start + 4 > totalPages) ? totalPages : start + 4;

        for (var i = start; i <= end; i++) {
            if (i == currentPage) {
                pageNav.push({text: currentPage, number: currentPage, current: true});

            } else {
                if (i >= currentPage - 4 && i < currentPage + 4) {
                    pageNav.push({text: i, number: i, current: false});
                }
            }
        }
        if (currentPage < totalPages) {
            pageNav.push({text: 'Next >>', number: (currentPage + 1), current: false});
        }

        return (
            <div className="paginationWrapper">
                <ul className="pagination">
                    {pageNav.map(function (page, index) {
                        return <li className={page.current? 'current':''} key={index}>
                            <a href='#' onClick={this._onPageChange.bind(this)}
                               data-page={page.number}>{page.text}</a>
                        </li>;
                    }.bind(this))}
                </ul>
            </div>
        );
    }
}
