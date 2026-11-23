// A single photo in the gallery.

// photo is one Pixabay result: webformatURL is the image link, tags describe it (used as alt text)
const Photo = ({ photo }) => (
  <li>
    <img src={photo.webformatURL} alt={photo.tags} loading="lazy" />
  </li>
);

export default Photo;
