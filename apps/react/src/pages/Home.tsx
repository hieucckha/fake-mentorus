import { FC } from 'react';

// import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import Footer from '../partials/Footer';

/**
 * Home page.
 */
const Home: FC = () => (
  <div className="flex flex-col min-h-screen overflow-hidden">
    <Header />

    {/*  Page content */}
    <main className="flex-grow">

      {/*  Page sections */}
      {/* <HeroHome />
      <FeaturesHome />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter /> */}

    </main>

    {/*  Site footer */}
    <Footer />
  </div>
);

export default Home;
