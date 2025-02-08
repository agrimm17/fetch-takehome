// Login that connects to Fetch API
// Name + email
// pass a config option to send credentials (cookies) with future requests

// Search Page
// Filter by breed
// Paginated
// sorted alphabetically by breed
// Can be reversed
// display all dog object (except ID)
// Users can select favs
// User can "generate match" from favs using /dogs/match endpoint
// display single match

import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';

const root = createRoot(document.querySelector('#root'));
root.render(
  <Provider>
    <App />
  </Provider>
);
