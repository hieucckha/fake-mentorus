import { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * Home page.
 */
const Home: FC = () => (
  <>
    <h1>Hello World</h1>
    <Link to="/sign-in">Sign in</Link>
  </>
);

export default Home;
