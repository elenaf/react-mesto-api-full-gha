import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
      onCardClick({ ...card});
    }

    function handleLikeClick() {
      onCardLike({ ...card});
    }

    function handleCardDelete() {
      onCardDelete({ ...card});
    }

    return(
    <div className="element">
        <img onClick={handleClick} className="element__image" src={card.link} alt={card.name}/>
        {isOwn && (<button onClick={handleCardDelete} type="button" className="element__trash-button"></button>)}
        <div className="element__caption">
          <h2 className="element__place-name">{card.name}</h2>
          <div className="element__like">
            <button onClick={handleLikeClick} type="button" className={`element__like-button ${isLiked ? "element__like-button_active" : "c"}`}></button>
            <div className="element__like-amount">{card.likes.length}</div>
          </div>
        </div>
    </div> 
    );
}