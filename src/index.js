import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';

const root = createRoot(document.querySelector('#root'));
root.render(
  <Provider>
    <App />
  </Provider>
);
