import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { focusHandling } from 'cruip-js-toolkit';

import Login from './pages/SignIn';
import NotFound from './pages/NotFound';
import Register from './pages/SignUp';
import Landing from './pages/Landing';

import localStorageService from './services/localStorage.service';

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
      focusHandling();
    }

  }, [location.pathname]);

  const privateRoute = (element: JSX.Element): JSX.Element => {
    const token = localStorageService.getItem('auth');
    if (token) {
      return element;
    }
    return <Navigate to="/sign-in" />;
  };

  const publicRoute = (element: JSX.Element): JSX.Element => element;

  return (
    <Routes >
      <Route path="/" element={privateRoute(<Landing />)} />
      <Route path="/sign-in" element={publicRoute(<Login />)} />
      <Route path="/sign-up" element={publicRoute(<Register />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );

};
