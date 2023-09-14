import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LandingPage from './pages/landing-page/LandingPage';
import DryRun from './pages/dry-run/DryRun';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dry-run",
    element: <DryRun />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>    
);