import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { App } from './App';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement == null) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
);
