import "./Container.scss";

import React, { useState } from "react";

import Content from "../components/content/Content";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function Container() {
  const [user, setUser] = useState("");

  const setUserHook = (e) => {
    const userName = `${e.target[0].value} ${e.target[1].value}`;
    e.preventDefault();
    setUser(userName);
  };

  return (
    <div className="container">
      <Header user={user} />
      <Content setUserHook={setUserHook} />
      <Footer />
    </div>
  );
}

export default Container;
