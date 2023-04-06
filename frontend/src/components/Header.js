import React from "react";
import { NavLink, Route, Switch } from 'react-router-dom';

export default function Header(props) {
  const email = props.userData;
  const loggedIn = props.loggedIn;
  const signOut = props.onSignOut;

    return(
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__user-data">
        
        <Switch>
          <Route exact path="/">
              <p className="header__user-email">{loggedIn && email}</p>
              <NavLink to="/sign-out" onClick={signOut} className="header__link">Выйти</NavLink>
          </Route>
          <Route path="/sign-in">
            <NavLink to="/sign-up" className="header__link">Зарегистрироваться</NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink to="/sign-in" className="header__link">Войти</NavLink>
          </Route>
        </Switch>
        
      </div>
    </header>
    );
}


