import './Button.scss'

import PropTypes from 'prop-types';

function Button({title, typeBtn}) {
    return (
        <button className="header__btn" type={typeBtn}>{title}</button>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    typeBtn: PropTypes.string
}

Button.defaultProps = {
    typeBtn:'button'
}

export default Button;