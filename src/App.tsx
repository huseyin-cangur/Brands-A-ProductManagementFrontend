
import InboxIcon from '@mui/icons-material/Inbox';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupIcon from '@mui/icons-material/Group';
import { useAppSelector } from './hooks/hooks';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

type NavItem = {
  segment?: string;
  title: string;
  pattern?: string;
  icon?: JSX.Element;
  roles?: string[];
  kind?: 'header';
};

const NAVIGATION: NavItem[] = [
  { kind: 'header', title: 'Menü' },

  {
    segment: 'categories',
    title: 'Kategoriler',
    pattern: 'categories{/:categoryId}*',
    icon: <InboxIcon />,
    roles: ['Admin', 'Category_User', 'Standart_User'],
  },

  {
    segment: 'products',
    title: 'Ürünler',
    pattern: 'products{/:productId}*',
    icon: <ProductionQuantityLimitsIcon />,
    roles: ['Admin', 'Product_User', 'Standart_User'],
  },

  {
    segment: 'users',
    title: 'Kullanıcılar',
    pattern: 'users{/:userId}*',
    icon: <GroupIcon />,
    roles: ['Admin'],
  },
];



const BRANDING = {
  title: "Brands-A Ürün Yönetimi",
};


export default function App() {


  const { user } = useAppSelector((state) => state.auth);

 



  const filteredNavigation = filterNavigationByRole(user?.roles || null, NAVIGATION);
  return (

    <PersistGate loading={null} persistor={persistor}>
      <ReactRouterAppProvider navigation={filteredNavigation} branding={BRANDING}>
        <ToastContainer />
        <Outlet />
      </ReactRouterAppProvider>
    </PersistGate>


  );
}
function filterNavigationByRole(userRoles: string[] | null, nav: NavItem[]) {

   
  if (!userRoles) return [];

  return nav.filter((item) => {
    if (item.kind === 'header') return true;
    if (!item.roles) return true;
    return item.roles.some((role) => userRoles.includes(role));
  });
}