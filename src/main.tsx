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
import RequireRole from './helpers/RequireRole';
import AuthorizationFailed from './pages/Error/AuthorizationFailed';



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
            element: <RequireRole roles={['Category_User', 'Admin']} />,
            children: [
              {
                path: 'categories',
                Component: Categories
              }
            ]

          },
          {
            element: <RequireRole roles={['Product_User', 'Admin']} />,
            children: [
              {
                path: 'products',
                Component: Products
              }

            ],

          },
          {
            element: <RequireRole roles={['Admin']} />,
            children: [
              {
                path: 'users',
                Component: Users,
              },
            ],
          }


        ],
      },
      {
        path: 'login',
        Component: CredentialsSignInPage,
      },
      {
        path: 'authorization-error',
        Component: AuthorizationFailed
      }
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