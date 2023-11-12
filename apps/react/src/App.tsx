import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from './pages/SignIn';
import Home from './pages/Home';

/**
 * App.
 * @returns App.
 */
export const App: FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/sign-in" element={<Login />} />
  </Routes>
);
