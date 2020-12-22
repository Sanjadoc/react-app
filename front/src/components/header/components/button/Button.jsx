import './Button.scss'

import PropTypes from 'prop-types';

function Button({title, onClick, typeBtn}) {
    return (
        <button className="header__btn" onClick={onClick} type={typeBtn}>{title}</button>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    typeBtn: PropTypes.string
}

Button.defaultProps = {
    typeBtn:'button'
}

export default Button;