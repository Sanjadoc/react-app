import './Button.scss'

function Button({title, onClick, typeBtn}) {
    return (
        <button className="header__btn" onClick={onClick} type={typeBtn}>{title}</button>
    );
}

export default Button;