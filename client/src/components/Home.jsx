import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = props => {
  return (
    <Fragment>
      <Header />
      This is the home page
      <Footer />
    </Fragment>
  );
};

export default Home;