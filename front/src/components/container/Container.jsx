import './Container.scss';

import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";

function Container() {
  return (
    <div className="container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Container;