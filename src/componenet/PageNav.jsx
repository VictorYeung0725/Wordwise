import { NavLink } from 'react-router-dom';
import Logo from '../componenet/Logo';
import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/price">Price</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
