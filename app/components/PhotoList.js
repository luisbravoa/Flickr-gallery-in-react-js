import React from 'react';
import Photo from './Photo';

export default
class PhotoList extends React.Component {
    render(){
        return (
            <div className="flickr-photos">
                {this.props.photos.map(function (photo, index) {
                    return <Photo key={index} data={photo}/>;
                }.bind(this))}
            </div>
        );
    }
}


