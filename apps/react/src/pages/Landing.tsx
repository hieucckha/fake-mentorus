import { FC } from 'react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';

/**
 * Home page.
 */
const Landing: FC = () => (
  <div className="flex flex-col min-h-screen overflow-hidden">

    {/*  Site header */}
    <Header />

    {/*  Page content */}
    <main className="flex-grow">

      {/*  Page sections */}
      <HeroHome />
      <FeaturesBlocks />
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}

    </main>

    {/*  Site footer */}
    <Footer />
  </div>
);

export default Landing;
