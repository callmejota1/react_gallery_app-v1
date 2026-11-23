// 404 page, shown for any URL that doesn't match a route.
import { useEffect } from 'react';
import { Link } from 'react-router';
import { setPageTitle } from '../utils.js';

const NotFound = () => {
  useEffect(() => {
    setPageTitle('Page Not Found');
  }, []);

  return (
    <div className="photo-container">
      <h2>Page Not Found</h2>
      <p>Sorry, that page doesn&apos;t exist. <Link to="/">Go back to the gallery</Link>.</p>
    </div>
  );
};

export default NotFound;
