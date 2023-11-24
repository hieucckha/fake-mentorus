import { FC } from 'react';

import Header from './Header';
import Footer from './Footer';
import HeroHome from './HeroHome';
import FeaturesBlocks from './FeaturesBlocks';

/**
 * Home page.
 */
const index: FC = () => {
  const a = 1;

  return (

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
};

export default index;