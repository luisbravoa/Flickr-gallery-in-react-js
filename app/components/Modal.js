import React from 'react';

export default
class Modal extends React.Component {

    openModal() {
        if ($('#modal').hasClass('in')) return;

        this.bindKeyDown();

        $('#modal').modal();
        $('#modal').on('hide.bs.modal', this.onClose.bind(this));
    }

    bindKeyDown() {
        $(document).bind('keydown', function (e) {
            var key = e.keyCode;
            if (key == 39 && this.getNextPhotoId() !== undefined) {
                location.hash = 'photo/' + this.getNextPhotoId();
            }
            if (key == 37 && this.getPreviousPhotoId() !== undefined) {
                location.hash = 'photo/' + this.getPreviousPhotoId();
            }
        }.bind(this));
    }

    onClose() {
        // unbind keydown
        $(document).unbind('keydown');
        location.hash = '';
    }

    componentDidMount() {
        this.openModal();
    }

    getPhotoById(id) {
        for (var i = 0; i < this.props.photos.length; i++) {
            if (this.props.photos[i].id === id) {
                return this.props.photos[i];
            }
        }
    }

    getNextPhotoId() {
        var photoIndex = this.props.photos.indexOf(this.photo);
        if (photoIndex !== -1 && this.props.photos[photoIndex + 1] !== undefined) {
            return this.props.photos[photoIndex + 1].id;
        }
    }

    getPreviousPhotoId() {
        var photoIndex = this.props.photos.indexOf(this.photo);
        if (photoIndex !== -1 && this.props.photos[photoIndex - 1] !== undefined) {
            return this.props.photos[photoIndex - 1].id;
        }
    }

    render() {
        this.openModal();

        this.photo = this.getPhotoById(this.props.currentPhotoId);

        if (this.photo === undefined) {
            return <div></div>;
        }
        var src = 'http://farm' + this.photo.farm + '.static.flickr.com/' + this.photo.server + '/' + this.photo.id + '_' + this.photo.secret + '_z.jpg';

        var photoIndex = this.props.photos.indexOf(this.photo);

        var next = '';
        var previous = '';

        if (this.props.photos[photoIndex + 1] !== undefined) {
            next = (
                <div className="next">
                    <a href={'#photo/'+this.props.photos[photoIndex + 1].id} className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
            );
        }
        if (this.props.photos[photoIndex - 1] !== undefined) {
            previous = (
                <div className="prev">
                    <a href={'#photo/'+this.props.photos[photoIndex - 1].id} className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                    </a>
                </div>
            );
        }

        return (
            <div className="modal fade photoModal" id="modal" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">{this.photo.title}</h4></div>
                        <div className="modal-body">
                            {previous}
                            <div className="detailedPhoto"><a
                                href="http://www.flickr.com/photos/96025815@N05/26540743544" target="_blank"><img
                                src={src}/></a></div>
                            {next}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



