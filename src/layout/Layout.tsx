import { NavMenu } from '../components';
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
