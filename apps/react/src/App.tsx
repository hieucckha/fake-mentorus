import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { focusHandling } from 'cruip-js-toolkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



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

  return (
  );

};
