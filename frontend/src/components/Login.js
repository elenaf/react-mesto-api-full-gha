import React from "react";

class Login extends React.Component {
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
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        const { password, email } = this.state;
        if (!password || !email) return;
        this.props.onLogin(password, email);
    }

    render() {
        return (
            <section className="authorization">
                <form onSubmit={this.handleSubmit} className="authorization__form">
                    <h2 className="authorization__title">Вход</h2>
                    <fieldset className="authorization__fields">
                        <label>
                            <input id="email" onChange={this.handleChange} className="authorization__input" value={this.state.email} type="email" placeholder="Email" name="email" required/>
                        </label>
                        <label>
                            <input id="password" onChange={this.handleChange} className="authorization__input" value={this.state.password} type="password" placeholder="Пароль" name="password" required/>
                        </label>
                    </fieldset>
                    <button className="authorization__submit-button" type="submit">Войти</button>
                </form>
    
            </section>
        )
    }
}

export default Login;