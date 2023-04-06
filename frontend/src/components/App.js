import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ErrorTooltip from './ErrorTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../utils/Auth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isInfoTooltipOpen: false,
      isErrorTooltipOpen: false,
      selectedCard: null,
      loggedIn: false,
      loadingData: true,
      currentUser: {
        name: '',
        about: ''
      },
      userData: {
        email: '',
        id: ''
      },
      registrationResult: {
        successMessage: 'Вы успешно зарегистрировались!',
        errorMessage: 'Что-то пошло не так! Попробуйте еще раз',
      },
      cards: [],
    }
  }

  componentDidMount() {
    if (this.state.loggedIn && this.state.loadingData) {
      this.setState({
        loadingData: false,
      });

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
    this.tokenCheck();
  }

  componentDidUpdate() {
    if (this.state.loggedIn && this.state.loadingData) {
      this.setState({
        loadingData: false,
      });

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
      isInfoTooltipOpen: false,
      isErrorTooltipOpen: false,
      selectedCard: null,
    });
  }

  handleLogin = (password, email) => {
    Auth.login(password, email)
        .then((data) => {
            if(data.token){
              localStorage.setItem('token', data.token);
                this.setState({loggedIn: true, userData: {email: email}}, () => {
                    this.props.history.push('/');
                })
            } else {
              this.setState({isErrorTooltipOpen: true});
            }
        })
        .catch(err => console.log(err));
  }

  handleRegister = ({ password, email }) => {
    Auth.register(password, email)
        .then((res) => {
            if(res){
              console.log('success');
                this.setState({
                    userData: {email: res.email, id: res._id},
                    isInfoTooltipOpen: true,
                    message: 'Вы успешно зарегистрировались!',
                }, () => {
                    this.props.history.push('/sign-in');
                    
                })
            }
            }
        )
        .catch((err) => {
          this.setState({
            isErrorTooltipOpen: true,
              message: 'Что-то пошло не так! Попробуйте ещё раз.'
          })
        })
  }

  tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      Auth.getUserData(token)
      .then((res) => {
        if (res) {
          this.setState({
            loggedIn: true,
            userData: {email: res.data.email, id: res.data._id}
          }, () => {
            this.props.history.push("/")
          });
        }
      });
    }
  }

  handleSignOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/sign-in');
    this.setState({
      userData: {email: '', id: ''},
      cards: [],
      loggedIn: false,
      loadingData: true,
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className='page'>
                    
        < Header 
          userData={this.state.userData.email}
          loggedIn={this.state.loggedIn}
          onSignOut={this.handleSignOut}
        />
        

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={this.state.loggedIn}
            component={Main}
            cards = {this.state.cards}
            onEditProfile = {this.handleEditProfileClick}
            onAddPlace = {this.handleAddPlaceClick}
            onEditAvatar = {this.handleEditAvatarClick}
            onCardClick = {this.handleCardClick}
            onCardLike = {this.handleCardLike}
            onCardDelete = {this.handleCardDelete}
          />
          
          <Route path="/sign-up">
            {this.state.loggedIn ?
              < Redirect to="/" /> :
              < Register onRegister={this.handleRegister}/>
            }
          </Route>

          <Route path="/sign-in">
            {this.state.loggedIn ?
              < Redirect to="/" /> :
              < Login onLogin={this.handleLogin} />
            }
          </Route>

          <Route path="/sign-out">
              < Redirect to="/sign-in" />
          </Route>
        </Switch>
        < Footer />
        < EditProfilePopup 
          isOpen={this.state.isEditProfilePopupOpen} 
          onClose={this.closeAllPopups} 
          onUpdateUser={this.handleUpdateUser} 
        />
        
        < AddPlacePopup 
          isOpen={this.state.isAddPlacePopupOpen} 
          onClose={this.closeAllPopups} 
          onAddPlace={this.handleAddPlace} 
        />
          
        < EditAvatarPopup 
          isOpen={this.state.isEditAvatarPopupOpen} 
          onClose={this.closeAllPopups} 
          onUpdateAvatar={this.handleUpdateAvatar} 
        />    
        
        < InfoTooltip 
          name="registration-result"
          className="popup__registration-result_type_success"
          isOpen={this.state.isInfoTooltipOpen}
          onClose={this.closeAllPopups}
          registrationResult={this.state.registrationResult.successMessage}
        />

        < ErrorTooltip 
          name="registration-result"
          className="popup__registration-result_type_error"
          isOpen={this.state.isErrorTooltipOpen}
          onClose={this.closeAllPopups}
          registrationResult={this.state.registrationResult.errorMessage}
        />

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

}

export default withRouter (App);
