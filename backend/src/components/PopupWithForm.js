import React from "react";
import Popup from "./Popup";

class PopupWithForm extends React.Component {

    render() {

        return (
                <Popup isOpen={ this.props.isOpen } name={ this.props.name } onClose={ this.props.onClose }>
                        <form onSubmit={ this.props.onSubmit } className="popup__form" name={this.props.name} noValidate>
                        <h2 className="popup__title">{this.props.title}</h2>
                        <fieldset className="popup__fields">
                            {this.props.children}
                        </fieldset>
                        <button type="submit" className="popup__save-button">{this.props.buttonName}</button>
                        </form>
                </Popup>
            );
    }
}

export default PopupWithForm;