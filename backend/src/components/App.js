import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: null,
      currentUser: {
        name: '',
        about: '',
      },
      cards: [],
    }
  }

  componentDidMount() {
    api.getUserInfo()
    .then(data => {
      this.setState({
        currentUser: data,
      })
    })
    .catch((err) => {
      console.log(err);
    })

    api.getInitialCards()
    .then(data => {
      this.setState({
        cards: data,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className='page'>
        < Header />
        < Main
          cards = {this.state.cards}
          onEditProfile = {this.handleEditProfileClick}
          onAddPlace = {this.handleAddPlaceClick}
          onEditAvatar = {this.handleEditAvatarClick}
          onCardClick = {this.handleCardClick}
          onCardLike = {this.handleCardLike}
          onCardDelete = {this.handleCardDelete}
        />
        < Footer />
        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />
        
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlace} />
          
        <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />    
        
        < PopupWithForm
          title="Вы уверены?" 
          name="remove-submit"
          buttonName="Да"
        />
        < ImagePopup 
          name="image-show"
          isOpen={!!this.state.selectedCard}
          card={this.state.selectedCard}
          onClose={this.closeAllPopups}
        />
        </div>
      </CurrentUserContext.Provider>
    );
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  }

  handleCardClick = (card) => {
    this.setState( {
      selectedCard: { ...card },
    })
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);

    api.changeLikeStatus(card._id, isLiked).then((newCard) => {
      this.setState({ cards: this.state.cards.map((c) => c._id === card._id ? newCard : c) });
    }).catch((err) => {
      console.log(err);
    })

  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      this.setState({ cards: this.state.cards.filter(cardElement => cardElement._id !== card._id ) });
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpdateUser = ({ name, about }) => {
    api.editProfile({name, about})
    .then((data) => {
      this.setState({ currentUser: { ...this.state.currentUser, name: data.name, about: data.about} });
      this.closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  handleUpdateAvatar = ({ avatar }) => {
    api.updateAvatar({avatar})
    .then((data) => {
      
      this.setState({ currentUser: { ...this.state.currentUser, avatar: data.avatar} });
      this.closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  handleAddPlace = ({ name, link }) => {
    api.addNewCard({name, link})
    .then((data) => {
      this.setState({ cards: [data, ...this.state.cards]});
      this.closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  closeAllPopups = () => {
    this.setState({ 
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: null,
    });
  }
}

export default App;
