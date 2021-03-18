import './Button.scss'

import PropTypes from 'prop-types';

function Button({title, typeBtn, onClick, disabled}) {
    return (
        <button className="btn" type={typeBtn} onClick={onClick} disabled={disabled}>{title}</button>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    typeBtn: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

Button.defaultProps = {
    typeBtn:'button',
    disabled: false
}

export default Button;