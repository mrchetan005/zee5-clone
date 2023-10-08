
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </React.StrictMode>, */}
    <Analytics />
  </>
)
