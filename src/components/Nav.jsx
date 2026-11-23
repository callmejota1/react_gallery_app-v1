// Navigation links for the default topics. NavLink adds the "active" class to the current page's link.
import { NavLink } from 'react-router';
import { capitalize } from '../utils.js';

const Nav = ({ topics }) => (
  <nav className="main-nav" aria-label="Photo topics">
    <ul>
      {topics.map((topic) => (
        <li key={topic}>
          <NavLink to={`/${topic}`}>{capitalize(topic)}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
