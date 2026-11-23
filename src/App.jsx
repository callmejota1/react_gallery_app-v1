import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router';
import apiKey from './config.js';

import { capitalize } from './utils.js';
import Search from './components/Search.jsx';
import Nav from './components/Nav.jsx';

import PhotoList from './components/PhotoList.jsx';
import NotFound from './components/NotFound.jsx';

// The three default topics. Each one gets a nav link and its own static route.
const TOPICS = ['cats', 'dogs', 'computers'];

// photos is null while loading, then an array of Pixabay photo objects
const emptyResult = { photos: null, error: null };

function App() {
  // Photos for the default topics, keyed by topic name
  // (built from TOPICS, so adding a topic only means editing that one array)
  const [topicResults, setTopicResults] = useState(
    Object.fromEntries(TOPICS.map((topic) => [topic, emptyResult]))
  );
  // Photos for the most recent user search
  const [searchResult, setSearchResult] = useState(emptyResult);

  // The newest search, so a slow, older response can't overwrite a newer one
  const latestQuery = useRef('');

  // The search term from the URL when on /search/:query, otherwise null
  const searchMatch = useMatch('/search/:query');
  const urlQuery = searchMatch ? searchMatch.params.query : null;

  /**
   * Fetches photos from the Pixabay API and stores them in state.
   * @param {string} query - the search term
   * @param {string|null} topic - set for a default topic, null for a user search
   */
  const fetchData = async (query, topic = null) => {
    if (!topic) {
      latestQuery.current = query;
      setSearchResult(emptyResult);
    }

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true&per_page=24`;

    let result;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pixabay responded with status ${response.status}. Check the API key in src/config.js.`);
      }
      const data = await response.json();
      result = { photos: data.hits, error: null };
    } catch (err) {
      console.error('Error fetching and parsing data:', err);
      result = { photos: [], error: err.message };
    }

    if (topic) {
      setTopicResults((prev) => ({ ...prev, [topic]: result }));
    } else if (query === latestQuery.current) {
      setSearchResult(result);
    }
  };

  // Load the default topics once, when the app first loads
  useEffect(() => {
    TOPICS.forEach((topic) => fetchData(topic, topic));
  }, []);

  // Keep search results in sync with the URL (pasted links, back/forward buttons).
  // Searches started from the form already set latestQuery, so they aren't fetched twice.
  useEffect(() => {
    if (urlQuery && urlQuery !== latestQuery.current) {
      fetchData(urlQuery);
    }
  }, [urlQuery]);

  return (
    <div className="container">
      <Search fetchData={fetchData} />
      <Nav topics={TOPICS} />

      <main>
        <Routes>
          {/* Home redirects to the first default topic */}
          <Route path="/" element={<Navigate to={`/${TOPICS[0]}`} replace />} />

          {/* One static route per default topic */}
          {TOPICS.map((topic) => (
            <Route
              key={topic}
              path={`/${topic}`}
              element={
                <PhotoList
                  data={topicResults[topic].photos}
                  error={topicResults[topic].error}
                  title={capitalize(topic)}
                />
              }
            />
          ))}

          {/* User searches */}
          <Route
            path="/search/:query"
            element={
              <PhotoList
                data={searchResult.photos}
                error={searchResult.error}
                title={`Results for "${urlQuery}"`}
              />
            }
          />

          {/* Any other URL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
