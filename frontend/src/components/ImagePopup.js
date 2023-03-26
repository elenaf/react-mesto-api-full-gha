import React from "react";
import Popup from "./Popup";

class ImagePopup extends React.Component {

    render() {
        return (
            <Popup isOpen={ this.props.isOpen } name={ this.props.name } onClose={ this.props.onClose }>
                <figure className="popup__content">
                    <img className="popup__image" alt={this.props.card?.name} src={this.props.card?.link} />
                    <figcaption className="popup__image-caption">{this.props.card?.name}</figcaption>
                </figure>
           </Popup>
        )
    }
}

export default ImagePopup;