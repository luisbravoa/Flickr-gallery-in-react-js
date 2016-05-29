import React from 'react';

export default
class Photo extends React.Component {
    render() {

        var src = `http://farm${this.props.data.farm}.static.flickr.com/${this.props.data.server}/${this.props.data.id}_${this.props.data.secret}_s.jpg`;

        return (
            <div className="flickr-photo">
                <a href={"#photo/"+this.props.data.id}><img className="alpha" src={src}/></a>
            </div>
        );
    }
}



