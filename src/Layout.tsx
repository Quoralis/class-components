import NavMenu from './components/NavMenu.tsx';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="container">
      <NavMenu />
      <Outlet />
    </div>
  );
}

export default Layout;
