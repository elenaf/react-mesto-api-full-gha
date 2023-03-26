import React from "react";

class Popup extends React.Component {

    handleOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose();
        }
    }

    handleEscClick = (evt) => {
        if (evt.key === 'Escape') {
            this.props.onClose();
        }
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            document.addEventListener('keydown', this.handleEscClick);
        } else {
            document.removeEventListener('keydown', this.handleEscClick);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscClick);
    }

    render() {
        
        return (
            <div onClick={this.handleOverlayClick} className={ `popup popup_${ this.props.name } ${ this.props.isOpen ? "popup_opened" : "" }` }>
                <div className={`popup__container ${ (this.props.name === 'image-show') ? '' : 'popup__container_type_form' } `}>
                    <button onClick={this.props.onClose} type="button" className="popup__close-button"></button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Popup;