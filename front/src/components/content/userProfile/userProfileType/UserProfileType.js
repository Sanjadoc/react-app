import PropTypes from 'prop-types';

const userType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.number
});
  
const imgFileType =  PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number
});
  
const likesType = PropTypes.shape({
  userId: PropTypes.number,
  user: PropTypes.arrayOf(userType),
  date: PropTypes.string
});
  
const articlesType = PropTypes.shape({
  title: PropTypes.string,
  text: PropTypes.string,
  images: PropTypes.arrayOf(imgFileType),
  createdAt: PropTypes.string,
  editedAt: PropTypes.string,
  likes: PropTypes.arrayOf(likesType)
});
  
export const userDataType = PropTypes.shape({
  userType,
  avatar: PropTypes.shape({
    fileId: PropTypes.number,
    file: imgFileType
  }),
  friends: PropTypes.arrayOf(userType),
  articles: PropTypes.arrayOf(articlesType)
});
  