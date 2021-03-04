import { AccessArticles } from '../constants/AccessArticles';
import PropTypes from 'prop-types';

export const articlesDataType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    access: PropTypes.string.isRequired,
    dataCreate: PropTypes.instanceOf(Date),
    dataEdit: PropTypes.instanceOf(Date)
});

export const articleDataType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    access: PropTypes.string.isRequired,
    dataCreate: PropTypes.instanceOf(Date),
    dataEdit: PropTypes.instanceOf(Date)
});

export const objectCreateArticle = PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    access: PropTypes.oneOf([AccessArticles.ALL, AccessArticles.FRIENDS, AccessArticles.ME]).isRequired,
    userId: PropTypes.number.isRequired
  });