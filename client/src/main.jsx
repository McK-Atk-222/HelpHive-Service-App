import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HelpForm from './pages/HelpForm';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import HoneycombBackground from './components/HoneycombBackground';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div><HoneycombBackground/><h1 className='display-2'>Wrong page!</h1></div>,
    children: [
      {
        index: true,
        element: <HelpForm />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/admin',
        element: <AdminPanel />,
        // children: [
        //   {
        //     path: '/register',
        //     element: <Register />,
        //   }
        // ],
      }, {
        path: '/admin/register',
        element: <Register />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);
