// Shows a page title and a list of photos, or a loading, error or no-results message.
import { useEffect } from 'react';
import { setPageTitle } from '../utils.js';
import Photo from './Photo.jsx';

// data is null while loading, then an array of Pixabay photo objects
const PhotoList = ({ data, title, error }) => {
  // Update the browser tab title whenever the page title changes
  useEffect(() => {
    setPageTitle(title);
  }, [title]);

  // Pick what to show (and what to announce to screen readers) based on the current state
  let content;
  let status;

  if (error) {
    content = (
      <li className="not-found">
        <h3>Something Went Wrong</h3>
        <p>{error}</p>
      </li>
    );
    status = 'There was a problem loading photos.';
  } else if (data === null) {
    content = <li className="loading">Loading…</li>;
    status = 'Loading photos.';
  } else if (data.length > 0) {
    content = data.map((photo) => <Photo key={photo.id} photo={photo} />);
    status = `${data.length} photos found.`;
  } else {
    content = (
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>Your search did not return any results. Please try again.</p>
      </li>
    );
    status = 'No results found.';
  }

  return (
    <div className="photo-container">
      <h2>{title}</h2>
      {/* Announces loading and result changes to screen reader users */}
      <p className="sr-only" role="status">{status}</p>
      <ul aria-busy={data === null}>{content}</ul>
    </div>
  );
};

export default PhotoList;
