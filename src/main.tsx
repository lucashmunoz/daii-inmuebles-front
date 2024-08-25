import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './ui/pages/Home';
import PropertiesList from './ui/pages/PropertiesList';
import PropertyDetails from './ui/pages/PropertyDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/list',
		element: <PropertiesList />,
	},
	{
		path: '/property',
		element: <PropertyDetails />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
