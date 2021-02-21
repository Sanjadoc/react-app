import PropTypes from 'prop-types';

export const articlesDataType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    p_title: PropTypes.string.isRequired,
    p_descriptions: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
});