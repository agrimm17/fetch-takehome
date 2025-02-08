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
    
//investigate component library?
// App must be hosted on internet
// source code should be stored in git repo
// include documentation to run app locally

import App from './App'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))
root.render(<App />);