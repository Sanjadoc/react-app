import PropTypes from "prop-types";

const userType = PropTypes.shape({
  id: PropTypes.number,
  password: PropTypes.string,
  token: PropTypes.string,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  age: PropTypes.number,
  university: PropTypes.string,
  phone_number: PropTypes.string,
  data: PropTypes.data,
  work_place: PropTypes.string,
  active: PropTypes.bool,
  avatar: PropTypes.string,
  refreshToken: PropTypes.string,
});

// const imgFileType =  PropTypes.shape({
//   id: PropTypes.number,
//   name: PropTypes.string,
//   path: PropTypes.string,
//   size: PropTypes.number
// });

// const likesType = PropTypes.shape({
//   userId: PropTypes.number,
//   user: PropTypes.arrayOf(userType),
//   date: PropTypes.string
// });


export const userDataType = PropTypes.shape({
  userType,
  tokens: PropTypes.shape({
    access: PropTypes.shape({
      token: PropTypes.string,
      expires:PropTypes.string,
    }),
    refresh: PropTypes.shape({
      token: PropTypes.string,
      expires:PropTypes.string,
    }),
  }),
});
