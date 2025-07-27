import NavMenu from './components/NavMenu.tsx';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="container">
      <NavMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
