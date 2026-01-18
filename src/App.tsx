 
import InboxIcon from '@mui/icons-material/Inbox';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupIcon from '@mui/icons-material/Group';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menü',
  },

  {
    segment: 'categories',
    title: 'Kategoriler',
    pattern: 'categories{/:categoryId}*',
    icon: <InboxIcon />,
  },

  {
    segment: 'products',
    title: 'Ürünler',
    pattern: 'products{/:productId}*',
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    segment: 'users',
    title: 'Kullanıcılar',
    pattern: 'users{/:userId}*',
    icon: <GroupIcon />,
  }

];

const BRANDING = {
  title: "Brands-A Ürün Yönetimi",
};


export default function App() {



  return (


    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <ToastContainer />
      <Outlet />
    </ReactRouterAppProvider>
  );
}