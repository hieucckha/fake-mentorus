import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import LandingPage from '../pages/LandingPage/index';
import AuthLayout from '../layout/AuthLayout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UnauthorizeLayout from '../layout/UnauthorizeLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const BrowserRouter = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <NotFound/>,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          element: <UnauthorizeLayout />,
          children: [
            {
              path: '/sign-in',
              element: <SignIn />,
            },
            {
              path: '/sign-up',
              element: <SignUp />,
            },
          ],
        },
        {
          element: <AuthLayout />,
          children: [
            {
              path: '/home',
              element: <Home />,
            },
          ],
        },
      ],
    },
  ],
);

export default BrowserRouter;
