import React from "react"

class Tooltip extends React.Component {
    render() {
        return (
            <div className={ `popup__registration-result ${this.props.className}` }>
                <p className="popup__result-text">{this.props.message}{/* тут если рег ок то ок, если нет то нет */}</p>
            </div>
        )
    }
}

export default Tooltip;