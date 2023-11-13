import { FC, useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { focusHandling } from 'cruip-js-toolkit';

import Login from './pages/SignIn';
import Landing from './pages/Landing';

/**
 * App.
 * @returns App.
 */
export const App: FC = () => {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  // triggered on route change
  useEffect(() => {
    const root = document.querySelector('html');

    if (root) {
      root.style.scrollBehavior = 'auto';
      window.scroll({ top: 0 });
      root.style.scrollBehavior = '';
      focusHandling('outline');
    }

  }, [location.pathname]);

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
};
