import './Container.scss';

import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import { useState } from 'react';

function Container() {
  const [page, setPage] = useState('homePage');
  const [user, setUser] = useState('');

  const setPageHook = page => {
    setPage(page);
  };

  const setUserHook = e => {
    const userName = `${e.target[0].value} ${e.target[1].value}`;
    e.preventDefault();
    setUser(userName);
  };
  
  return (
    <div className="container">
      <Header user={user} setPageHook={setPageHook}/>
      <Content currentPage={page} setUserHook={setUserHook}/>
      <Footer />
    </div>
  );
}

export default Container;