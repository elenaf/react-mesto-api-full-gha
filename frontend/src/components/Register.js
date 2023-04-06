import React from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const {name, value} = evt.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const { password, email } = this.state;
        this.props.onRegister({ password, email });
    }

    render() {
        return (
            <section className="authorization">
                <form className="authorization__form" onSubmit={this.handleSubmit}>
                    <h2 className="authorization__title">Регистрация</h2>
                    <fieldset className="authorization__fields">
                        <label>
                            <input id="email" value={this.state.email} onChange={this.handleChange} className="authorization__input" type="email" placeholder="Email" name="email" required/>
                        </label>
                        <label>
                            <input id="password" value={this.state.password} onChange={this.handleChange} className="authorization__input" type="password" placeholder="Пароль" name="password" required/>
                        </label>
                    </fieldset>
                    <button className="authorization__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="authorization__login-link">Уже зарегистрированы? Войти</Link>
            </section>
        )
    }
}

export default withRouter(Register);