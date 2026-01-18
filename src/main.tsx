import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import Categories from './pages/Category/categories';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Products from './pages/Product/products';
import Users from './pages/User/Users';
import CredentialsSignInPage from './pages/Login/Login';



const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },

          {
            path: 'categories',
            Component: Categories
          },
          {
            path: 'products',
            Component: Products
          },
          {
            path: 'users',
            Component: Users
          }


        ],
      },
      {
        path: 'login',
        Component: CredentialsSignInPage,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);