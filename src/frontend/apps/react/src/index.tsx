import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'flowbite';
import './index.scss';
import router from './router';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement == null) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
