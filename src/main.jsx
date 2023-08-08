import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { worker } from './mocks/browser';
import './index.css'
import './utility.css';

// if in dev mode, import the Mock Service Worker for API testing
if (import.meta.env.DEV && import.meta.env.VITE_USING_API !== 'live') {
	worker.start({
		onUnhandledRequest: 'bypass',
	});
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
