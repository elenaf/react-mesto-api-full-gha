import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })

    }

    useEffect(() => {
      avatarRef.current.value = ''
    }, [isOpen]);

    return(
        < PopupWithForm
          title="Обновить аватар" 
          name="avatar-update"
          buttonName="Сохранить"
          isOpen={ isOpen }
          onClose={ onClose }
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input ref={avatarRef} id="avatar-link-input" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_picture-link" name="avatar" required />
            <span id="avatar-link-input-error" className="popup__error"></span>
          </label>
        </PopupWithForm>
    )
}