import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import ProductView from '../pages/ProductView/ProductView';
import Profile from '../pages/Profile/Profile';
import Cart from '../pages/Cart/Cart';
import Success from '../pages/Success/Success';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/catalog', element: <Catalog /> },
  { path: '/catalog/:id', element: <ProductView /> },
  { path: '/profile', element: <Profile /> },
  { path: '/cart', element: <Cart /> },
  { path: '/success', element: <Success /> },
];

export default routes;
