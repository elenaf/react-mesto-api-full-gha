class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    _handleFetchResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._url}users/me`, {
        headers: this._headers,
      })
        .then((res) => this._handleFetchResponse(res));
      }
  
    getInitialCards() {
      return fetch(`${this._url}cards `, {
        headers: this._headers,
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    editProfile({ name, about }) {
      return fetch(`${this._url}users/me `, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    addNewCard({ name, link }) {
      return fetch(`${this._url}cards `, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    addLike(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    changeLikeStatus(cardId, likeStatusActive) {
      if (likeStatusActive) {
        return this.removeLike(cardId)
      }
      return this.addLike(cardId);
    }
  
    removeLike(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
    updateAvatar(avatar) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar)
      })
        .then((res) => this._handleFetchResponse(res));
    }
  
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-46/',
    headers: {
      authorization: '1cbac3de-e369-4b86-95d5-992d89bef9af',
      "content-type": "application/json"
    }
  });
  
export default api;