import { useEffect, useState, useCallback } from 'react';

import { getStories, deleteStory } from '../services/api';

function useFetch() {
  const [stories, setStories] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  // It wasn't a requirement so I wasn't sure if I should add error and loading UIs or not. I decided to just stick to the requirements but if we wanted to add loading and/or error UIs, we would have to use status and error state variables to display each one, both returned by the useFetch custom hook.

  const handleDeleteStory = useCallback((storyId) => {
    deleteStory(storyId)
      .then((returnedStories) => {
        setStories(returnedStories);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setStatus('pending');
    setError(null);
    setStories([]);

    getStories(signal)
      .then((stories) => {
        setStories(stories);
        setStatus('resolved');
      })
      .catch((error) => {
        if (!signal.aborted) {
          setError(error);
          setStatus('rejected');
        }
      });

    return () => abortController.abort();
  }, []);

  return {
    stories,
    handleDeleteStory,
    status,
    error,
  };
}

export default useFetch;
