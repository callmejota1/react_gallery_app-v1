// Small helpers shared by more than one component.

// "cats" -> "Cats"
export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Sets the browser tab title, e.g. "Cats | React Gallery App"
export const setPageTitle = (title) => {
  document.title = `${title} | React Gallery App`;
};
