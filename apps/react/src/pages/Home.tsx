import { FC } from 'react';

import NavBarLogin from '../partials/NavBarLogin';

/**
 * Home page.
 */
const Home: FC = () => (
  <div>
    <NavBarLogin/>

    <h1 className='h1'>Hello World!</h1>
  </div>
);

export default Home;
