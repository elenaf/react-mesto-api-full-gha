import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return(
        < PopupWithForm
          title="Редактировать профиль" 
          name="profile-edit"
          buttonName="Сохранить"
          isOpen={ isOpen}
          onClose={ onClose }
          onSubmit={handleSubmit}
        > 
          <label className="popup__label">
            <input id="name-input" type="text" placeholder="Имя" value={name} onChange={handleNameChange} className="popup__input popup__input_field_name" name="name" required minLength="2" maxLength="40"/>
            <span id="name-input-error" className="popup__error"></span>
          </label>
          <label className="popup__label">
            <input id="occupation-input" type="text" placeholder="Род занятий" value={description} onChange={handleDescriptionChange} className="popup__input popup__input_field_occupation" name="about" required minLength="2" maxLength="200"/>
            <span id="occupation-input-error" className="popup__error"></span>
          </label>
        </PopupWithForm>
    )
}