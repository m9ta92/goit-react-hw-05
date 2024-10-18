import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
  // </React.StrictMode>
);
