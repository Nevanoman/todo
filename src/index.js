import { createRoot } from 'react-dom/client'

import App from './components/app/app'

import './index.css'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
