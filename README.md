React Gallery App
An image gallery built with React, Vite, and React Router. It uses the Pixabay API to show photos for three default topics (Cats, Dogs, Birds) and for custom searches.

Setup
Clone the repo and run npm install.

Create a free account at pixabay.com and copy your API key from the Photos Search docs.

Create a file at src/config.js with this content:

const apiKey = 'YOUR_PIXABAY_API_KEY';
export default apiKey;
This file is listed in .gitignore so your key is never committed.

Run npm run dev and open the URL shown in the terminal.

Routes
/ redirects to /cats
/cats, /dogs, /birds are the default topics
/search/:query shows search results