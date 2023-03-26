import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    
    const placeNameRef = React.useRef();
    const placeLinkRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value,
        })

    }

    useEffect(() => {
      placeNameRef.current.value = '';
      placeLinkRef.current.value = '';
    }, [isOpen]);
    
    return(
        <PopupWithForm
          title="Новое место" 
          name="place-add"
          buttonName="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input ref={placeNameRef} id="place-name-input" type="text" placeholder="Название" className="popup__input popup__input_field_place-name" name="name" required minLength="2" maxLength="30" />
            <span id="place-name-input-error" className="popup__error"></span>
          </label>
          <label className="popup__label">
            <input ref={placeLinkRef} id="picture-link-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_picture-link" name="link" required />
            <span id="picture-link-input-error" className="popup__error"></span>
          </label>
        </PopupWithForm>
    )
}