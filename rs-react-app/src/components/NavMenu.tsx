import { NavLink } from 'react-router-dom';
import './NavMenu.scss';
import { navLinkClass } from './utils/navLinkClass.ts';

function NavMenu() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={navLinkClass}>
        Main
      </NavLink>
      <NavLink to="/about" className={navLinkClass} end>
        About
      </NavLink>
    </nav>
  );
}
export default NavMenu;
