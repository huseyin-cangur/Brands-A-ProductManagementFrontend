import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menü',
  },
 
  {
    segment: 'categories',
    title: 'Kategoriler',
    pattern: 'categories{/:categoryId}*',
    icon: <InboxIcon/>,
  },
  {
    segment: 'products',
    title: 'Ürünler',
    pattern: 'products{/:productId}*',
    icon: <ProductionQuantityLimitsIcon/>,
  }
   
];

const BRANDING = {
  title: "Brands-A Ürün Yönetimi",
};


export default function App() {

  
  
  return (

    
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}