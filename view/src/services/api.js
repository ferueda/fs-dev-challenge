const BASE_API_URL = 'http://localhost:5000';

const endpoints = {
  getStories: '/stories',
  deleteStories: '/stories/delete',
};

export async function getStories(signal) {
  const res = await fetch(`${BASE_API_URL}${endpoints.getStories}`, { signal });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export async function deleteStory(storyId) {
  const body = { story_id: storyId };

  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(`${BASE_API_URL}${endpoints.deleteStories}`, config);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}
