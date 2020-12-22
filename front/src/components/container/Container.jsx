import './Container.scss';

import React, { useState } from 'react';

import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import { PAGE } from '../constants/Pages';

function Container() {
  const [page, setPage] = useState(PAGE.HOME);
  const [user, setUser] = useState('');

  const setPageHook = page => () => setPage(page);

  const setUserHook = e => {
    const userName = `${e.target[0].value} ${e.target[1].value}`;
    e.preventDefault();
    setUser(userName);
  };
  
  //test example user data from API
  const userData = {
    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 25,
    avatar: {
        fileId: 1,
        file: {
            id: 1,
            name: 'photo.jpg',
            path: '/upload/photo.jpg',
            size: 1234
        }
    },
    friends: [{
      id: 2,
      firstName: 'Alex',
      lastName: 'Green',
      age: 30,
      avatar: {
          fileId: 1,
          file: {
              id: 1,
              name: 'photo_ava.jpg',
              path: '/upload/photo_ava.jpg',
              size: 122
          }
        },
     }, {}, {}], //array of users
    articles: [{
        title: 'Article 1',
        text: 'Some text',
        images: [{
          id: 1,
          name: 'photo1.jpg',
          path: '/upload/photo1.jpg',
          size: 1234
        }, 
        {
          id: 2,
          name: 'photo2.jpg',
          path: '/upload/photo2.jpg',
          size: 1111
        }], // array of files
        createdAt: '2020-12-17 19:00:00',
        editedAt: '2020-12-17 20:00:00',
        likes: [
            {userId: 2, user: {id: 2}, date: '2020-12-17 21:00:00'},
            {userId: 3, user: {id: 3}, date: '2020-12-17 22:00:00'}
        ]
    }]
  };

  return (
    <div className="container">
      <Header user={user} setPageHook={setPageHook}/>
      <Content currentPage={page} setUserHook={setUserHook} userData={userData}/>
      <Footer />
    </div>
  );
}

export default Container;